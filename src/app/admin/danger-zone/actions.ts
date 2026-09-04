'use server';

import { prisma } from '../../../lib/prisma';
import { Prisma } from '@prisma/client';
import { createClient } from '../../../utils/supabase/server';

const PAGE_SIZE = 10;

export async function fetchAuditLogs(page: number, query: string = '') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const skip = (page - 1) * PAGE_SIZE;

  // Build the where clause for searching
  const where: Prisma.AuditLogWhereInput = query
    ? {
        OR: [
          { action: { contains: query, mode: 'insensitive' } },
          { details: { contains: query, mode: 'insensitive' } },
          { ipAddress: { contains: query, mode: 'insensitive' } },
          { userAgent: { contains: query, mode: 'insensitive' } },
        ],
      }
    : {};

  const [logs, totalCount] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return {
    logs,
    totalPages: Math.ceil(totalCount / PAGE_SIZE),
  };
}

export async function fetchTrafficLogs(page: number, query: string = '') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const skip = (page - 1) * PAGE_SIZE;

  // Build the where clause for searching
  const where: Prisma.PageViewWhereInput = query
    ? {
        OR: [
          { path: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
          { country: { contains: query, mode: 'insensitive' } },
          { visitorId: { contains: query, mode: 'insensitive' } },
          { device: { contains: query, mode: 'insensitive' } },
        ],
      }
    : {};

  const [logs, totalCount] = await Promise.all([
    prisma.pageView.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.pageView.count({ where }),
  ]);

  return {
    logs,
    totalPages: Math.ceil(totalCount / PAGE_SIZE),
  };
}

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function toggleLockdown() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const profile = await prisma.profile.findUnique({ where: { id: "singleton" } });
  if (!profile) throw new Error('Profile not found');

  const newState = !profile.isLockedDown;

  await prisma.profile.update({
    where: { id: "singleton" },
    data: { isLockedDown: newState },
  });

  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'Unknown IP';
  const userAgent = headersList.get('user-agent') || 'Admin Action';
  
  await prisma.auditLog.create({
    data: {
      action: 'SECURITY',
      details: newState ? 'Public site locked down' : 'Public site unlocked',
      ipAddress: ip,
      userAgent: userAgent,
    },
  });

  revalidatePath('/', 'layout');
  return newState;
}

export async function wipeTrafficLogs(days: number | null) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'Unknown IP';
  const userAgent = headersList.get('user-agent') || 'Admin Action';

  if (days === null) {
    // Delete all
    const { count } = await prisma.pageView.deleteMany({});
    
    await prisma.auditLog.create({
      data: {
        action: 'MODIFICATION',
        details: `Wiped ALL public traffic logs (${count} records deleted)`,
        ipAddress: ip,
        userAgent: userAgent,
      },
    });
    return count;
  } else {
    // Delete older than 'days'
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const { count } = await prisma.pageView.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate
        }
      }
    });

    await prisma.auditLog.create({
      data: {
        action: 'MODIFICATION',
        details: `Wiped public traffic logs older than ${days} days (${count} records deleted)`,
        ipAddress: ip,
        userAgent: userAgent,
      },
    });
    return count;
  }
}

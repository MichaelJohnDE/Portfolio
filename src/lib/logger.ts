import { prisma } from './prisma';
import { headers } from 'next/headers';

type AuditAction = 'SECURITY' | 'MODIFICATION' | 'AUTH' | 'SETTINGS';

export async function logAudit(action: AuditAction, details: string) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'Unknown IP';
    const userAgent = headersList.get('user-agent') || 'Unknown Device';

    await prisma.auditLog.create({
      data: {
        action,
        details,
        ipAddress,
        userAgent,
      },
    });

    // Auto-cleanup: Delete audit logs older than 30 days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);
    
    // We run this asynchronously without awaiting to not block the main request
    prisma.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate
        }
      }
    }).catch(e => console.error('Failed to cleanup old audit logs:', e));

  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}

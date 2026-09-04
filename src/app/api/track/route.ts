import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { createHash } from 'crypto';

interface GeoData {
  status: string;
  country: string;
  countryCode: string;
  city: string;
  lat: number;
  lon: number;
}

function getClientIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) return xForwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') || '127.0.0.1';
}

function generateVisitorId(ip: string, userAgent: string): string {
  return createHash('sha256')
    .update(`${ip}:${userAgent}:mjde-portfolio`)
    .digest('hex')
    .slice(0, 24);
}

function getFriendlyDevice(userAgent: string): string {
  if (!userAgent) return 'Unknown Device';
  
  let browser = 'Unknown Browser';
  if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Edg')) browser = 'Edge';
  else if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Safari')) browser = 'Safari';

  let os = 'Unknown OS';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac OS')) os = 'MacOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

  return `${os} / ${browser}`;
}

async function getGeoData(ip: string): Promise<GeoData | null> {
  // Skip private/local IPs
  if (
    ip === '::1' || ip === '127.0.0.1' ||
    ip.startsWith('192.168.') || ip.startsWith('10.') ||
    ip.startsWith('172.16.') || ip.startsWith('::ffff:')
  ) return null;

  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,city,lat,lon`,
      { cache: 'no-store' }
    );
    const data: GeoData = await res.json();
    return data.status === 'success' ? data : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();

    if (!path || typeof path !== 'string') {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    const ip = getClientIp(request);
    const userAgent = request.headers.get('user-agent') || '';
    const visitorId = generateVisitorId(ip, userAgent);

    // Session cookie prevents double-counting same visitor within 24h
    const sessionKey = `pt_${visitorId.slice(0, 8)}`;
    const alreadyTracked = request.cookies.get(sessionKey);

    const response = NextResponse.json({ success: true });

    if (!alreadyTracked) {
      // Set 24-hour session cookie on the response
      response.cookies.set(sessionKey, '1', {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      });

      const geo = await getGeoData(ip);

      await prisma.pageView.create({
        data: {
          path,
          visitorId,
          device: getFriendlyDevice(userAgent),
          country: geo?.country ?? null,
          countryCode: geo?.countryCode ?? null,
          city: geo?.city ?? null,
          lat: geo?.lat ?? null,
          lon: geo?.lon ?? null,
        },
      });
    }

    return response;
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
  }
}


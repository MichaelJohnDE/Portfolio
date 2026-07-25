import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { createClient } from '../../../utils/supabase/server';

type PageViewRow = {
  path: string;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  lat: number | null;
  lon: number | null;
  visitorId: string | null;
  createdAt: Date;
};

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const views: PageViewRow[] = await prisma.pageView.findMany({
      select: {
        path: true,
        country: true,
        countryCode: true,
        city: true,
        lat: true,
        lon: true,
        visitorId: true,
        createdAt: true,
      },
    });

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Total views
    const totalViews = views.length;

    // Unique visitors (distinct non-null visitorId hashes)
    const uniqueVisitors = new Set(
      views.filter(v => v.visitorId).map(v => v.visitorId)
    ).size;

    // Views today
    const viewsToday = views.filter(v => v.createdAt >= todayStart).length;

    // Top pages (by path)
    const pageCounts: Record<string, number> = {};
    views.forEach(v => { pageCounts[v.path] = (pageCounts[v.path] || 0) + 1; });
    const topPages = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // City-level locations (group by city + countryCode, prefer precise lat/lon)
    const locationMap: Record<string, {
      city: string | null;
      country: string | null;
      countryCode: string | null;
      lat: number | null;
      lon: number | null;
      count: number;
    }> = {};
    views.filter(v => v.country).forEach(v => {
      const key = `${v.city ?? ''}::${v.countryCode ?? ''}`;
      if (!locationMap[key]) {
        locationMap[key] = {
          city: v.city,
          country: v.country,
          countryCode: v.countryCode,
          lat: v.lat,
          lon: v.lon,
          count: 0,
        };
      }
      locationMap[key].count++;
    });
    const locations = Object.values(locationMap)
      .filter(l => l.lat !== null && l.lon !== null)
      .sort((a, b) => b.count - a.count)
      .slice(0, 100);

    // Views by day for last 7 days
    const dayMap: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      dayMap[d.toISOString().slice(0, 10)] = 0;
    }
    views
      .filter(v => v.createdAt >= sevenDaysAgo)
      .forEach(v => {
        const key = v.createdAt.toISOString().slice(0, 10);
        if (key in dayMap) dayMap[key]++;
      });
    const viewsByDay = Object.entries(dayMap).map(([date, count]) => ({ date, count }));

    // Country summary for the legend
    const countryCounts: Record<string, { country: string; countryCode: string; count: number }> = {};
    views.filter(v => v.country && v.countryCode).forEach(v => {
      const key = v.countryCode!;
      if (!countryCounts[key]) {
        countryCounts[key] = { country: v.country!, countryCode: v.countryCode!, count: 0 };
      }
      countryCounts[key].count++;
    });
    const topCountries = Object.values(countryCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return NextResponse.json({
      totalViews,
      uniqueVisitors,
      viewsToday,
      topPages,
      locations,
      viewsByDay,
      topCountries,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

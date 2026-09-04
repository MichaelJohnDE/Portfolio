import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '../../lib/prisma'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import { FolderGit2, Briefcase, Award, Code2, Server, Cpu, HardDrive, Clock } from 'lucide-react';

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

async function getInitialAnalytics() {
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

  const totalViews = views.length;
  const uniqueVisitors = new Set(views.filter(v => v.visitorId).map(v => v.visitorId)).size;
  const viewsToday = views.filter(v => v.createdAt >= todayStart).length;

  const pageCounts: Record<string, number> = {};
  views.forEach(v => { pageCounts[v.path] = (pageCounts[v.path] || 0) + 1; });
  const topPages = Object.entries(pageCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const locationMap: Record<string, { city: string | null; country: string | null; countryCode: string | null; lat: number | null; lon: number | null; count: number }> = {};
  views.filter(v => v.country).forEach(v => {
    const key = `${v.city ?? ''}::${v.countryCode ?? ''}`;
    if (!locationMap[key]) {
      locationMap[key] = { city: v.city, country: v.country, countryCode: v.countryCode, lat: v.lat, lon: v.lon, count: 0 };
    }
    locationMap[key].count++;
  });
  const locations = Object.values(locationMap)
    .filter(l => l.lat !== null && l.lon !== null)
    .sort((a, b) => b.count - a.count)
    .slice(0, 100);

  const dayMap: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    dayMap[d.toISOString().slice(0, 10)] = 0;
  }
  views.filter(v => v.createdAt >= sevenDaysAgo).forEach(v => {
    const key = v.createdAt.toISOString().slice(0, 10);
    if (key in dayMap) dayMap[key]++;
  });
  const viewsByDay = Object.entries(dayMap).map(([date, count]) => ({ date, count }));

  const countryCounts: Record<string, { country: string; countryCode: string; count: number }> = {};
  views.filter(v => v.country && v.countryCode).forEach(v => {
    const key = v.countryCode!;
    if (!countryCounts[key]) countryCounts[key] = { country: v.country!, countryCode: v.countryCode!, count: 0 };
    countryCounts[key].count++;
  });
  const topCountries = Object.values(countryCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return { totalViews, uniqueVisitors, viewsToday, topPages, locations, viewsByDay, topCountries };
}

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll() { return cookieStore.getAll() } } }
  )

  await supabase.auth.getUser()

  const [projectsCount, expCount, certsCount, skillsCount, analyticsData] = await Promise.all([
    prisma.project.count(),
    prisma.experience.count(),
    prisma.certification.count(),
    prisma.skill.count(),
    getInitialAnalytics(),
  ]);

  const nodeVersion = process.version;
  const memoryMB = Math.round(process.memoryUsage().rss / 1024 / 1024);
  const uptimeHours = (process.uptime() / 3600).toFixed(2);
  const environment = process.env.NODE_ENV;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-on-surface">Dashboard Overview</h1>
      </div>

      {/* Live Analytics Dashboard */}
      <AnalyticsDashboard initialData={analyticsData} />

      {/* CMS Content Summary & System Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container/40 backdrop-blur-md border border-outline-variant/20 rounded-3xl p-8 relative overflow-hidden flex-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4">Welcome to your CMS</h2>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm relative z-10 mb-8">
              Use the sidebar navigation to manage your Experiences, Projects, Certifications, and Skills.
              Any changes made here will be instantly reflected on your live portfolio.
            </p>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 relative z-10">
              {[
                { title: 'Projects', count: projectsCount, colorClass: 'text-brand-cyan', icon: FolderGit2 },
                { title: 'Experiences', count: expCount, colorClass: 'text-brand-emerald', icon: Briefcase },
                { title: 'Certifications', count: certsCount, colorClass: 'text-blue-400', icon: Award },
                { title: 'Skills', count: skillsCount, colorClass: 'text-purple-400', icon: Code2 },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.title} className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl bg-surface-container-highest/50 border border-outline-variant/10 ${stat.colorClass}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className={`text-xl font-bold leading-none mb-1 ${stat.colorClass}`}>{stat.count}</p>
                      <h3 className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-widest">{stat.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-surface-container/40 backdrop-blur-md border border-outline-variant/20 rounded-3xl p-8 flex flex-col justify-center">
          <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-6">System Details</h2>
          <div className="space-y-4 text-sm">
            {[
              { label: 'Environment', value: environment, icon: Server },
              { label: 'Node.js Version', value: nodeVersion, icon: Cpu },
              { label: 'Memory Usage (RSS)', value: `${memoryMB} MB`, icon: HardDrive },
              { label: 'Server Uptime', value: `${uptimeHours} hrs`, icon: Clock },
            ].map(row => {
              const Icon = row.icon;
              return (
                <div key={row.label} className="flex justify-between items-center border-b border-outline-variant/10 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <Icon size={16} className="opacity-70" />
                    <span>{row.label}</span>
                  </div>
                  <span className="font-medium capitalize text-on-surface">{row.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

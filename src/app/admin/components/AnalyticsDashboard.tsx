'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import WorldMap, { MapLocation } from './WorldMap';
import { Eye, Users, Calendar, Globe, Activity, Pause, Play } from 'lucide-react';

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  viewsToday: number;
  topPages: { path: string; count: number }[];
  locations: MapLocation[];
  viewsByDay: { date: string; count: number }[];
  topCountries: { country: string; countryCode: string; count: number }[];
}

// --- Sub-components ---

function StatCard({ label, value, icon: Icon, colorClass, gradientClass }: { label: string; value: number; icon: any; colorClass: string; gradientClass: string }) {
  return (
    <div className={`relative overflow-hidden bg-surface-container/40 backdrop-blur-md border border-outline-variant/20 rounded-3xl p-6 group transition-all duration-300 hover:shadow-lg hover:border-outline-variant/40`}>
      {/* Background Gradient Blob */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${gradientClass} transition-opacity group-hover:opacity-40`} />
      
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-xl bg-surface-container-highest/50 border border-outline-variant/10 ${colorClass}`}>
          <Icon size={20} />
        </div>
        <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">{label}</span>
      </div>
      <p className={`text-5xl font-bold tabular-nums text-on-surface transition-all duration-500`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function BarChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="flex items-end gap-2 h-24 w-full">
      {data.map((d, i) => {
        const heightPct = Math.max((d.count / max) * 100, 3);
        const dayLabel = new Date(d.date + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'short' });
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
            <span className="text-[10px] text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity font-medium">
              {d.count}
            </span>
            <div className="w-full flex items-end" style={{ height: '80%' }}>
              <div
                className="w-full rounded-t-md bg-brand-cyan/50 hover:bg-brand-cyan transition-all duration-500 ease-out"
                style={{ height: `${heightPct}%` }}
                title={`${d.date}: ${d.count} views`}
              />
            </div>
            <span className="text-[10px] text-on-surface-variant">{dayLabel}</span>
          </div>
        );
      })}
    </div>
  );
}

function TopPagesList({ pages }: { pages: { path: string; count: number }[] }) {
  const totalViews = pages.reduce((s, p) => s + p.count, 0);

  function getLabel(path: string) {
    if (path === '/') return 'Home';
    return path.replace(/^\//, '').split('/').map(seg =>
      seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    ).join(' › ');
  }

  if (pages.length === 0) {
    return (
      <p className="text-sm text-on-surface-variant py-4">
        No page data yet — visit your portfolio to start tracking!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {pages.map((page, i) => {
        const pct = totalViews > 0 ? (page.count / totalViews) * 100 : 0;
        return (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-on-surface font-medium truncate" title={page.path}>
                {getLabel(page.path)}
              </span>
              <span className="text-on-surface-variant ml-4 shrink-0">{page.count.toLocaleString()}</span>
            </div>
            <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-cyan rounded-full transition-all duration-700 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Main Dashboard ---

export default function AnalyticsDashboard({ initialData }: { initialData: AnalyticsData }) {
  const [data, setData] = useState<AnalyticsData>(initialData);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const lastUpdatedRef = useRef<Date>(new Date());

  const fetchAnalytics = useCallback(async (intervalId?: NodeJS.Timeout) => {
    if (isPaused) return;
    
    try {
      const res = await fetch('/api/analytics', { cache: 'no-store' });
      if (!res.ok) { 
        setIsLive(false); 
        // If unauthorized (session expired), stop polling entirely
        if (res.status === 401 && intervalId) {
          clearInterval(intervalId);
        }
        return; 
      }
      const newData: AnalyticsData = await res.json();
      setData(newData);
      lastUpdatedRef.current = new Date();
      setIsLive(true);
      setSecondsAgo(0);
    } catch {
      setIsLive(false);
    }
  }, [isPaused]);

  // Poll every 10 seconds
  useEffect(() => {
    const poll = setInterval(() => fetchAnalytics(poll), 10_000);
    return () => clearInterval(poll);
  }, [fetchAnalytics]);

  // Update "X seconds ago" counter every second
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastUpdatedRef.current.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="space-y-6">
      {/* Section header with live indicator */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-on-surface">Live Analytics</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setIsPaused(!isPaused);
              if (isPaused) {
                // Instantly fetch when resuming
                fetchAnalytics();
              }
            }}
            className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant bg-surface border border-outline-variant/30 px-3 py-1.5 rounded-full hover:bg-surface-container hover:text-on-surface transition-colors"
          >
            {isPaused ? (
              <>
                <Play size={14} className="text-brand-emerald" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Pause size={14} className="text-amber-400" />
                <span>Pause Updates</span>
              </>
            )}
          </button>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant bg-surface border border-outline-variant/30 px-3 py-1.5 rounded-full">
            <span
              className={`inline-block w-2 h-2 rounded-full ${isPaused ? 'bg-outline-variant' : isLive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}
            />
            <span className="text-xs">
              {isPaused 
                ? 'Paused'
                : isLive
                  ? secondsAgo < 5 ? 'Just updated' : `Updated ${secondsAgo}s ago`
                  : 'Connection error'}
            </span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Total Views" value={data.totalViews} icon={Eye} colorClass="text-brand-cyan" gradientClass="bg-brand-cyan" />
        <StatCard label="Unique Visitors" value={data.uniqueVisitors} icon={Users} colorClass="text-brand-emerald" gradientClass="bg-brand-emerald" />
        <StatCard label="Views Today" value={data.viewsToday} icon={Calendar} colorClass="text-purple-400" gradientClass="bg-purple-400" />
      </div>

      {/* 7-Day Trend */}
      <div className="bg-surface-container/40 backdrop-blur-md border border-outline-variant/20 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Activity className="text-brand-cyan" size={18} />
            <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider">7-Day Trend</h3>
          </div>
          <span className="text-xs font-medium bg-surface-container-highest px-3 py-1 rounded-full text-on-surface-variant">
            {data.viewsByDay.reduce((s, d) => s + d.count, 0)} total this week
          </span>
        </div>
        <BarChart data={data.viewsByDay} />
      </div>

      {/* Top Pages + World Map */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-surface-container/40 backdrop-blur-md border border-outline-variant/20 rounded-3xl p-8">
          <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider mb-6">Top Pages</h3>
          <TopPagesList pages={data.topPages} />
        </div>

        <div className="lg:col-span-3 bg-surface-container/40 backdrop-blur-md border border-outline-variant/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider">Geographic Distribution</h3>
            <span className="text-xs font-medium bg-surface-container-highest px-3 py-1 rounded-full text-on-surface-variant">{data.topCountries.length} countries</span>
          </div>

          {data.locations.length === 0 ? (
            <div className="h-52 flex flex-col items-center justify-center gap-4 text-on-surface-variant">
              <Globe size={48} className="opacity-20" />
              <div className="text-center">
                <p className="text-sm font-medium text-on-surface mb-1">No geographic data yet</p>
                <p className="text-xs opacity-60">Geo data requires real IP addresses (not localhost)</p>
              </div>
            </div>
          ) : (
            <>
              <WorldMap locations={data.locations} />
              {data.topCountries.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5">
                  {data.topCountries.map((c, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant truncate">{c.country}</span>
                      <span className="font-semibold text-on-surface ml-2">{c.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ShieldCheck, LogIn, FileEdit, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchAuditLogs } from './actions';

export default function AuditLogTable() {
  const [logs, setLogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Use a debounced query for fetching to avoid spamming the server
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const loadLogs = async () => {
      setIsLoading(true);
      try {
        const { logs, totalPages } = await fetchAuditLogs(page, debouncedQuery);
        setLogs(logs);
        setTotalPages(totalPages || 1); // Ensure at least 1 page
      } catch (error) {
        console.error("Failed to fetch audit logs", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLogs();
  }, [page, debouncedQuery]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  return (
    <div className="bg-surface-container/40 backdrop-blur-md border border-outline-variant/20 rounded-3xl p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} className="text-brand-emerald" />
          <h2 className="text-sm font-semibold text-on-surface uppercase tracking-widest">Security & Audit Logs</h2>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search logs..."
            className="w-full bg-surface-variant/30 border border-outline-variant/30 rounded-xl pl-9 pr-4 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald/50 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20">
              <th className="pb-3 text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Time</th>
              <th className="pb-3 text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Action</th>
              <th className="pb-3 text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Details</th>
              <th className="pb-3 text-xs font-semibold text-on-surface-variant uppercase tracking-widest">IP / Device</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-on-surface-variant text-sm">
                  <span className="material-symbols-outlined animate-spin text-2xl inline-block">progress_activity</span>
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-on-surface-variant text-sm">
                  No security or audit logs found.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-variant/30 transition-colors">
                  <td className="py-3 pr-4 text-on-surface-variant whitespace-nowrap">
                    {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      log.action === 'AUTH' ? 'bg-brand-emerald/10 text-brand-emerald' :
                      log.action === 'SECURITY' ? 'bg-error/10 text-error' :
                      'bg-brand-cyan/10 text-brand-cyan'
                    }`}>
                      {log.action === 'AUTH' && <LogIn size={12} />}
                      {log.action === 'MODIFICATION' && <FileEdit size={12} />}
                      {log.action === 'SECURITY' && <ShieldCheck size={12} />}
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-on-surface">
                    {log.details}
                  </td>
                  <td className="py-3 text-on-surface-variant">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-xs">{log.ipAddress || 'Unknown IP'}</span>
                      <span className="text-[10px] truncate max-w-[200px]" title={log.userAgent || ''}>
                        {log.userAgent || 'Unknown Device'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline-variant/20">
        <span className="text-xs text-on-surface-variant">
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1 || isLoading}
            className="p-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages || isLoading}
            className="p-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { toggleLockdown, wipeTrafficLogs } from './actions';
import { Lock, Unlock } from 'lucide-react';
import { useToast } from '../../../contexts/ToastContext';
import { useRouter } from 'next/navigation';

export default function LockdownButton({ initialState }: { initialState: boolean }) {
  const [isLockedDown, setIsLockedDown] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isWiping, setIsWiping] = useState(false);
  const [wipeDuration, setWipeDuration] = useState<string>('30');
  const { showToast } = useToast();
  const router = useRouter();

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const newState = await toggleLockdown();
      setIsLockedDown(newState);
      showToast(newState ? 'Public site is now locked down' : 'Public site is now online', 'success');
      router.refresh();
    } catch (error) {
      showToast('Failed to toggle lockdown state', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWipe = async () => {
    if (!confirm('Are you absolutely sure you want to wipe these traffic logs? This action cannot be undone.')) {
      return;
    }

    setIsWiping(true);
    try {
      const days = wipeDuration === 'all' ? null : parseInt(wipeDuration, 10);
      const count = await wipeTrafficLogs(days);
      showToast(`Successfully deleted ${count} traffic logs.`, 'success');
      router.refresh();
    } catch (error) {
      showToast('Failed to wipe traffic logs', 'error');
    } finally {
      setIsWiping(false);
    }
  };

  return (
    <div className="bg-surface-container/60 backdrop-blur-md border border-error/30 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center">
      <h2 className="text-sm font-semibold text-error uppercase tracking-widest mb-4">System Actions</h2>
      <p className="text-sm text-on-surface-variant mb-6">
        {isLockedDown 
          ? "The public site is currently offline and showing a maintenance screen. Admin access remains active."
          : "Take the entire public site offline immediately. Admin routes will remain fully functional."}
      </p>
      <div className="space-y-3">
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
            isLockedDown
              ? 'bg-brand-emerald/20 text-brand-emerald hover:bg-brand-emerald/30 border border-brand-emerald/30'
              : 'bg-error/20 text-error hover:bg-error/30 border border-error/30'
          } ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
        >
          {isLockedDown ? (
            <>
              <Unlock size={18} />
              Restore Public Site
            </>
          ) : (
            <>
              <Lock size={18} />
              Lockdown Public Site
            </>
          )}
        </button>
        
        <div className="flex gap-2">
          <select 
            value={wipeDuration} 
            onChange={(e) => setWipeDuration(e.target.value)}
            disabled={isWiping}
            className="bg-surface border border-outline-variant/30 text-on-surface text-sm rounded-xl px-3 py-3 focus:outline-none focus:border-error/50 transition-colors w-1/3"
          >
            <option value="3">Older than 3 Days</option>
            <option value="7">Older than 7 Days</option>
            <option value="15">Older than 15 Days</option>
            <option value="30">Older than 30 Days</option>
            <option value="all">All Traffic Logs</option>
          </select>
          <button 
            onClick={handleWipe}
            disabled={isWiping} 
            className={`w-2/3 py-3 rounded-xl font-medium transition-all duration-300 ${
              isWiping 
                ? 'bg-error/10 text-error/50 border border-error/10 cursor-wait' 
                : 'bg-error/10 text-error hover:bg-error/20 border border-error/20'
            }`}
          >
            {isWiping ? 'Wiping...' : 'Wipe Traffic Data'}
          </button>
        </div>
      </div>
    </div>
  );
}

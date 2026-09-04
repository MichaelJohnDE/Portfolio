import { headers } from 'next/headers';
import { ShieldAlert, Laptop, Network } from 'lucide-react';
import AuditLogTable from './AuditLogTable';
import TrafficLogTable from './TrafficLogTable';
import ObscuredIp from './ObscuredIp';
import LockdownButton from './LockdownButton';
import { prisma } from '../../../lib/prisma';

export default async function DangerZonePage() {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'Unknown IP';
  const userAgent = headersList.get('user-agent') || 'Unknown Device';

  const profile = await prisma.profile.findUnique({ where: { id: "singleton" } });
  const isLockedDown = profile?.isLockedDown || false;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-error/10 text-error rounded-xl border border-error/20">
          <ShieldAlert size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-error tracking-tight">Danger Zone</h1>
          <p className="text-sm text-error/80">Restricted area with highly sensitive system information and actions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Admin Connection Details */}
        <div className="bg-surface-container/60 backdrop-blur-md border border-error/30 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-error/5 blur-[3rem] rounded-full translate-x-1/4 -translate-y-1/4" />
          
          <h2 className="text-sm font-semibold text-error uppercase tracking-widest mb-6">Your Connection Profile</h2>
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-error/10 text-error border border-error/20">
                <Network size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1">IP Address</p>
                <ObscuredIp ip={ip} />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-error/10 text-error border border-error/20">
                <Laptop size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Device / User Agent</p>
                <p className="text-sm text-on-surface font-mono break-all">{userAgent}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Destructive Actions */}
        <LockdownButton initialState={isLockedDown} />
      </div>

      <div className="space-y-6">
        <AuditLogTable />
        <TrafficLogTable />
      </div>
    </div>
  );
}

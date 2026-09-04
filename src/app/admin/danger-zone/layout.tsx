import { cookies } from 'next/headers';
import SudoLockScreen from './SudoLockScreen';

export default async function DangerZoneLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const hasSudoSession = cookieStore.get('sudo_session')?.value === 'verified';

  if (!hasSudoSession) {
    return <SudoLockScreen />;
  }

  return <>{children}</>;
}

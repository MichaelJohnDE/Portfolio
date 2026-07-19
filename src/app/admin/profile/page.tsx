import { prisma } from '../../../lib/prisma';
import ProfileClient from './ProfileClient';

export const dynamic = 'force-dynamic';

export default async function ProfileAdminPage() {
  const profile = await prisma.profile.findUnique({
    where: { id: "singleton" },
    include: { socials: true }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-on-surface">Profile & Settings</h1>
      </div>

      <ProfileClient initialData={profile || {}} />
    </div>
  );
}

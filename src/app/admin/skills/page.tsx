import { prisma } from '../../../lib/prisma';
import SkillClient from './SkillClient';

export const dynamic = 'force-dynamic';

export default async function SkillsAdminPage() {
  const categories = await prisma.skillCategory.findMany({
    include: {
      skills: true
    },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-on-surface">Manage Skills</h1>
      </div>
      <SkillClient initialData={categories} />
    </div>
  );
}

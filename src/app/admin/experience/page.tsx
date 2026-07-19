import { prisma } from '../../../lib/prisma';
import ExperienceClient from './ExperienceClient';
import { parseStatedDate } from '../../../utils/dateParser';

export const dynamic = 'force-dynamic';

export default async function ExperienceAdminPage() {
  const experiences = await prisma.experience.findMany();
  experiences.sort((a, b) => parseStatedDate(b.date) - parseStatedDate(a.date));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-on-surface">Manage Experience</h1>
      </div>
      <ExperienceClient initialData={experiences} />
    </div>
  );
}

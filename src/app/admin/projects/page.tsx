import { prisma } from '../../../lib/prisma';
import ProjectClient from './ProjectClient';

export const dynamic = 'force-dynamic';

export default async function ProjectsAdminPage() {
  const [projects, profile] = await Promise.all([
    prisma.project.findMany({
      orderBy: { order: 'asc' }
    }),
    prisma.profile.findUnique({
      where: { id: "singleton" }
    })
  ]);

  const userName = profile ? `${profile.firstName} ${profile.lastName}`.trim() : "Me";

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-on-surface">Manage Projects</h1>
      </div>
      <ProjectClient initialData={projects} userName={userName} />
    </div>
  );
}

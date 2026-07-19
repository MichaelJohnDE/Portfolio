import { prisma } from '../../../lib/prisma';
import { notFound } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const allProjects = await prisma.project.findMany({ where: { archivedAt: null } });
  const project = allProjects.find(p => p.link.endsWith(`/${resolvedParams.slug}`));

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project as any} />;
}

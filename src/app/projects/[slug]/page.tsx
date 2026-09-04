import { Metadata } from 'next';
import { prisma } from '../../../lib/prisma';
import { notFound } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';
import MaintenanceScreen from '../../../components/MaintenanceScreen';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const allProjects = await prisma.project.findMany({ where: { archivedAt: null } });
  const project = allProjects.find(p => p.link.endsWith(`/${resolvedParams.slug}`));

  if (!project) {
    return { title: 'Project Not Found | MJDBuilt' };
  }

  const title = `${project.title} | MJDBuilt`;
  const description = project.subtitle || project.description.substring(0, 160);
  const images = project.images && project.images.length > 0 ? [project.images[0]] : [];
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    }
  };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  let allProjects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  let profile = null;

  try {
    allProjects = await prisma.project.findMany({ where: { archivedAt: null } });
    profile = await prisma.profile.findUnique({ where: { id: "singleton" } });
  } catch (e) {
    console.error('[ProjectPage] DB error:', e);
    notFound();
  }

  const project = allProjects.find(p => p.link.endsWith(`/${resolvedParams.slug}`));

  if (profile?.isLockedDown) {
    return <MaintenanceScreen />;
  }

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project as any} />;
}

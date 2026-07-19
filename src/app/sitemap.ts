import { MetadataRoute } from 'next';
import { prisma } from '../lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mjd-built.com';

  let projects = [];
  try {
    projects = await prisma.project.findMany({ 
      where: { archivedAt: null },
      select: { link: true, updatedAt: true }
    });
  } catch (e) {
    console.error("Failed to load projects for sitemap", e);
  }

  const projectUrls: MetadataRoute.Sitemap = projects
    .filter(p => p.link && p.link.startsWith('/projects/'))
    .map((project) => ({
      url: `${baseUrl}${project.link}`,
      lastModified: project.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    ...projectUrls
  ];
}

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  for (const project of projects) {
    if (!project.content) {
      await prisma.project.update({
        where: { id: project.id },
        data: {
          content: `# ${project.title}\n\n## Overview\n${project.description}\n\n### Tech Stack\n${project.tags.map(t => `- ${t}`).join('\n')}\n\nMore details coming soon...`
        }
      });
      console.log(`Updated content for project: ${project.title}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

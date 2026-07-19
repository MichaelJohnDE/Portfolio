'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../../lib/prisma';
import { createClient } from '../../utils/supabase/server';

async function checkAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

// ------------------------------------------------------------------
// EXPERIENCE ACTIONS
// ------------------------------------------------------------------
export async function addExperience(data: { role: string, company: string, date: string, connector: string, description: string }) {
  await checkAuth();
  await prisma.experience.create({ data });
  revalidatePath('/');
  revalidatePath('/admin/experience');
}

export async function updateExperience(id: string, data: { role: string, company: string, date: string, connector: string, description: string }) {
  await checkAuth();
  await prisma.experience.update({ where: { id }, data });
  revalidatePath('/');
  revalidatePath('/admin/experience');
}

export async function deleteExperience(id: string) {
  await checkAuth();
  await prisma.experience.update({ where: { id }, data: { archivedAt: new Date() } });
  revalidatePath('/');
  revalidatePath('/admin/experience');
}

export async function restoreExperience(id: string) {
  await checkAuth();
  await prisma.experience.update({ where: { id }, data: { archivedAt: null } });
  revalidatePath('/');
  revalidatePath('/admin/experience');
}

export async function hardDeleteExperience(id: string) {
  await checkAuth();
  await prisma.experience.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/experience');
}

// ------------------------------------------------------------------
// PROJECT ACTIONS
// ------------------------------------------------------------------
export async function addProject(data: { title: string, subtitle: string, description: string, content?: string, images: string[], link: string, deployedLink?: string | null, projectType: string, teamSize: string, tags: string[], collaborators: any }) {
  await checkAuth();
  await prisma.project.create({ data });
  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function updateProject(id: string, data: { title: string, subtitle: string, description: string, content?: string, images: string[], link: string, deployedLink?: string | null, projectType: string, teamSize: string, tags: string[], collaborators: any }) {
  await checkAuth();
  await prisma.project.update({ where: { id }, data });
  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function deleteProject(id: string) {
  await checkAuth();
  await prisma.project.update({ where: { id }, data: { archivedAt: new Date() } });
  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function restoreProject(id: string) {
  await checkAuth();
  await prisma.project.update({ where: { id }, data: { archivedAt: null } });
  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function hardDeleteProject(id: string) {
  await checkAuth();
  await prisma.project.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function reorderProjects(orderedIds: string[]) {
  await checkAuth();
  const updates = orderedIds.map((id, index) => 
    prisma.project.update({
      where: { id },
      data: { order: index }
    })
  );
  await prisma.$transaction(updates);
  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function uploadProjectImages(formData: FormData) {
  await checkAuth();
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const files = formData.getAll('images') as File[];
  const uploadedUrls: string[] = [];

  for (const file of files) {
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
      const fileName = `proj_${Date.now()}_${safeName}`;
      const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'projects');
      
      // Ensure directory exists
      await fs.mkdir(dir, { recursive: true });
      
      const dest = path.join(dir, fileName);
      await fs.writeFile(dest, buffer);
      
      uploadedUrls.push(`/assets/images/projects/${fileName}`);
    }
  }

  return uploadedUrls;
}

// ------------------------------------------------------------------
// CERTIFICATION ACTIONS
// ------------------------------------------------------------------
export async function addCertification(data: { title: string, issuer: string, date: string, image?: string, icon?: string }) {
  await checkAuth();
  await prisma.certification.create({ data });
  revalidatePath('/');
  revalidatePath('/admin/certifications');
}

export async function updateCertification(id: string, data: { title: string, issuer: string, date: string, image?: string, icon?: string }) {
  await checkAuth();
  await prisma.certification.update({ where: { id }, data });
  revalidatePath('/');
  revalidatePath('/admin/certifications');
}

export async function deleteCertification(id: string) {
  await checkAuth();
  await prisma.certification.update({ where: { id }, data: { archivedAt: new Date() } });
  revalidatePath('/');
  revalidatePath('/admin/certifications');
}

export async function restoreCertification(id: string) {
  await checkAuth();
  await prisma.certification.update({ where: { id }, data: { archivedAt: null } });
  revalidatePath('/');
  revalidatePath('/admin/certifications');
}

export async function hardDeleteCertification(id: string) {
  await checkAuth();
  await prisma.certification.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/certifications');
}

export async function uploadCertificationImage(formData: FormData) {
  await checkAuth();
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const file = formData.get('image') as File | null;
  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
    const fileName = `cert_${Date.now()}_${safeName}`;
    const dir = path.join(process.cwd(), 'public', 'assets', 'images', 'certs');
    
    await fs.mkdir(dir, { recursive: true });
    
    const dest = path.join(dir, fileName);
    await fs.writeFile(dest, buffer);
    
    return `/assets/images/certs/${fileName}`;
  }
  return null;
}

// ------------------------------------------------------------------
// SKILL ACTIONS
// ------------------------------------------------------------------
export async function addSkillCategory(data: { title: string, icon?: string }) {
  await checkAuth();
  await prisma.skillCategory.create({ data });
  revalidatePath('/');
  revalidatePath('/admin/skills');
}

export async function updateSkillCategory(id: string, data: { title: string, icon?: string }) {
  await checkAuth();
  await prisma.skillCategory.update({ where: { id }, data });
  revalidatePath('/');
  revalidatePath('/admin/skills');
}

export async function deleteSkillCategory(id: string) {
  await checkAuth();
  await prisma.skillCategory.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/skills');
}

export async function addSkill(data: { name: string, slug?: string, color?: string, path?: string, icon?: string, skillCategoryId: string }) {
  await checkAuth();
  await prisma.skill.create({ data });
  revalidatePath('/');
  revalidatePath('/admin/skills');
}

export async function updateSkill(id: string, data: { name: string, slug?: string, color?: string, path?: string, icon?: string, skillCategoryId: string }) {
  await checkAuth();
  await prisma.skill.update({ where: { id }, data });
  revalidatePath('/');
  revalidatePath('/admin/skills');
}

export async function deleteSkill(id: string) {
  await checkAuth();
  await prisma.skill.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/skills');
}

// ------------------------------------------------------------------
// PROFILE ACTIONS
// ------------------------------------------------------------------
export async function updateProfile(data: any) {
  await checkAuth();
  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data }
  });
  revalidatePath('/');
  revalidatePath('/admin/profile');
}

export async function addSocialLink(data: { platform: string, handle: string, url: string, icon: string }) {
  await checkAuth();
  await prisma.socialLink.create({
    data: { ...data, profileId: "singleton" }
  });
  revalidatePath('/');
  revalidatePath('/admin/profile');
}

export async function deleteSocialLink(id: string) {
  await checkAuth();
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/profile');
}

export async function updateSocialLink(id: string, data: { platform: string, handle: string, url: string, icon: string }) {
  await checkAuth();
  await prisma.socialLink.update({
    where: { id },
    data
  });
  revalidatePath('/');
  revalidatePath('/admin/profile');
}

export async function uploadResumeFiles(formData: FormData) {
  await checkAuth();
  const fs = await import('fs/promises');
  const path = await import('path');

  const pdfFile = formData.get('resumePdf') as File | null;

  if (pdfFile && pdfFile.size > 0) {
    // 1. Find and delete the old resume file
    const currentProfile = await prisma.profile.findUnique({
      where: { id: "singleton" }
    });

    if (currentProfile && currentProfile.resumeUrl) {
      try {
        // Strip leading slash to build correct absolute path
        const relativePath = currentProfile.resumeUrl.replace(/^\/+/, '');
        const oldFilePath = path.join(process.cwd(), 'public', relativePath);
        await fs.unlink(oldFilePath);
        console.log(`Deleted old resume: ${oldFilePath}`);
      } catch (err) {
        // Ignore errors (e.g., file doesn't exist or is an external URL)
        console.log("Old resume not found or couldn't be deleted.");
      }
    }

    // 2. Save the new resume file
    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    // Create a unique filename to bust browser cache
    const fileName = `resume_${Date.now()}.pdf`;
    const dest = path.join(process.cwd(), 'public', 'assets', fileName);
    await fs.writeFile(dest, buffer);

    await prisma.profile.update({
      where: { id: "singleton" },
      data: { resumeUrl: `/assets/${fileName}` }
    });

    revalidatePath('/');
    revalidatePath('/admin/profile');
  }
}

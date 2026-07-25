import { prisma } from '../lib/prisma'
import HomePageClient from './HomePageClient'
import { parseStatedDate } from '../utils/dateParser'
import MaintenanceScreen from '../components/MaintenanceScreen'

export default async function Page() {
  const experiences = await prisma.experience.findMany({ where: { archivedAt: null } })
  experiences.sort((a, b) => parseStatedDate(b.date) - parseStatedDate(a.date))

  const projects = await prisma.project.findMany({ where: { archivedAt: null }, orderBy: { order: 'asc' } })

  const certifications = await prisma.certification.findMany({ where: { archivedAt: null } })
  certifications.sort((a, b) => parseStatedDate(b.date) - parseStatedDate(a.date))
  const skills = await prisma.skillCategory.findMany({ 
    include: { skills: true }, 
    orderBy: { createdAt: 'asc' } 
  })
  
  const profile = await prisma.profile.findUnique({
    where: { id: "singleton" },
    include: { socials: true }
  })

  if (profile?.isLockedDown) {
    return <MaintenanceScreen />;
  }

  return (
    <HomePageClient 
      experiences={experiences} 
      projects={projects} 
      certifications={certifications} 
      skills={skills} 
      profile={profile}
    />
  )
}

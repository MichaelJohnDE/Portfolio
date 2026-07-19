import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { prisma } from '../../lib/prisma'

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const projectsCount = await prisma.project.count()
  const expCount = await prisma.experience.count()
  const certsCount = await prisma.certification.count()
  const skillsCount = await prisma.skill.count()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-on-surface">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { title: 'Projects', count: projectsCount, color: 'text-brand-cyan' },
          { title: 'Experiences', count: expCount, color: 'text-brand-emerald' },
          { title: 'Certifications', count: certsCount, color: 'text-blue-400' },
          { title: 'Skills', count: skillsCount, color: 'text-purple-400' },
        ].map((stat) => (
          <div key={stat.title} className="bg-surface border border-outline-variant/30 p-6 rounded-2xl shadow-sm">
            <h3 className="text-on-surface-variant text-sm font-medium uppercase tracking-wider mb-2">{stat.title}</h3>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Welcome to your CMS</h2>
        <p className="text-on-surface-variant">
          Use the sidebar navigation to manage your Experiences, Projects, Certifications, and Skills. Any changes made here will be instantly reflected on your live portfolio.
        </p>
      </div>
    </div>
  )
}

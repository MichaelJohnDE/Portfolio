'use client';

import { useState } from 'react';
import { 
  addSkillCategory, deleteSkillCategory, updateSkillCategory,
  addSkill, deleteSkill, updateSkill 
} from '../actions';
import { useToast } from '../../../contexts/ToastContext';
import * as Icons from 'lucide-react';

const POPULAR_TECH = [
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "React Native", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
  { name: "Angular", slug: "angular", color: "DD0031" },
  { name: "Svelte", slug: "svelte", color: "FF3E00" },
  { name: "Laravel", slug: "laravel", color: "FF2D20" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Bootstrap", slug: "bootstrap", color: "7952B3" },
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "CSS3", slug: "css3", color: "1572B6" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "PHP", slug: "php", color: "777BB4" },
  { name: "MySQL", slug: "mysql", color: "4479A1" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "Firebase", slug: "firebase", color: "FFCA28" },
  { name: "Supabase", slug: "supabase", color: "3ECF8E" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "GitHub", slug: "github", color: "181717" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "Expo", slug: "expo", color: "000020" },
  { name: "Android Studio", slug: "androidstudio", color: "3DDC84" },
  { name: "Vite", slug: "vite", color: "646CFF" },
  { name: "Ant Design", slug: "antdesign", color: "0170FE" },
  { name: "C#", slug: "csharp", color: "239120" },
  { name: "C++", slug: "cplusplus", color: "00599C" },
  { name: "Java", slug: "java", color: "007396" },
  { name: "Spring", slug: "spring", color: "6DB33F" },
  { name: "Prisma", slug: "prisma", color: "2D3748" },
  { name: "Express", slug: "express", color: "000000" },
  { name: "Redis", slug: "redis", color: "DC382D" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "Netlify", slug: "netlify", color: "00C7B7" },
  { name: "Cloudflare", slug: "cloudflare", color: "F38020" },
  { name: "Amazon AWS", slug: "amazonaws", color: "232F3E" },
  { name: "Google Cloud", slug: "googlecloud", color: "4285F4" },
  { name: "Stripe", slug: "stripe", color: "008CDD" },
  { name: "WordPress", slug: "wordpress", color: "21759B" },
  { name: "Shopify", slug: "shopify", color: "95BF47" }
];

export default function SkillClient({ initialData }) {
  const [categories, setCategories] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  
  // Category Modal State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState(null);
  const [catFormData, setCatFormData] = useState({ title: '', icon: '' });

  // Skill Modal State
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [techSearch, setTechSearch] = useState('');
  const [skillFormData, setSkillFormData] = useState({
    name: '', slug: '', color: '', path: '', icon: '', skillCategoryId: ''
  });

  const filteredTech = POPULAR_TECH.filter(t => t.name.toLowerCase().includes(techSearch.toLowerCase()) || t.slug.toLowerCase().includes(techSearch.toLowerCase()));

  // Category Handlers
  const openCatModal = (cat = null) => {
    if (cat) {
      setEditingCatId(cat.id);
      setCatFormData({ title: cat.title, icon: cat.icon || '' });
    } else {
      setEditingCatId(null);
      setCatFormData({ title: '', icon: '' });
    }
    setIsCatModalOpen(true);
  };

  const handleCatSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = {
        title: catFormData.title,
        icon: catFormData.icon.trim() || undefined
      };
      if (editingCatId) {
        await updateSkillCategory(editingCatId, data);
        showToast('Category updated successfully!', 'success');
      } else {
        await addSkillCategory(data);
        showToast('Category added successfully!', 'success');
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
      showToast('Error saving category', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCatDelete = async (id) => {
    if (confirm('Are you sure you want to delete this category? All skills inside will also be deleted!')) {
      try {
        await deleteSkillCategory(id);
        showToast('Category deleted successfully!', 'success');
        window.location.reload();
      } catch (error) {
        console.error(error);
        showToast('Error deleting category', 'error');
      }
    }
  };

  // Skill Handlers
  const openSkillModal = (categoryId, skill = null) => {
    if (skill) {
      setEditingSkillId(skill.id);
      setSkillFormData({
        name: skill.name,
        slug: skill.slug || '',
        color: skill.color || '',
        path: skill.path || '',
        icon: skill.icon || '',
        skillCategoryId: categoryId
      });
    } else {
      setEditingSkillId(null);
      setSkillFormData({
        name: '',
        slug: '',
        color: '',
        path: '',
        icon: '',
        skillCategoryId: categoryId
      });
    }
    setIsSkillModalOpen(true);
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = {
        name: skillFormData.name,
        slug: skillFormData.slug.trim() || undefined,
        color: skillFormData.color.trim() || undefined,
        path: skillFormData.path.trim() || undefined,
        icon: skillFormData.icon.trim() || undefined,
        skillCategoryId: skillFormData.skillCategoryId
      };
      if (editingSkillId) {
        await updateSkill(editingSkillId, data);
        showToast('Skill updated successfully!', 'success');
      } else {
        await addSkill(data);
        showToast('Skill added successfully!', 'success');
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
      showToast('Error saving skill', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkillDelete = async (id) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id);
        showToast('Skill deleted successfully!', 'success');
        window.location.reload();
      } catch (error) {
        console.error(error);
        showToast('Error deleting skill', 'error');
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <button onClick={() => openCatModal()} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Category
        </button>
      </div>

      <div className="space-y-8">
        {categories.map((cat) => {
          const CatIcon = cat.icon ? (Icons[cat.icon as keyof typeof Icons] as any) : null;
          return (
            <div key={cat.id} className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-surface-variant/50 p-4 border-b border-outline-variant/30 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {CatIcon && <CatIcon className="text-primary" size={20} />}
                  <h2 className="font-bold text-lg text-on-surface">{cat.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openSkillModal(cat.id)} className="text-sm font-medium text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">add</span> Add Skill
                  </button>
                  <button onClick={() => openCatModal(cat)} className="text-on-surface-variant hover:text-primary transition-colors p-1.5">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button onClick={() => handleCatDelete(cat.id)} className="text-on-surface-variant hover:text-error transition-colors p-1.5">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
              
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.skills.length === 0 ? (
                  <p className="text-sm text-on-surface-variant py-2">No skills in this category yet.</p>
                ) : cat.skills.map((skill) => (
                  <div key={skill.id} className="bg-surface-container border border-outline-variant/50 rounded-lg p-3 flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      {skill.icon && Icons[skill.icon as keyof typeof Icons] ? (
                        <div className="text-on-surface-variant flex items-center justify-center w-4 h-4">
                          {(() => {
                            const IconComponent = Icons[skill.icon as keyof typeof Icons] as any;
                            return <IconComponent size={16} />;
                          })()}
                        </div>
                      ) : skill.slug ? (
                        <img src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color?.replace('#','')}`} alt={skill.name} className="w-4 h-4 object-contain" />
                      ) : skill.path ? (
                        <img src={skill.path} alt={skill.name} className="w-4 h-4 object-contain" />
                      ) : (
                        <div className="w-4 h-4 bg-outline-variant rounded-full"></div>
                      )}
                      <span className="text-sm font-medium text-on-surface">{skill.name}</span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openSkillModal(cat.id, skill)} className="text-primary hover:text-primary/80">
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button onClick={() => handleSkillDelete(skill.id)} className="text-error hover:text-error/80">
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CATEGORY MODAL */}
      {isCatModalOpen && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-md rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
              <h2 className="text-xl font-bold text-on-surface">{editingCatId ? 'Edit' : 'Add'} Category</h2>
              <button onClick={() => setIsCatModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form id="cat-form" onSubmit={handleCatSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Title</label>
                  <input type="text" required value={catFormData.title} onChange={e => setCatFormData({...catFormData, title: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Lucide Icon Name</label>
                  <input type="text" value={catFormData.icon} onChange={e => setCatFormData({...catFormData, icon: e.target.value})} placeholder="e.g. Layout" className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary" />
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-outline-variant/20 bg-surface-variant/30 flex justify-end gap-3">
              <button onClick={() => setIsCatModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-on-surface-variant hover:bg-surface-variant transition-colors">Cancel</button>
              <button form="cat-form" type="submit" disabled={isSubmitting} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SKILL MODAL */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-xl rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
              <h2 className="text-xl font-bold text-on-surface">{editingSkillId ? 'Edit' : 'Add'} Skill</h2>
              <button onClick={() => setIsSkillModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form id="skill-form" onSubmit={handleSkillSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Name</label>
                  <input type="text" required value={skillFormData.name} onChange={e => setSkillFormData({...skillFormData, name: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary" />
                </div>
                
                <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/50 mb-4">
                  <p className="text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Icon Source (Provide One)</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-1">Lucide Icon</label>
                      <input type="text" value={skillFormData.icon} onChange={e => setSkillFormData({...skillFormData, icon: e.target.value})} placeholder="e.g. Database" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-1">Image Path</label>
                      <input type="text" value={skillFormData.path} onChange={e => setSkillFormData({...skillFormData, path: e.target.value})} placeholder="e.g. /assets/images/logo.png" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary text-sm" />
                    </div>
                  </div>

                  <div className="border-t border-outline-variant/30 pt-4">
                    <p className="text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Search Tech Stack Icon</p>
                    <input 
                      type="text" 
                      placeholder="Search for a technology (e.g. React)..." 
                      value={techSearch}
                      onChange={e => setTechSearch(e.target.value)}
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary text-sm mb-3"
                    />
                    
                    <div className="max-h-48 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2 pr-2">
                      {filteredTech.map(tech => (
                        <button
                          key={tech.slug + tech.name}
                          type="button"
                          onClick={() => {
                            setSkillFormData({
                              ...skillFormData, 
                              slug: tech.slug, 
                              color: tech.color,
                              icon: '',
                              path: '',
                              // Auto-fill name if it's currently empty
                              name: skillFormData.name ? skillFormData.name : tech.name
                            })
                          }}
                          className={`flex items-center gap-2 p-2 rounded-lg border text-sm transition-colors text-left ${
                            skillFormData.slug === tech.slug ? 'border-primary bg-primary/10' : 'border-outline-variant/50 hover:bg-surface-variant/50'
                          }`}
                        >
                          <img src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`} alt={tech.name} className="w-5 h-5 object-contain" />
                          <span className="truncate">{tech.name}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-outline-variant/30 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-on-surface-variant mb-1">Custom Slug</label>
                        <input type="text" value={skillFormData.slug} onChange={e => setSkillFormData({...skillFormData, slug: e.target.value})} placeholder="Slug e.g. nextdotjs" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-on-surface-variant mb-1">Custom Color (HEX)</label>
                        <input type="text" value={skillFormData.color} onChange={e => setSkillFormData({...skillFormData, color: e.target.value})} placeholder="Color e.g. 000000" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-outline-variant/20 bg-surface-variant/30 flex justify-end gap-3">
              <button onClick={() => setIsSkillModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-on-surface-variant hover:bg-surface-variant transition-colors">Cancel</button>
              <button form="skill-form" type="submit" disabled={isSubmitting} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

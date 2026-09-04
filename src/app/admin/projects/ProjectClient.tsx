'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { addProject, deleteProject, updateProject, uploadProjectImages, reorderProjects, restoreProject, hardDeleteProject } from '../actions';
import { useToast } from '../../../contexts/ToastContext';
import dynamic from 'next/dynamic';
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type MediaItem = { id: string, type: 'url', url: string } | { id: string, type: 'file', file: File, preview: string };

export default function ProjectClient({ initialData, userName = 'Me' }: { initialData: any, userName?: string }) {
  const [projects, setProjects] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const { showToast } = useToast();

  const activeProjects = projects.filter((p: any) => !p.archivedAt);
  const archivedProjects = projects.filter((p: any) => p.archivedAt);
  const displayedProjects = activeTab === 'active' ? activeProjects : archivedProjects;


  // Unified Media State for Drag & Drop Reordering
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Project Reordering State
  const [draggedProjectIdx, setDraggedProjectIdx] = useState<number | null>(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [hasReordered, setHasReordered] = useState(false);

  // Attach a native wheel listener directly to the modal scroll container
  // to bypass Windows/Chrome scroll hijacking bugs when hovering over overlays.
  useEffect(() => {
    if (!isModalOpen) return;

    // Use a short timeout to ensure the modal is mounted in the DOM
    const timer = setTimeout(() => {
      const el = document.getElementById('project-modal-scroll');
      if (!el) return;

      const handleWheel = (e: any) => {
        el.scrollTop += e.deltaY;
        e.preventDefault();
      };

      el.addEventListener('wheel', handleWheel, { passive: false });

      // Clean up function inside the timeout
      return () => {
        el.removeEventListener('wheel', handleWheel);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [isModalOpen]);

  useEffect(() => {
    setIsMounted(true);
    // We removed the body scroll lock as it intercepts scroll wheel on some Windows browsers.
  }, [isModalOpen]);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    content: '',
    slug: '',
    deployedLink: '',
    projectType: 'Full-Stack Web App',
    teamSize: 'Solo',
    tags: [''],
    roles: [''],
    collaborators: [{ name: '', role: '' }] as { name: string, role: string }[]
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleOpenModal = (proj: any = null) => {
    if (proj) {
      setEditingId(proj.id);
      setFormData({
        title: proj.title,
        subtitle: proj.subtitle,
        description: proj.description,
        content: proj.content || '',
        slug: proj.link ? proj.link.replace('/projects/', '') : '',
        deployedLink: proj.deployedLink || '',
        projectType: proj.projectType,
        teamSize: proj.teamSize,
        tags: proj.tags.length ? proj.tags : [''],
        roles: proj.roles?.length ? proj.roles : [''],
        collaborators: proj.collaborators?.length ? (typeof proj.collaborators[0] === 'object' ? proj.collaborators : proj.collaborators.map((c: string) => ({ name: c, role: '' }))) : [{ name: '', role: '' }]
      });
      setMediaItems(proj.images ? proj.images.map((url: string) => ({ id: generateId(), type: 'url', url })) : []);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        content: '',
        slug: '',
        deployedLink: '',
        projectType: 'Full-Stack Web App',
        teamSize: 'Solo',
        tags: [''],
        roles: [''],
        collaborators: [{ name: '', role: '' }]
      });
      setMediaItems([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    mediaItems.forEach(item => {
      if (item.type === 'file') URL.revokeObjectURL(item.preview);
    });
  };

  // --- Tags ---
  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData({ ...formData, tags: newTags });
  };
  const handleAddTag = () => setFormData({ ...formData, tags: [...formData.tags, ''] });
  const handleRemoveTag = (index: number) => {
    const newTags = [...formData.tags];
    newTags.splice(index, 1);
    setFormData({ ...formData, tags: newTags });
  };

  // --- Roles ---
  const handleRoleChange = (index: number, value: string) => {
    const newRoles = [...formData.roles];
    newRoles[index] = value;
    setFormData({ ...formData, roles: newRoles });
  };
  const handleAddRole = () => setFormData({ ...formData, roles: [...formData.roles, ''] });
  const handleRemoveRole = (index: number) => {
    const newRoles = [...formData.roles];
    newRoles.splice(index, 1);
    setFormData({ ...formData, roles: newRoles });
  };

  // --- Collaborators ---
  const handleCollaboratorChange = (index: number, field: 'name' | 'role', value: string) => {
    const newCollabs = [...formData.collaborators];
    newCollabs[index][field] = value;
    setFormData({ ...formData, collaborators: newCollabs });
  };
  const handleAddCollaborator = () => setFormData({ ...formData, collaborators: [...formData.collaborators, { name: '', role: '' }] });
  const handleRemoveCollaborator = (index: number) => {
    const newCollabs = [...formData.collaborators];
    newCollabs.splice(index, 1);
    setFormData({ ...formData, collaborators: newCollabs });
  };

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value;
    setFormData(prev => {
      const isTeam = newSize !== 'Solo Project';
      let newCollabs = [...prev.collaborators];

      if (isTeam) {
        const userExists = newCollabs.some(c => c.name === userName);
        if (!userExists) {
          if (newCollabs.length === 1 && newCollabs[0].name === '' && newCollabs[0].role === '') {
            newCollabs[0] = { name: userName, role: '' };
          } else {
            newCollabs = [{ name: userName, role: '' }, ...newCollabs];
          }
        }
      }
      return { ...prev, teamSize: newSize, collaborators: newCollabs };
    });
  };


  // --- Image Upload DND ---
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files: File[]) => {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    const newItems = imageFiles.map(file => ({
      id: generateId(),
      type: 'file' as const,
      file,
      preview: URL.createObjectURL(file)
    }));
    setMediaItems(prev => [...prev, ...newItems]);
  };

  const removeMedia = (id: string) => {
    setMediaItems(prev => prev.filter(item => {
      if (item.id === id && item.type === 'file') URL.revokeObjectURL(item.preview);
      return item.id !== id;
    }));
  };

  // --- Image Reordering DND ---
  const handleSortDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSortDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;

    // Swap items
    setMediaItems(prev => {
      const updated = [...prev];
      const movedItem = updated[draggedIdx];
      updated.splice(draggedIdx, 1);
      updated.splice(index, 0, movedItem);
      setDraggedIdx(index);
      return updated;
    });
  };

  // --- Project Reordering DND ---
  const handleProjectDragStart = (e: React.DragEvent, index: number) => {
    setDraggedProjectIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleProjectDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedProjectIdx === null || draggedProjectIdx === index) return;
    
    // Swap items locally for instant visual feedback
    setProjects((prev: any[]) => {
      const updated = [...prev];
      const movedItem = updated[draggedProjectIdx];
      updated.splice(draggedProjectIdx, 1);
      updated.splice(index, 0, movedItem);
      setDraggedProjectIdx(index);
      setHasReordered(true);
      return updated;
    });
  };

  const handleProjectDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedProjectIdx(null);
    if (!hasReordered) return;
    setIsSavingOrder(true);
    try {
      const orderedIds = projects.map((p: any) => p.id);
      await reorderProjects(orderedIds);
      setHasReordered(false);
      showToast('Project order saved successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast("Failed to save new order.", "error");
    } finally {
      setIsSavingOrder(false);
    }
  };

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let uploadedUrls: string[] = [];
      const filesToUpload = mediaItems.filter(m => m.type === 'file').map(m => (m as any).file);

      if (filesToUpload.length > 0) {
        const uploadData = new FormData();
        filesToUpload.forEach(f => uploadData.append('images', f));
        uploadedUrls = await uploadProjectImages(uploadData);
      }

      let uploadIdx = 0;
      const finalImages = mediaItems.map(m => {
        if (m.type === 'url') return m.url;
        return uploadedUrls[uploadIdx++];
      });

      const cleanedData = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        content: formData.content.trim() || undefined,
        link: `/projects/${formData.slug}`,
        deployedLink: formData.deployedLink.trim() || null,
        projectType: formData.projectType,
        teamSize: formData.teamSize,
        images: finalImages,
        tags: formData.tags.filter(t => t.trim() !== ''),
        roles: formData.roles.filter(r => r.trim() !== ''),
        collaborators: formData.teamSize === 'Solo Project' ? [] : formData.collaborators.filter(c => c.name.trim() !== '')
      };

      if (editingId) {
        await updateProject(editingId, cleanedData);
        setProjects(projects.map((p: any) => p.id === editingId ? { ...p, ...cleanedData } : p));
        showToast('Project updated successfully!', 'success');
      } else {
        await addProject(cleanedData);
        showToast('Project added successfully!', 'success');
        window.location.reload();
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
      showToast('Error saving project', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: string) => {
    setItemToDelete(id);
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteProject(itemToDelete);
      setProjects(projects.map((p: any) => p.id === itemToDelete ? { ...p, archivedAt: new Date().toISOString() } : p));
      setItemToDelete(null);
      showToast('Project archived successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Error archiving project', 'error');
    }
  };

  const executeRestore = async (id: string) => {
    try {
      await restoreProject(id);
      setProjects(projects.map((p: any) => p.id === id ? { ...p, archivedAt: null } : p));
      showToast('Project restored successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Error restoring project', 'error');
    }
  };

  const executeHardDelete = async (id: string) => {
    if (confirm('Are you absolutely sure you want to permanently delete this? This cannot be undone.')) {
      try {
        await hardDeleteProject(id);
        setProjects(projects.filter((p: any) => p.id !== id));
        showToast('Project permanently deleted', 'success');
      } catch (error) {
        console.error(error);
        showToast('Error permanently deleting project', 'error');
      }
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex bg-surface-container rounded-lg p-1">
          <button 
            onClick={() => setActiveTab('active')} 
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'active' ? 'bg-surface shadow text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setActiveTab('archived')} 
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'archived' ? 'bg-surface shadow text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Archived ({archivedProjects.length})
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => handleOpenModal()} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Project
          </button>
          {isSavingOrder && <span className="text-sm text-primary flex items-center gap-1"><span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span> Saving order...</span>}
        </div>
      </div>

      <div className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-variant text-on-surface-variant border-b border-outline-variant/30">
                <th className="p-4 w-10"></th>
                <th className="p-4 font-medium text-sm">Title</th>
                <th className="p-4 font-medium text-sm">Subtitle</th>
                <th className="p-4 font-medium text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {displayedProjects.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">No projects found in this view.</td></tr>
              ) : displayedProjects.map((proj: any, idx: number) => (
                <tr 
                  key={proj.id} 
                  draggable={activeTab === 'active'}
                  onDragStart={(e) => handleProjectDragStart(e, idx)}
                  onDragOver={(e) => handleProjectDragOver(e, idx)}
                  onDrop={handleProjectDrop}
                  className={`hover:bg-surface-variant/30 transition-colors ${activeTab === 'active' ? 'cursor-grab active:cursor-grabbing' : ''} ${draggedProjectIdx === idx ? 'opacity-50 bg-surface-variant' : ''}`}
                >
                  <td className="p-4 text-on-surface-variant text-center w-10">
                    <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
                  </td>
                  <td className="p-4 text-on-surface font-medium">
                    <div>{proj.title}</div>
                    {proj.roles && proj.roles.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-on-surface-variant font-normal">
                        <span className="material-symbols-outlined text-[13px] text-primary">work_outline</span>
                        <span>{proj.roles.join(', ')}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-on-surface-variant text-sm">{proj.subtitle}</td>
                  <td className="p-4 text-right whitespace-nowrap">
                    {activeTab === 'active' ? (
                      <>
                        <button onClick={() => handleOpenModal(proj)} className="text-primary hover:text-primary/80 mr-3">Edit</button>
                        <button onClick={() => confirmDelete(proj.id)} className="text-error hover:text-error/80">Delete</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => executeRestore(proj.id)} className="text-primary hover:text-primary/80 mr-3">Restore</button>
                        <button onClick={() => executeHardDelete(proj.id)} className="text-error hover:text-error/80">Delete Permanently</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isMounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm transition-opacity" onClick={handleCloseModal} aria-hidden="true" />

          <div className="bg-surface w-full max-w-4xl rounded-2xl shadow-xl border border-outline-variant/30 text-left relative z-10 flex flex-col max-h-[95vh]">

            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low shrink-0 rounded-t-2xl">
              <h2 className="text-xl font-bold text-on-surface">{editingId ? 'Edit' : 'Add'} Project</h2>
              <button onClick={handleCloseModal} className="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-full hover:bg-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div id="project-modal-scroll" className="p-6 overflow-y-auto custom-scrollbar grow relative">
              <form id="proj-form" onSubmit={handleSubmit} className="space-y-8">

                {/* SECTION: BASIC INFO */}
                <section>
                  <h3 className="text-sm font-bold tracking-wider text-primary uppercase mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">info</span> Basic Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-1">Title</label>
                      <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-1">Subtitle</label>
                      <input type="text" required value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-1">Project Link (Slug)</label>
                      <div className="flex bg-surface-container border border-outline-variant rounded-lg overflow-hidden focus-within:border-primary transition-colors">
                        <span className="px-4 py-2.5 bg-surface-variant/50 text-on-surface-variant border-r border-outline-variant select-none">/projects/</span>
                        <input type="text" required value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="e.g. fsuu" className="w-full bg-transparent px-4 py-2.5 text-on-surface focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-1">Deployed Link (Optional)</label>
                      <input type="url" value={formData.deployedLink} onChange={e => setFormData({ ...formData, deployedLink: e.target.value })} placeholder="https://..." className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-1">Project Type</label>
                        <input type="text" required value={formData.projectType} onChange={e => setFormData({ ...formData, projectType: e.target.value })} placeholder="e.g. Full-Stack Web App, Solo Project" className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-1">Team Size</label>
                        <div className="relative">
                          <select required value={formData.teamSize} onChange={handleTeamSizeChange} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer pr-10">
                            <option value="Solo Project">1 Member</option>
                            <option value="2 Members">2 Members</option>
                            <option value="3 Members">3 Members</option>
                            <option value="4 Members">4 Members</option>
                            <option value="5+ Members">5+ Members</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">arrow_drop_down</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">Tech Stack Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag, idx) => (
                        <div key={idx} className="flex items-center bg-surface border border-outline-variant rounded-lg overflow-hidden focus-within:border-primary">
                          <input
                            type="text" required={idx === 0} value={tag} onChange={e => handleTagChange(idx, e.target.value)}
                            placeholder="Tag (e.g. React)"
                            className="bg-transparent px-3 py-1.5 text-sm outline-none text-on-surface w-24"
                          />
                          <button type="button" onClick={() => handleRemoveTag(idx)} className="p-1.5 text-on-surface-variant hover:text-error hover:bg-surface-variant transition-colors border-l border-outline-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={handleAddTag} className="px-3 py-1.5 rounded-lg border border-dashed border-outline-variant text-sm font-medium text-primary hover:bg-primary/10 transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">add</span> Add
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">Job Type / Category</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.roles.map((role, idx) => (
                        <div key={idx} className="flex items-center bg-surface border border-outline-variant rounded-lg overflow-hidden focus-within:border-primary">
                          <input
                            type="text" required={idx === 0} value={role} onChange={e => handleRoleChange(idx, e.target.value)}
                            placeholder="e.g. Web Development"
                            className="bg-transparent px-3 py-1.5 text-sm outline-none text-on-surface min-w-[150px]"
                          />
                          <button type="button" onClick={() => handleRemoveRole(idx)} className="p-1.5 text-on-surface-variant hover:text-error hover:bg-surface-variant transition-colors border-l border-outline-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={handleAddRole} className="px-3 py-1.5 rounded-lg border border-dashed border-outline-variant text-sm font-medium text-primary hover:bg-primary/10 transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">add</span> Add Job Type
                      </button>
                    </div>
                  </div>

                  {formData.teamSize !== 'Solo Project' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-on-surface-variant mb-2">Collaborators</label>
                      <div className="flex flex-col gap-2 mb-2">
                        {formData.collaborators.map((collab, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-surface border border-outline-variant rounded-lg overflow-hidden focus-within:border-primary p-1 max-w-lg">
                            <input
                              type="text" value={collab.name} onChange={e => handleCollaboratorChange(idx, 'name', e.target.value)}
                              placeholder="Name"
                              className="bg-transparent px-3 py-1.5 text-sm outline-none text-on-surface flex-1 min-w-[120px]"
                            />
                            <div className="w-px h-5 bg-outline-variant"></div>
                            <input
                              type="text" value={collab.role} onChange={e => handleCollaboratorChange(idx, 'role', e.target.value)}
                              placeholder="Role (e.g. Designer)"
                              className="bg-transparent px-3 py-1.5 text-sm outline-none text-on-surface flex-1 min-w-[120px]"
                            />
                            <button type="button" onClick={() => handleRemoveCollaborator(idx)} className="p-1.5 text-on-surface-variant hover:text-error hover:bg-surface-variant transition-colors rounded-md ml-1">
                              <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                          </div>
                        ))}
                        <div>
                          <button type="button" onClick={handleAddCollaborator} className="px-3 py-1.5 rounded-lg border border-dashed border-outline-variant text-sm font-medium text-primary hover:bg-primary/10 transition-colors flex items-center gap-1 inline-flex">
                            <span className="material-symbols-outlined text-[16px]">add</span> Add Collaborator
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </section>

                <hr className="border-outline-variant/30" />

                {/* SECTION: CONTENT */}
                <section>
                  <h3 className="text-sm font-bold tracking-wider text-primary uppercase mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">article</span> Project Details</h3>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Short Description (Card Summary)</label>
                    <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary min-h-[80px] transition-colors"></textarea>
                  </div>

                  <div data-color-mode="dark">
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Full Page Case Study (Markdown)</label>
                    <MDEditor
                      value={formData.content}
                      onChange={(val) => setFormData({ ...formData, content: val || '' })}
                      height={400}
                      className="w-full !bg-surface-container !border-outline-variant"
                    />
                  </div>
                </section>

                <hr className="border-outline-variant/30" />

                {/* SECTION: MEDIA */}
                <section>
                  <h3 className="text-sm font-bold tracking-wider text-primary uppercase mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">photo_library</span> Media & Gallery</h3>

                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors relative ${dragActive ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50 hover:bg-surface-container-high'}`}
                    onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                  >
                    <input type="file" multiple accept="image/*" onChange={handleFileInput} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Click to upload images" />
                    <span className="material-symbols-outlined text-4xl text-primary mb-2 opacity-80">cloud_upload</span>
                    <p className="text-on-surface font-medium text-lg mb-1">Click or Drag & Drop images here</p>
                    <p className="text-on-surface-variant text-sm">Upload multiple images. You can drag to re-order them below.</p>
                  </div>

                  {mediaItems.length > 0 && (
                    <div className="mt-6">
                      <p className="text-xs font-medium text-on-surface-variant mb-2 uppercase tracking-wide">Image Order (Drag to re-order. 1st is thumbnail)</p>
                      <div className="flex flex-wrap gap-4 p-4 bg-surface-container rounded-xl border border-outline-variant/30">
                        {mediaItems.map((item, idx) => (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleSortDragStart(e, idx)}
                            onDragOver={(e) => handleSortDragOver(e, idx)}
                            className={`relative w-28 h-28 rounded-lg overflow-hidden border-2 cursor-grab active:cursor-grabbing shadow-sm transition-transform ${idx === 0 ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/50'} hover:scale-105`}
                          >
                            <img src={item.type === 'file' ? item.preview : item.url} alt="Gallery" className="w-full h-full object-cover pointer-events-none" />
                            {idx === 0 && <div className="absolute bottom-0 inset-x-0 bg-primary/90 text-on-primary text-[10px] font-bold text-center py-0.5">THUMBNAIL</div>}
                            <button type="button" onClick={() => removeMedia(item.id)} className="absolute top-1 right-1 bg-background/80 hover:bg-error hover:text-on-error text-error p-1 rounded-full backdrop-blur-sm transition-colors shadow-sm z-10">
                              <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </form>
            </div>
            <div className="p-6 border-t border-outline-variant/20 bg-surface-container flex justify-end gap-3 shrink-0 rounded-b-2xl">
              <button onClick={handleCloseModal} type="button" className="px-6 py-2.5 rounded-lg font-medium text-on-surface-variant hover:bg-surface-variant transition-colors bg-surface-container shadow-sm border border-outline-variant/50">Cancel</button>
              <button form="proj-form" type="submit" disabled={isSubmitting} className="bg-primary text-on-primary px-8 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2">
                {isSubmitting ? 'Saving...' : 'Save Project'}
                {isSubmitting && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
      {itemToDelete && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-md rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-on-surface mb-2">Archive Project?</h3>
              <p className="text-on-surface-variant mb-6">
                This item will be moved to the archive for 30 days before being permanently deleted. You can restore it at any time from the Archived tab.
              </p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setItemToDelete(null)} className="px-4 py-2 rounded-lg font-medium text-on-surface-variant hover:bg-surface-variant transition-colors">
                  Cancel
                </button>
                <button onClick={executeDelete} className="px-4 py-2 bg-error text-on-error rounded-lg font-medium hover:bg-error/90 transition-colors">
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

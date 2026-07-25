'use client';

import { useState, useEffect, useRef } from 'react';
import { updateProfile, addSocialLink, deleteSocialLink, updateSocialLink, uploadResumeFiles } from '../actions';
import { useToast } from '../../../contexts/ToastContext';
import * as Icons from 'lucide-react';

export default function ProfileClient({ initialData }: { initialData: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    roles: initialData.roles ? initialData.roles.join(', ') : '',
    summary: initialData.summary || '',
    email: initialData.email || '',
    contactTitle: initialData.contactTitle || '',
    contactSubtitle: initialData.contactSubtitle || '',
    footerText: initialData.footerText || '',
    logoText: initialData.logoText || '',
    resumeUrl: initialData.resumeUrl || '',
    seoTitle: initialData.seoTitle || '',
    seoDescription: initialData.seoDescription || '',
    seoKeywords: initialData.seoKeywords || '',
  });

  const { showToast } = useToast();

  const [socialForm, setSocialForm] = useState({ platform: '', handle: '', url: '', icon: 'Github' });
  const [isAddingSocial, setIsAddingSocial] = useState(false);
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [isIconDropdownOpen, setIsIconDropdownOpen] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const dropdownScrollRef = useRef<HTMLDivElement>(null);
  const socials = initialData.socials || [];

  // Handle Windows scroll bug in fixed/absolute overlays
  useEffect(() => {
    if (!isIconDropdownOpen || !dropdownScrollRef.current) return;
    const el = dropdownScrollRef.current;
    
    const handleWheel = (e: WheelEvent) => {
      el.scrollTop += e.deltaY;
      e.preventDefault();
      e.stopPropagation();
    };
    
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [isIconDropdownOpen]);


  const iconOptions = [
    { value: 'Github', label: 'GitHub' },
    { value: 'Linkedin', label: 'LinkedIn' },
    { value: 'Twitter', label: 'Twitter / X' },
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Youtube', label: 'YouTube' },
    { value: 'Twitch', label: 'Twitch' },
    { value: 'Dribbble', label: 'Dribbble' },
    { value: 'Figma', label: 'Figma' },
    { value: 'Codepen', label: 'CodePen' },
    { value: 'Mail', label: 'Email' },
    { value: 'Globe', label: 'Website (Globe)' },
    { value: 'Link', label: 'Generic Link' },
    { value: 'Phone', label: 'Phone' },
    { value: 'MessageCircle', label: 'WhatsApp' },
    { value: 'MessageSquare', label: 'Messenger' },
    { value: 'MessageSquareText', label: 'Discord / Chat' },
  ];

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const dataToSave = {
        ...formData,
        roles: formData.roles.split(',').map((r: string) => r.trim()).filter((r: string) => r),
      };
      await updateProfile(dataToSave);
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast('Error updating profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingSocial(true);
    try {
      if (editingSocialId) {
        await updateSocialLink(editingSocialId, socialForm);
        showToast('Social link updated successfully!', 'success');
      } else {
        await addSocialLink(socialForm);
        showToast('Social link added successfully!', 'success');
      }
      setSocialForm({ platform: '', handle: '', url: '', icon: 'Github' });
      setEditingSocialId(null);
    } catch (error) {
      showToast('Error saving social link', 'error');
    } finally {
      setIsAddingSocial(false);
    }
  };

  const handleEditSocial = (social: any) => {
    const mappedIcon = social.icon === 'github' ? 'Github' : social.icon === 'linkedin' ? 'Linkedin' : social.icon === 'mail' ? 'Mail' : social.icon;
    setSocialForm({
      platform: social.platform,
      handle: social.handle,
      url: social.url,
      icon: mappedIcon || 'Link'
    });
    setEditingSocialId(social.id);
  };
  
  const handleCancelEditSocial = () => {
    setSocialForm({ platform: '', handle: '', url: '', icon: 'Github' });
    setEditingSocialId(null);
  };

  const handleDeleteSocial = async (id: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      try {
        await deleteSocialLink(id);
        showToast('Social link deleted successfully!', 'success');
      } catch (error) {
        showToast('Error deleting social link', 'error');
      }
    }
  };

  const handleResumeUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await uploadResumeFiles(formData);
      showToast('Resume files uploaded successfully!', 'success');
    } catch (error) {
      showToast('Error uploading resume', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* PROFILE SETTINGS FORM */}
      <div className="bg-surface border border-outline-variant/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6 text-on-surface">General Identity</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Logo Text</label>
              <input type="text" value={formData.logoText} onChange={e => setFormData({...formData, logoText: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Roles (comma separated)</label>
            <input type="text" value={formData.roles} onChange={e => setFormData({...formData, roles: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
          </div>

          <div className="hidden">
            <label className="block text-sm font-medium mb-1">Resume File / URL Path</label>
            <input type="text" value={formData.resumeUrl} onChange={e => setFormData({...formData, resumeUrl: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Professional Summary</label>
            <textarea value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} rows={4} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
          </div>

          <hr className="border-outline-variant/20 my-6" />
          <h2 className="text-xl font-bold mb-4 text-on-surface">Footer & Contact Details</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Contact Title (Hero Text)</label>
            <input type="text" value={formData.contactTitle} onChange={e => setFormData({...formData, contactTitle: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact Subtitle</label>
            <textarea value={formData.contactSubtitle} onChange={e => setFormData({...formData, contactSubtitle: e.target.value})} rows={2} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Footer Copyright Text</label>
            <input type="text" value={formData.footerText} onChange={e => setFormData({...formData, footerText: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
          </div>

          <hr className="border-outline-variant/20 my-6" />
          <h2 className="text-xl font-bold mb-4 text-on-surface">SEO Management</h2>

          <div>
            <label className="block text-sm font-medium mb-1">SEO Title (Overrides default)</label>
            <input type="text" value={formData.seoTitle} onChange={e => setFormData({...formData, seoTitle: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">SEO Description</label>
            <textarea value={formData.seoDescription} onChange={e => setFormData({...formData, seoDescription: e.target.value})} rows={2} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">SEO Keywords (Comma separated)</label>
            <input type="text" value={formData.seoKeywords} onChange={e => setFormData({...formData, seoKeywords: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" />
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={isSaving} className="bg-primary text-on-primary px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
              {isSaving ? 'Saving...' : 'Save All Settings'}
            </button>
          </div>
        </form>
      </div>

      {/* RESUME UPLOAD FORM */}
      <div className="bg-surface border border-outline-variant/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6 text-on-surface">Resume Upload</h2>
        <form onSubmit={handleResumeUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Resume PDF File</label>
              <input type="file" name="resumePdf" accept=".pdf" required className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-primary/90" />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" disabled={isUploading} className="bg-primary text-on-primary px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </button>
          </div>
        </form>
      </div>

      {/* SOCIAL LINKS FORM */}
      <div className="bg-surface border border-outline-variant/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6 text-on-surface">Social Links</h2>
        
        <div className="space-y-4 mb-8">
          {socials.map((social: any) => {
            const mappedIcon = social.icon === 'github' ? 'Github' : social.icon === 'linkedin' ? 'Linkedin' : social.icon === 'mail' ? 'Mail' : social.icon;
            const Icon = (Icons as any)[mappedIcon] || Icons.Link;
            return (
              <div key={social.id} className="flex justify-between items-center bg-surface-container-low p-4 rounded-lg border border-outline-variant/10">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-surface-container-high rounded-md text-primary"><Icon size={20} /></div>
                  <div>
                    <h3 className="font-bold text-on-surface">{social.platform}</h3>
                    <p className="text-sm text-on-surface-variant">{social.handle} &bull; <a href={social.url} target="_blank" className="text-primary hover:underline" rel="noreferrer">Link</a></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEditSocial(social)} className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors">
                    <Icons.Edit2 size={20} />
                  </button>
                  <button onClick={() => handleDeleteSocial(social.id)} className="text-error hover:bg-error/10 p-2 rounded-lg transition-colors">
                    <Icons.Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
          {socials.length === 0 && <p className="text-on-surface-variant text-sm text-center py-4">No social links added yet.</p>}
        </div>

        <form onSubmit={handleSaveSocial} className="space-y-4 border-t border-outline-variant/20 pt-6">
          <h3 className="font-bold text-on-surface">{editingSocialId ? 'Edit Social Link' : 'Add New Social Link'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Platform Name</label>
              <input type="text" placeholder="e.g. GitHub" value={socialForm.platform} onChange={e => setSocialForm({...socialForm, platform: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Handle</label>
              <input type="text" placeholder="e.g. @MichaelJohnDE" value={socialForm.handle} onChange={e => setSocialForm({...socialForm, handle: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Target URL</label>
              <input type="url" placeholder="https://..." value={socialForm.url} onChange={e => setSocialForm({...socialForm, url: e.target.value})} className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface" required />
            </div>
            <div className="relative" ref={dropdownContainerRef}>
              <label className="block text-sm font-medium mb-1">Icon</label>
              <button 
                type="button" 
                onClick={() => setIsIconDropdownOpen(!isIconDropdownOpen)}
                className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg p-2 text-on-surface flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {(() => {
                    const SelectedIcon = (Icons as any)[socialForm.icon] || Icons.Link;
                    return <SelectedIcon size={18} />;
                  })()}
                  <span>{iconOptions.find(o => o.value === socialForm.icon)?.label || socialForm.icon}</span>
                </div>
                <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
              
              {isIconDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsIconDropdownOpen(false)}></div>
                  <div ref={dropdownScrollRef} className="icon-dropdown-scroll absolute z-20 w-full bottom-full mb-1 bg-surface-container border border-outline-variant rounded-lg shadow-lg max-h-60 overflow-auto py-1">
                    {iconOptions.map(opt => {
                      const IconComp = (Icons as any)[opt.value] || Icons.Link;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => { setSocialForm({...socialForm, icon: opt.value}); setIsIconDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 hover:bg-surface-variant flex items-center gap-3 text-on-surface transition-colors"
                        >
                          <IconComp size={18} className="text-primary" />
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            {editingSocialId && (
              <button type="button" onClick={handleCancelEditSocial} className="bg-surface-variant text-on-surface px-6 py-2 rounded-lg hover:bg-outline-variant/20 transition-colors">
                Cancel
              </button>
            )}
            <button type="submit" disabled={isAddingSocial} className="bg-primary text-on-primary px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
              {isAddingSocial ? 'Saving...' : (editingSocialId ? 'Update Link' : 'Add Link')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

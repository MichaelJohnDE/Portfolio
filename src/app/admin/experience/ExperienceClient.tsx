'use client';

import { useState } from 'react';
import { addExperience, deleteExperience, updateExperience, restoreExperience, hardDeleteExperience } from '../actions';
import { useToast } from '../../../contexts/ToastContext';
import dynamic from 'next/dynamic';
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function ExperienceClient({ initialData }) {
  const [experiences, setExperiences] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const { showToast } = useToast();

  const activeExperiences = experiences.filter(exp => !exp.archivedAt);
  const archivedExperiences = experiences.filter(exp => exp.archivedAt);
  const displayedExperiences = activeTab === 'active' ? activeExperiences : archivedExperiences;
  
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    date: '',
    connector: 'at',
    description: ''
  });

  const handleOpenModal = (exp = null) => {
    if (exp) {
      setEditingId(exp.id);
      setFormData({
        role: exp.role,
        company: exp.company,
        date: exp.date,
        connector: exp.connector,
        description: exp.description || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        role: '',
        company: '',
        date: '',
        connector: 'at',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const cleanedData = {
        ...formData
      };

      if (editingId) {
        await updateExperience(editingId, cleanedData);
        setExperiences(experiences.map(exp => exp.id === editingId ? { ...exp, ...cleanedData } : exp));
        showToast('Experience updated successfully!', 'success');
      } else {
        await addExperience(cleanedData);
        showToast('Experience added successfully!', 'success');
        // Refresh page to get new ID or just do a quick window reload for now
        window.location.reload();
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
      showToast('Error saving experience', 'error');
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
      await deleteExperience(itemToDelete);
      setExperiences(experiences.map(exp => exp.id === itemToDelete ? { ...exp, archivedAt: new Date().toISOString() } : exp));
      setItemToDelete(null);
      showToast('Experience archived successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Error archiving experience', 'error');
    }
  };

  const executeRestore = async (id: string) => {
    try {
      await restoreExperience(id);
      setExperiences(experiences.map(exp => exp.id === id ? { ...exp, archivedAt: null } : exp));
      showToast('Experience restored successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Error restoring experience', 'error');
    }
  };

  const executeHardDelete = async (id: string) => {
    if (confirm('Are you absolutely sure you want to permanently delete this? This cannot be undone.')) {
      try {
        await hardDeleteExperience(id);
        setExperiences(experiences.filter(exp => exp.id !== id));
        showToast('Experience deleted permanently', 'success');
      } catch (error) {
        console.error(error);
        showToast('Error permanently deleting experience', 'error');
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
            Archived ({archivedExperiences.length})
          </button>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Experience
        </button>
      </div>

      <div className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-variant text-on-surface-variant border-b border-outline-variant/30">
                <th className="p-4 font-medium text-sm">Role</th>
                <th className="p-4 font-medium text-sm">Company</th>
                <th className="p-4 font-medium text-sm">Date</th>
                <th className="p-4 font-medium text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {displayedExperiences.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-on-surface-variant">No experiences found in this view.</td>
                </tr>
              ) : displayedExperiences.map((exp) => (
                <tr key={exp.id} className="hover:bg-surface-variant/30 transition-colors">
                  <td className="p-4 text-on-surface font-medium">{exp.role}</td>
                  <td className="p-4 text-on-surface-variant">{exp.company}</td>
                  <td className="p-4 text-on-surface-variant text-sm">{exp.date}</td>
                  <td className="p-4 text-right whitespace-nowrap">
                    {activeTab === 'active' ? (
                      <>
                        <button onClick={() => handleOpenModal(exp)} className="text-primary hover:text-primary/80 mr-3">Edit</button>
                        <button onClick={() => confirmDelete(exp.id)} className="text-error hover:text-error/80">Delete</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => executeRestore(exp.id)} className="text-primary hover:text-primary/80 mr-3">Restore</button>
                        <button onClick={() => executeHardDelete(exp.id)} className="text-error hover:text-error/80">Delete Permanently</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-2xl rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
              <h2 className="text-xl font-bold text-on-surface">{editingId ? 'Edit' : 'Add'} Experience</h2>
              <button onClick={handleCloseModal} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="exp-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Role</label>
                    <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Company</label>
                    <input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Date</label>
                    <input type="text" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="e.g. 2021 - Present" className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Connector (at / |)</label>
                    <select value={formData.connector} onChange={e => setFormData({...formData, connector: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary">
                      <option value="at">at</option>
                      <option value="|">|</option>
                    </select>
                  </div>
                </div>

                <div data-color-mode="dark">
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Description (Markdown)</label>
                  <MDEditor 
                    value={formData.description} 
                    onChange={(val) => setFormData({...formData, description: val || ''})} 
                    className="w-full !bg-surface-container !border-outline-variant"
                    height={300}
                  />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-outline-variant/20 bg-surface-variant/30 flex justify-end gap-3">
              <button onClick={handleCloseModal} className="px-4 py-2 rounded-lg font-medium text-on-surface-variant hover:bg-surface-variant transition-colors">Cancel</button>
              <button form="exp-form" type="submit" disabled={isSubmitting} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
      {itemToDelete && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-md rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-on-surface mb-2">Archive Experience?</h3>
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

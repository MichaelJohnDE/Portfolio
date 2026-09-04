'use client';

import { useState, useEffect } from 'react';
import { addCertification, deleteCertification, updateCertification, uploadCertificationImage, restoreCertification, hardDeleteCertification } from '../actions';
import * as Icons from 'lucide-react';
import { useToast } from '../../../contexts/ToastContext';

export default function CertificationClient({ initialData }) {
  const [certifications, setCertifications] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isIconDropdownOpen, setIsIconDropdownOpen] = useState(false);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const { showToast } = useToast();

  const activeCertifications = certifications.filter(c => !c.archivedAt);
  const archivedCertifications = certifications.filter(c => c.archivedAt);
  const displayedCertifications = activeTab === 'active' ? activeCertifications : archivedCertifications;

  const iconOptions = [
    { value: '', label: 'None' },
    // Awards & Badges
    { value: 'ShieldCheck', label: 'Shield Check' },
    { value: 'Award', label: 'Award' },
    { value: 'Medal', label: 'Medal' },
    { value: 'BadgeCheck', label: 'Badge Check' },
    { value: 'Star', label: 'Star' },
    { value: 'CheckCircle', label: 'Check Circle' },
    { value: 'Trophy', label: 'Trophy' },
    // Documents
    { value: 'FileText', label: 'Document' },
    { value: 'FileSpreadsheet', label: 'Spreadsheet' },
    { value: 'FileCode', label: 'Code File' },
    { value: 'FileBadge', label: 'Certified Document' },
    { value: 'BookOpen', label: 'Book Open' },
    { value: 'GraduationCap', label: 'Graduation Cap' },
    // Tech & Dev
    { value: 'Code', label: 'Code' },
    { value: 'Monitor', label: 'Monitor / Web' },
    { value: 'Smartphone', label: 'Mobile App' },
    { value: 'Cpu', label: 'Hardware / CPU' },
    { value: 'Database', label: 'Database' },
    { value: 'Server', label: 'Server / Backend' },
    { value: 'Cloud', label: 'Cloud' },
    { value: 'Globe', label: 'Globe / Network' },
    // Business & Analytics
    { value: 'Briefcase', label: 'Business / Briefcase' },
    { value: 'PieChart', label: 'Analytics / Pie Chart' },
    { value: 'BarChart', label: 'Analytics / Bar Chart' },
    { value: 'LineChart', label: 'Analytics / Line Chart' },
    { value: 'Target', label: 'Target / SEO' },
    { value: 'Search', label: 'Search' },
    // Design & Tools
    { value: 'Layout', label: 'UI / Layout' },
    { value: 'PenTool', label: 'Design / Pen' },
    { value: 'Wrench', label: 'Engineering / Tool' },
    { value: 'Lightbulb', label: 'Innovation / Idea' },
    { value: 'Rocket', label: 'Launch / Rocket' }
  ];
  
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    image: '',
    icon: ''
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    if (file.type === 'application/pdf') {
      setIsProcessingPdf(true);
      try {
        const pdfjsLib = await import('pdfjs-dist');
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) throw new Error("Canvas not supported");
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({ canvasContext: context, canvas, viewport }).promise;
        
        canvas.toBlob((blob) => {
          if (blob) {
            const newFile = new File([blob], file.name.replace('.pdf', '.png'), { type: 'image/png' });
            setImageFile(newFile);
          }
          setIsProcessingPdf(false);
        }, 'image/png');
      } catch (err) {
        console.error("Failed to process PDF:", err);
        showToast("Failed to generate thumbnail from PDF.", "error");
        setIsProcessingPdf(false);
      }
    } else {
      setImageFile(file);
    }
  };

  // Attach a native wheel listener to bypass Windows/Chrome scroll hijacking bugs when hovering over fixed overlays.
  useEffect(() => {
    if (!isModalOpen) return;
    const timer = setTimeout(() => {
      const el = document.getElementById('cert-modal-scroll');
      if (!el) return;
      const handleWheel = (e: WheelEvent) => {
        // If we are scrolling inside the dropdown, let the dropdown handle it
        const target = e.target as HTMLElement;
        if (target.closest('.icon-dropdown-scroll')) {
          const dropdown = target.closest('.icon-dropdown-scroll') as HTMLElement;
          dropdown.scrollTop += e.deltaY;
          e.preventDefault();
          return;
        }
        
        el.scrollTop += e.deltaY;
        e.preventDefault();
      };
      el.addEventListener('wheel', handleWheel, { passive: false });
      return () => el.removeEventListener('wheel', handleWheel);
    }, 100);
    return () => clearTimeout(timer);
  }, [isModalOpen]);

  const handleOpenModal = (cert = null) => {
    if (cert) {
      setEditingId(cert.id);
      setFormData({
        title: cert.title,
        issuer: cert.issuer,
        date: cert.date,
        image: cert.image || '',
        icon: cert.icon || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        issuer: '',
        date: '',
        image: '',
        icon: ''
      });
    }
    setImageFile(null);
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
      let finalImageUrl = formData.image;

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        const uploadedUrl = await uploadCertificationImage(uploadData);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        }
      }

      const cleanedData = {
        title: formData.title,
        issuer: formData.issuer,
        date: formData.date,
        image: finalImageUrl.trim() || undefined,
        icon: formData.icon.trim() || undefined
      };

      if (editingId) {
        await updateCertification(editingId, cleanedData);
        setCertifications(certifications.map(c => c.id === editingId ? { ...c, ...cleanedData } : c));
        showToast('Certification updated successfully!', 'success');
      } else {
        await addCertification(cleanedData);
        showToast('Certification added successfully!', 'success');
        window.location.reload();
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
      showToast('Error saving certification', 'error');
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
      await deleteCertification(itemToDelete);
      setCertifications(certifications.map(c => c.id === itemToDelete ? { ...c, archivedAt: new Date().toISOString() } : c));
      setItemToDelete(null);
      showToast('Certification archived successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Error archiving certification', 'error');
    }
  };

  const executeRestore = async (id: string) => {
    try {
      await restoreCertification(id);
      setCertifications(certifications.map(c => c.id === id ? { ...c, archivedAt: null } : c));
      showToast('Certification restored successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Error restoring certification', 'error');
    }
  };

  const executeHardDelete = async (id: string) => {
    if (confirm('Are you absolutely sure you want to permanently delete this? This cannot be undone.')) {
      try {
        await hardDeleteCertification(id);
        setCertifications(certifications.filter(c => c.id !== id));
        showToast('Certification permanently deleted', 'success');
      } catch (error) {
        console.error(error);
        showToast('Error permanently deleting certification', 'error');
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
            Archived ({archivedCertifications.length})
          </button>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Certification
        </button>
      </div>

      <div className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-variant text-on-surface-variant border-b border-outline-variant/30">
                <th className="p-4 font-medium text-sm">Icon</th>
                <th className="p-4 font-medium text-sm">Title</th>
                <th className="p-4 font-medium text-sm">Issuer</th>
                <th className="p-4 font-medium text-sm">Date</th>
                <th className="p-4 font-medium text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {displayedCertifications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">No certifications found in this view.</td>
                </tr>
              ) : displayedCertifications.map((cert) => {
                const IconComp = cert.icon ? (Icons[cert.icon as keyof typeof Icons] as any) : null;
                return (
                  <tr key={cert.id} className="hover:bg-surface-variant/30 transition-colors">
                    <td className="p-4 text-primary">
                      {IconComp ? <IconComp size={24} /> : (
                        <span className="material-symbols-outlined">workspace_premium</span>
                      )}
                    </td>
                    <td className="p-4 text-on-surface font-medium">{cert.title}</td>
                    <td className="p-4 text-on-surface-variant">{cert.issuer}</td>
                    <td className="p-4 text-on-surface-variant text-sm">{cert.date}</td>
                    <td className="p-4 text-right whitespace-nowrap">
                      {activeTab === 'active' ? (
                        <>
                          <button onClick={() => handleOpenModal(cert)} className="text-primary hover:text-primary/80 mr-3">Edit</button>
                          <button onClick={() => confirmDelete(cert.id)} className="text-error hover:text-error/80">Delete</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => executeRestore(cert.id)} className="text-primary hover:text-primary/80 mr-3">Restore</button>
                          <button onClick={() => executeHardDelete(cert.id)} className="text-error hover:text-error/80">Delete Permanently</button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-xl rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
              <h2 className="text-xl font-bold text-on-surface">{editingId ? 'Edit' : 'Add'} Certification</h2>
              <button onClick={handleCloseModal} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div id="cert-modal-scroll" className="p-6 overflow-y-auto flex-1">
              <form id="cert-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Title</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Issuer</label>
                    <input type="text" required value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Date</label>
                    <input type="text" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="e.g. October 2023" className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Certification Icon</label>
                    <div className="relative">
                      <button 
                        type="button" 
                        onClick={() => setIsIconDropdownOpen(!isIconDropdownOpen)}
                        className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-3">
                          {formData.icon ? (() => {
                            const IconComp = Icons[formData.icon as keyof typeof Icons] as any;
                            return IconComp ? <IconComp size={18} className="text-primary" /> : null;
                          })() : null}
                          <span>{iconOptions.find(o => o.value === formData.icon)?.label || (formData.icon ? formData.icon : 'None')}</span>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant pointer-events-none">arrow_drop_down</span>
                      </button>

                      {isIconDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setIsIconDropdownOpen(false)}></div>
                          <div className="icon-dropdown-scroll absolute z-20 w-full mt-1 bg-surface-container border border-outline-variant rounded-lg shadow-lg max-h-60 overflow-auto py-1">
                            {iconOptions.map(opt => {
                              const IconComp = opt.value ? (Icons[opt.value as keyof typeof Icons] as any) : null;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => { setFormData({...formData, icon: opt.value}); setIsIconDropdownOpen(false); }}
                                  className="w-full text-left px-4 py-2 hover:bg-surface-variant flex items-center gap-3 text-on-surface transition-colors"
                                >
                                  {IconComp ? <IconComp size={18} className="text-primary" /> : <div className="w-[18px]"></div>}
                                  <span>{opt.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Certification Image / PDF</label>
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                      onChange={handleFileChange} 
                      className="w-full bg-surface-container border border-outline-variant rounded-lg p-1.5 text-on-surface file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-on-primary hover:file:bg-primary/90 text-sm" 
                    />
                    {/* Preview */}
                    <div className="mt-2 flex items-center gap-2">
                      {isProcessingPdf ? (
                        <div className="text-sm text-primary flex items-center gap-2">
                          <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> 
                          Processing PDF...
                        </div>
                      ) : imageFile ? (
                        <div className="relative w-16 h-16 rounded-md overflow-hidden border border-outline-variant/30">
                          <img src={URL.createObjectURL(imageFile)} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      ) : formData.image ? (
                        <div className="relative w-16 h-16 rounded-md overflow-hidden border border-outline-variant/30">
                          <img src={formData.image} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Spacer to allow scrolling when dropdown is open */}
                <div className={`transition-all duration-200 ${isIconDropdownOpen ? 'h-48' : 'h-0'}`}></div>
              </form>
            </div>

            <div className="p-6 border-t border-outline-variant/20 bg-surface-variant/30 flex justify-end gap-3">
              <button onClick={handleCloseModal} className="px-4 py-2 rounded-lg font-medium text-on-surface-variant hover:bg-surface-variant transition-colors">Cancel</button>
              <button form="cert-form" type="submit" disabled={isSubmitting} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
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
              <h3 className="text-xl font-bold text-on-surface mb-2">Archive Certification?</h3>
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

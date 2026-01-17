import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { landlordApi } from '../../api/endpoints/landlord';
import { Property } from '../../types';
import { LandlordLayout } from './LandlordLayout';

export const LandlordEditProperty: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Partial<Property> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const data = await landlordApi.getPropertyById(id);
        setProperty(data || null);
      } catch (err) {
        console.error("Failed to fetch property", err);
        setError("Failed to load property.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProperty(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleSave = async () => {
    if (!id || !property) return;
    setIsSaving(true);
    try {
      await landlordApi.updateProperty(id, property);
      // Show success toast
      alert('Property updated successfully!');
    } catch (err) {
      console.error("Failed to save property", err);
      alert('Failed to save property. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <LandlordLayout>
        <div className="p-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-muted font-semibold">Loading sanctuary details...</p>
          </div>
        </div>
      </LandlordLayout>
    );
  }

  if (error || !property) {
    return (
      <LandlordLayout>
        <div className="p-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-red-200">
            <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
            <p className="text-red-500 font-semibold mb-4">{error || "Could not load property."}</p>
            <button 
              onClick={() => navigate('/landlord/properties')} 
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Back to Properties
            </button>
          </div>
        </div>
      </LandlordLayout>
    );
  }

  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-primary/5 pb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter">Edit Sanctuary</h1>
            <p className="text-text-muted font-medium uppercase text-[10px] tracking-[0.3em]">{property.title} • {property.location}</p>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-3 border-2 border-primary/10 rounded-xl text-xs font-black uppercase tracking-widest text-primary hover:bg-sand-light transition-all">Preview Listing</button>
             <button onClick={handleSave} disabled={isSaving} className="px-8 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center gap-2">
              {isSaving && <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-surface-dark p-6 rounded-[2rem] border border-primary/5 shadow-xl">
              <div className="aspect-[4/3] bg-cover bg-center rounded-2xl mb-8 shadow-md" style={{backgroundImage: `url('${property.image}')`}}></div>
              <nav className="flex flex-col gap-2">
                <button className="w-full text-left px-5 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-all">Basic Details</button>
                <Link to={`/landlord/media/${id}`} className="block w-full text-left px-5 py-4 hover:bg-sand-light/30 text-primary/60 rounded-2xl font-bold text-xs uppercase tracking-widest">Media Manager</Link>
                <Link to={`/landlord/pricing/${id}`} className="block w-full text-left px-5 py-4 hover:bg-sand-light/30 text-primary/60 rounded-2xl font-bold text-xs uppercase tracking-widest">Pricing & Fees</Link>
                <Link to={`/landlord/calendar/${id}`} className="block w-full text-left px-5 py-4 hover:bg-sand-light/30 text-primary/60 rounded-2xl font-bold text-xs uppercase tracking-widest">Availability</Link>
              </nav>
            </div>
            <div className="p-6 bg-red-50 rounded-3xl border border-red-100 space-y-4">
               <h4 className="font-black text-red-700 uppercase text-[10px] tracking-widest">Danger Zone</h4>
               <button className="w-full py-3 rounded-xl border border-red-200 text-xs font-bold text-red-600 hover:bg-red-100">Unlist Sanctuary</button>
            </div>
          </div>

          <div className="lg:col-span-9 space-y-10">
            <div className="bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3rem] border border-primary/5 shadow-xl space-y-12">
               <div className="space-y-10">
                 <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-widest">General Information</h3>
                 <div className="grid grid-cols-1 gap-10">
                   <div className="space-y-3">
                     <label className="block text-[10px] font-black text-primary/40 uppercase tracking-widest">Display Title</label>
                     <input name="title" value={property.title} onChange={handleInputChange} type="text" className="w-full px-6 py-5 rounded-2xl border-primary/10 bg-sand-light/10 text-lg font-bold text-primary focus:ring-accent" />
                   </div>
                   <div className="space-y-3">
                     <label className="block text-[10px] font-black text-primary/40 uppercase tracking-widest">Narrative Description</label>
                     <textarea name="description" value={property.description} onChange={handleInputChange} className="w-full px-6 py-5 rounded-2xl border-primary/10 bg-sand-light/10 text-base font-medium text-primary leading-relaxed focus:ring-accent h-48"></textarea>
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black text-primary/40 uppercase tracking-widest">Category</label>
                        <select name="type" value={property.type} onChange={handleInputChange} className="w-full px-6 py-5 rounded-2xl border-primary/10 bg-sand-light/10 font-bold text-primary focus:ring-accent">
                          <option>Modern</option><option>Villa</option><option>Cabin</option><option>Lodge</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black text-primary/40 uppercase tracking-widest">Max Guests</label>
                        <input type="number" className="w-full px-6 py-5 rounded-2xl border-primary/10 bg-sand-light/10 font-bold text-primary focus:ring-accent" defaultValue="4" />
                      </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};
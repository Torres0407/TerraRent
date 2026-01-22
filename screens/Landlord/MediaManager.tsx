import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { landlordApi } from '../../api/endpoints/landlord';
import { Property } from '../../types';
import { LandlordLayout } from './LandlordLayout';

export const LandlordMedia: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [media, setMedia] = useState<Property['media']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      if (id) {
        // Load media for specific property
        try {
          const prop = await landlordApi.getPropertyById(id);
          setMedia(prop?.media || []);
        } catch (error) {
          console.error("Failed to fetch media", error);
        }
      } else {
        // Load properties list for selection
        setIsLoadingProperties(true);
        try {
          const props = await landlordApi.getProperties();
          setProperties(props || []);
        } catch (error) {
          console.error("Failed to fetch properties", error);
        } finally {
          setIsLoadingProperties(false);
        }
      }
      
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && id) {
      setIsUploading(true);
      const newMediaItem = { 
        id: `temp-${Date.now()}`, 
        url: URL.createObjectURL(file), 
        caption: '', 
        isCover: false 
      };
      setMedia(prev => [...(prev || []), newMediaItem]);
      
      try {
        await landlordApi.uploadMedia(id, file);
        const prop = await landlordApi.getPropertyById(id);
        setMedia(prop?.media || []);
      } catch (error) {
        console.error("Upload failed", error);
        setMedia(prev => prev?.filter(m => m.id !== newMediaItem.id));
        alert('Failed to upload media. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Show property selection when no id is provided
  if (!id) {
    return (
      <LandlordLayout>
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-primary dark:text-white tracking-tighter">Media Manager</h1>
            <p className="text-xl text-text-muted font-medium">Select a property to manage its media gallery.</p>
          </div>

          {isLoadingProperties ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-text-muted font-semibold">Loading your properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-primary/5 shadow-xl">
              <span className="material-symbols-outlined text-6xl text-primary/20 mb-4">real_estate_agent</span>
              <h3 className="text-2xl font-black text-primary mb-2">No Properties Found</h3>
              <p className="text-text-muted mb-6">You need to add properties before managing media.</p>
              <Link to="/landlord/add-property" className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all">
                <span className="material-symbols-outlined">add</span> Add Your First Property
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((prop) => (
                <Link
                  key={prop.id}
                  to={`/landlord/media/${prop.id}`}
                  className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-primary/5 overflow-hidden shadow-xl shadow-black/[0.02] hover:shadow-2xl transition-all group flex flex-col"
                >
                  <div className="relative h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: `url('${prop.image}')`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white rounded-full text-[9px] font-black text-primary uppercase tracking-widest shadow-lg">
                      {prop.isSuperhost ? 'Premier Stay' : 'Verified'}
                    </div>
                    <div className="absolute bottom-4 right-4 text-white font-black text-lg">
                      ${prop.price}<span className="text-xs uppercase opacity-70 ml-1">/ night</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <h3 className="text-xl font-black text-primary dark:text-white tracking-tighter group-hover:text-accent transition-colors">{prop.title}</h3>
                      <p className="text-text-muted text-sm font-medium mt-1">{prop.location}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-primary/5">
                      <div className="flex items-center gap-1.5 text-accent">
                        <span className="material-symbols-outlined text-base">star</span>
                        <span className="text-sm font-black">{prop.rating}</span>
                      </div>
                      <span className="text-xs font-black text-primary uppercase tracking-widest">Manage Media →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </LandlordLayout>
    );
  }

  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-12">
        <div className="space-y-3">
          <h1 className="text-5xl font-black text-primary dark:text-white tracking-tighter">Showcase your sanctuary</h1>
          <p className="text-xl text-text-muted font-medium">Exceptional photography is the #1 driver for architectural stays.</p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          className="hidden" 
          accept="image/*"
          disabled={isUploading}
        />
        <div 
          onClick={() => !isUploading && fileInputRef.current?.click()} 
          className={`border-[3px] border-dashed border-primary/10 rounded-[3rem] p-16 flex flex-col items-center justify-center bg-white dark:bg-surface-dark group cursor-pointer hover:border-accent hover:bg-sand-light/5 transition-all duration-500 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="size-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform shadow-lg">
            <span className="material-symbols-outlined text-4xl">
              {isUploading ? 'hourglass_top' : 'cloud_upload'}
            </span>
          </div>
          <h3 className="font-black text-2xl text-primary dark:text-white uppercase tracking-tighter">
            {isUploading ? 'Uploading...' : 'Drag & drop high-res visuals'}
          </h3>
          <p className="text-text-muted mt-2 font-medium">Support for JPG, PNG, and 4K video walk-throughs.</p>
          {!isUploading && (
            <button type="button" className="mt-8 px-10 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
              Select from device
            </button>
          )}
        </div>

        <div className="space-y-8">
           <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-widest">Active Gallery ({media?.length || 0})</h3>
           {isLoading ? (
             <div className="text-center py-10">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
               <p className="text-text-muted">Loading gallery...</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {media?.map((item, i) => (
                  <div key={item.id} className="bg-white dark:bg-surface-dark p-4 rounded-[2rem] shadow-xl border border-primary/5 group relative overflow-hidden">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                      <img src={item.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.caption || `Gallery image ${i + 1}`} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                         <button className="size-10 rounded-full bg-white text-primary hover:text-accent transition-colors">
                           <span className="material-symbols-outlined">edit</span>
                         </button>
                      </div>
                    </div>
                    <div className="px-2 pb-2">
                       <p className="text-[10px] font-black text-primary/30 uppercase tracking-widest mb-1">
                         {item.isCover ? 'Primary Cover' : 'Gallery Image'}
                       </p>
                       <input 
                         className="w-full text-xs font-bold text-primary bg-transparent border-none p-0 focus:ring-0 placeholder:text-primary/20" 
                         placeholder="Add evocative caption..." 
                         defaultValue={item.caption}
                       />
                    </div>
                  </div>
                ))}
                {(!media || media.length === 0) && (
                  <div className="col-span-full text-center p-10 bg-white rounded-2xl border border-primary/5">
                    <p className="text-text-muted font-medium">No media uploaded yet. Start by adding your first image!</p>
                  </div>
                )}
             </div>
           )}
        </div>
      </div>
    </LandlordLayout>
  );
};
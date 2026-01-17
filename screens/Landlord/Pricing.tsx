import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { landlordApi } from '../../api/endpoints/landlord';
import { Property } from '../../types';
import { LandlordLayout } from './LandlordLayout';

const initialPricing: Property['pricing'] = {
  weekendSurcharge: 15,
  minStay: 2,
  cleaningFee: 85,
  securityDeposit: 500,
  amenityFee: 0
};

export const LandlordPricing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [baseRate, setBaseRate] = useState(245);
  const [pricing, setPricing] = useState<Property['pricing']>(initialPricing);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchPricing = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const prop = await landlordApi.getPropertyById(id);
        if (prop) {
          setBaseRate(prop.price);
          setPricing(prop.pricing || initialPricing);
        }
      } catch (error) {
        console.error("Failed to fetch pricing", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPricing();
  }, [id]);

  const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPricing(prev => prev ? { ...prev, [name]: Number(value) } : null);
  };

  const handleSave = async () => {
    if (!id || !pricing) return;
    setIsSaving(true);
    try {
      await landlordApi.updatePricing(id, { price: baseRate, pricing });
      alert('Pricing updated successfully!');
    } catch (error) {
      console.error("Failed to save pricing", error);
      alert('Failed to save pricing. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const netTakehome = (baseRate * 3) + (pricing?.cleaningFee || 0) - ((baseRate*3) * 0.03);

  if (isLoading) {
    return (
      <LandlordLayout>
        <div className="p-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-muted font-semibold">Loading pricing strategy...</p>
          </div>
        </div>
      </LandlordLayout>
    );
  }

  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-primary dark:text-white tracking-tighter">Yield Strategy</h1>
          <p className="text-xl text-text-muted font-medium">Fine-tune your nightly rates and automated architectural fees.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3rem] border border-primary/5 shadow-2xl space-y-12">
              <div className="space-y-10">
                <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-widest">Base Economics</h3>
                <div className="flex items-center gap-10 bg-sand-light/10 p-10 rounded-[2.5rem] border border-primary/5">
                  <button type="button" onClick={() => setBaseRate(r => Math.max(0, r-5))} className="size-16 rounded-full bg-white border-2 border-primary/10 shadow-lg flex items-center justify-center font-black text-2xl hover:bg-primary hover:text-white transition-all">-</button>
                  <div className="flex-1 text-center">
                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2">Standard Rate</p>
                    <div className="text-7xl font-black text-primary tracking-tighter leading-none">${baseRate}</div>
                    <p className="text-xs font-bold text-text-muted mt-2">Per architectural night</p>
                  </div>
                  <button type="button" onClick={() => setBaseRate(r => r+5)} className="size-16 rounded-full bg-white border-2 border-primary/10 shadow-lg flex items-center justify-center font-black text-2xl hover:bg-primary hover:text-white transition-all">+</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-xs font-black text-primary/40 uppercase tracking-widest block ml-1">Weekend Surcharge</label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-black">%</span>
                        <input name="weekendSurcharge" value={pricing?.weekendSurcharge} onChange={handlePricingChange} type="number" className="w-full pl-12 pr-6 py-5 rounded-2xl border-primary/10 bg-sand-light/10 font-black text-primary text-xl" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-xs font-black text-primary/40 uppercase tracking-widest block ml-1">Minimum Stay (Nights)</label>
                      <input name="minStay" value={pricing?.minStay} onChange={handlePricingChange} type="number" className="w-full px-6 py-5 rounded-2xl border-primary/10 bg-sand-light/10 font-black text-primary text-xl" />
                   </div>
                </div>
              </div>
              
              <div className="pt-12 border-t border-primary/5 space-y-10">
                <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-widest">Architectural Fees</h3>
                <div className="space-y-4">
                  {[
                    { key: 'cleaningFee', label: 'Organic Cleaning Fee', icon: 'cleaning_services' },
                    { key: 'securityDeposit', label: 'Security Deposit', icon: 'lock' },
                    { key: 'amenityFee', label: 'Amenity Access Fee', icon: 'star' }
                  ].map((fee) => (
                    <div key={fee.key} className="flex justify-between items-center p-6 bg-sand-light/5 rounded-2xl border border-primary/5 hover:border-accent transition-all group">
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary/40 group-hover:text-accent transition-colors">{fee.icon}</span>
                        <span className="font-black text-sm text-primary uppercase tracking-widest">{fee.label}</span>
                      </div>
                      <div className="relative w-32">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 font-bold">$</span>
                        <input name={fee.key} value={pricing?.[fee.key as keyof typeof pricing] || 0} onChange={handlePricingChange} type="number" className="w-full pl-8 pr-4 py-3 rounded-xl border-primary/5 bg-white font-black text-primary text-right" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
             <div className="bg-primary text-white p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(64,73,56,0.4)] sticky top-28 space-y-12">
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">RevStream Estimation</h3>
                    <p className="text-white/60 text-sm font-medium">Based on 3-night mid-week stay</p>
                 </div>
                 <div className="space-y-6 text-sm font-bold border-b border-white/10 pb-10">
                    <div className="flex justify-between"><span className="text-white/50 font-black uppercase text-[10px] tracking-widest">Base Revenue</span><span>${(baseRate * 3).toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-white/50 font-black uppercase text-[10px] tracking-widest">Cleaning Total</span><span>${(pricing?.cleaningFee || 0).toFixed(2)}</span></div>
                    <div className="flex justify-between text-red-300"><span className="font-black uppercase text-[10px] tracking-widest opacity-60">Partner Service Fee</span><span>-${((baseRate * 3) * 0.03).toFixed(2)}</span></div>
                 </div>
                 <div className="flex justify-between items-end">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Net Takehome</p>
                       <p className="text-6xl font-black tracking-tighter">${netTakehome.toFixed(0)}<span className="text-xl opacity-50">.{(netTakehome % 1).toFixed(2).substring(2)}</span></p>
                    </div>
                 </div>
                 <button onClick={handleSave} disabled={isSaving} className="w-full py-5 bg-white text-primary rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSaving && <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>}
                  {isSaving ? 'Updating...' : 'Update Strategy'}
                 </button>
             </div>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BeforeAfterImage, PricingPackage } from '../types';
import { IMAGE_SERVICES, BEFORE_AFTER_GALLERY, PRICING_PACKAGES } from '../constants';

const BeforeAfterSlider: React.FC<{ item: BeforeAfterImage }> = ({ item }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseUp, handleMouseMove, handleTouchMove]);

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-primary/5 p-6 space-y-4">
      <div 
        ref={containerRef}
        className="relative w-full aspect-[16/10] select-none overflow-hidden rounded-2xl cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <img src={item.before} alt="Before" className="absolute inset-0 w-full h-full object-cover" draggable="false" />
        <div className="absolute inset-0 w-full h-full" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          <img src={item.after} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable="false" />
        </div>
        <div className="absolute top-0 bottom-0 bg-white w-1 shadow-2xl" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10 rounded-full bg-white shadow-2xl border-2 border-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary font-bold">unfold_more</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-black text-primary">{item.title}</h4>
        <p className="text-sm text-text-muted mt-1">{item.description}</p>
      </div>
    </div>
  );
};


export const ImageServicesPage: React.FC = () => {
  return (
    <main className="flex-1 w-full bg-background-light">
      {/* Hero Section */}
      <section className="relative min-h-[550px] flex items-center justify-center text-center text-white px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary">
          <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" alt="Modern interior design"/>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-accent font-black uppercase tracking-[0.3em] text-sm">For Hosts</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-xl">First Impressions are Everything.</h1>
          <p className="text-xl md:text-2xl font-medium text-white/80 max-w-2xl mx-auto">Elevate your listing with professional photography and AI-powered enhancements that capture the true essence of your sanctuary.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {IMAGE_SERVICES.map((service, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-6">
              <div className="size-20 rounded-3xl bg-primary/5 text-primary flex items-center justify-center border border-primary/5">
                <span className="material-symbols-outlined text-4xl">{service.icon}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-primary">{service.title}</h3>
                <p className="text-text-muted text-lg leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Before & After Gallery */}
      <section className="bg-sand-light/40 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter">See the Transformation.</h2>
             <p className="text-xl text-text-muted font-medium max-w-2xl mx-auto">Drag the slider to witness how our AI enhances your property photos, creating magazine-quality images that stop the scroll.</p>
          </div>
          <div className="grid grid-cols-1 gap-12">
            {BEFORE_AFTER_GALLERY.map(item => (
              <BeforeAfterSlider key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16 space-y-4">
             <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter">Investment in Occupancy.</h2>
             <p className="text-xl text-text-muted font-medium max-w-2xl mx-auto">Simple, transparent pricing to help your listing achieve its full potential.</p>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
             {PRICING_PACKAGES.map((pkg, i) => (
               <div key={i} className={`bg-white rounded-[3rem] p-10 shadow-xl border transition-all duration-300 ${pkg.isFeatured ? 'border-primary shadow-primary/10 scale-105' : 'border-primary/5 hover:shadow-2xl'}`}>
                 <h3 className="text-xl font-black text-primary uppercase tracking-widest">{pkg.title}</h3>
                 <div className="my-8 flex items-baseline gap-2">
                   <span className="text-6xl font-black text-primary tracking-tighter">{pkg.price}</span>
                   <span className="text-text-muted font-semibold">{pkg.priceSub}</span>
                 </div>
                 <ul className="space-y-4 mb-10">
                   {pkg.features.map(feat => (
                     <li key={feat} className="flex items-center gap-3 text-text-muted font-medium">
                       <span className="material-symbols-outlined text-accent text-lg">check_circle</span>
                       <span>{feat}</span>
                     </li>
                   ))}
                 </ul>
                 <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${pkg.isFeatured ? 'bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary-hover' : 'bg-sand-light text-primary hover:bg-sand'}`}>
                   Get Started
                 </button>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-dark text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to showcase your sanctuary?</h2>
          <p className="text-white/70 text-lg md:text-xl">Let's connect you with our creative team to plan the perfect visual strategy for your property.</p>
          <button className="bg-accent text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all shadow-xl">
            Book a Consultation
          </button>
        </div>
      </section>
    </main>
  );
};

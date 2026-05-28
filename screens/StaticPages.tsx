import React from 'react';

const About = () => (
  <main className="flex flex-col w-full">
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000")'}}
        ></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 lg:px-20 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter drop-shadow-2xl mb-6">
          Grounding You in<br className="hidden md:block"/> Nature's Finest
        </h1>
        <p className="text-xl md:text-2xl font-medium text-white/90 max-w-3xl mx-auto leading-relaxed">
          Reconnecting you with the earth through curated architectural stays designed to restore your natural rhythm.
        </p>
      </div>
    </section>
    
    <section className="bg-background-light py-24 px-6 lg:px-20">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 space-y-8">
            <h3 className="text-accent font-black uppercase tracking-[0.3em] text-sm">Our Mission</h3>
            <h2 className="text-4xl lg:text-5xl font-black text-primary leading-tight">
              Stays that don't just host you, but heal you.
            </h2>
            <p className="text-neutral-600 text-xl leading-relaxed">
              We believe in the power of silence, sustainable living, and the restoration found in nature. In a world that is constantly 'on', TerraRent offers the essential off-switch.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/abt1/400/500" className="rounded-3xl shadow-xl mt-12" />
            <img src="https://picsum.photos/seed/abt2/400/500" className="rounded-3xl shadow-xl" />
          </div>
        </div>
      </div>
    </section>

  </main>
);



const Contact = () => (
  <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-24">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
      <div className="lg:col-span-7">
        <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 border border-primary/5">
          <h2 className="text-4xl font-black text-primary mb-8 tracking-tighter">Send a message</h2>
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="flex flex-col gap-3">
                <span className="text-primary text-xs font-black uppercase tracking-widest">Full Name</span>
                <input className="w-full rounded-2xl border-gray-100 bg-sand-light/20 h-16 px-6 focus:ring-primary focus:border-primary" placeholder="Jane Doe"/>
              </label>
              <label className="flex flex-col gap-3">
                <span className="text-primary text-xs font-black uppercase tracking-widest">Email Address</span>
                <input className="w-full rounded-2xl border-gray-100 bg-sand-light/20 h-16 px-6 focus:ring-primary focus:border-primary" placeholder="jane@example.com"/>
              </label>
            </div>
            <label className="flex flex-col gap-3">
              <span className="text-primary text-xs font-black uppercase tracking-widest">Your Inquiry</span>
              <textarea className="w-full rounded-3xl border-gray-100 bg-sand-light/20 p-6 h-48 resize-none focus:ring-primary focus:border-primary" placeholder="Tell us how we can help..."></textarea>
            </label>
            <button className="bg-primary text-white font-black py-5 px-12 rounded-2xl shadow-2xl shadow-primary/20 hover:bg-primary-dark transition-all uppercase tracking-[0.2em] text-sm">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
        <div className="space-y-4">
          <h3 className="text-accent font-black uppercase tracking-[0.2em] text-sm">Get in touch</h3>
          <p className="text-neutral-600 text-lg leading-relaxed">Our concierge team is available 24/7 to assist with your journey to find the perfect architectural sanctuary.</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-primary/5 shadow-sm">
            <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Email Us</p>
              <p className="text-lg font-bold text-neutral-800">concierge@terrarent.com</p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-primary/5 shadow-sm">
            <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">call</span>
            </div>
            <div>
              <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Call Us</p>
              <p className="text-lg font-bold text-neutral-800">+1 (888) TERRA-STAY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export const StaticPages = { About, Contact };

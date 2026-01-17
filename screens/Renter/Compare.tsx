
import React from 'react';
import { Link } from 'react-router-dom';
import { PROPERTIES } from '../../constants';

export const Compare: React.FC = () => {
  const selectedProps = PROPERTIES.slice(0, 3);

  return (
    <div className="bg-background-light text-primary font-display min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/5 bg-white/90 backdrop-blur-md px-10 py-4">
        <Link to="/" className="flex items-center gap-4 text-primary">
          <div className="size-8 flex items-center justify-center rounded-lg bg-primary text-white"><span className="material-symbols-outlined">forest</span></div>
          <h2 className="text-xl font-bold uppercase tracking-tighter">TerraRent</h2>
        </Link>
        <Link to="/saved" className="text-sm font-bold text-accent">Back to Saved</Link>
      </header>
      
      <main className="flex-1 py-12 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-4xl font-black text-primary tracking-tighter">Compare Sanctuaries</h1>
            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-white border border-primary/10 rounded-xl text-sm font-bold shadow-sm hover:bg-sand-light">Add More</button>
              <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg hover:bg-primary-hover">Share Comparison</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
            {/* Row Labels */}
            <div className="hidden md:flex flex-col gap-0 sticky top-28 pt-[320px]">
              <div className="h-16 flex items-center text-text-muted border-b border-primary/5 font-bold text-xs uppercase tracking-widest">Type</div>
              <div className="h-16 flex items-center text-text-muted border-b border-primary/5 font-bold text-xs uppercase tracking-widest">Price / Night</div>
              <div className="h-16 flex items-center text-text-muted border-b border-primary/5 font-bold text-xs uppercase tracking-widest">Rating</div>
              <div className="h-16 flex items-center text-text-muted border-b border-primary/5 font-bold text-xs uppercase tracking-widest">Location</div>
            </div>
            
            {/* Property Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedProps.map((prop) => (
                <div key={prop.id} className="flex flex-col bg-white rounded-3xl shadow-xl border border-primary/5 overflow-hidden transition-all hover:shadow-2xl">
                  <div className="p-5 border-b border-primary/5 bg-sand-light/10">
                    <div 
                      className="w-full aspect-[4/3] bg-gray-100 rounded-2xl bg-cover bg-center mb-5 shadow-sm" 
                      style={{ backgroundImage: `url('${prop.image}')` }}
                    ></div>
                    <h3 className="text-xl font-black text-primary truncate mb-4">{prop.title}</h3>
                    <Link to={`/property-details/${prop.id}`} className="block w-full bg-primary text-white text-center py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">View Sanctuary</Link>
                  </div>
                  <div className="px-6 pb-6 space-y-0">
                    <div className="h-16 flex items-center border-b border-primary/5 text-lg font-bold">{prop.type}</div>
                    <div className="h-16 flex items-center border-b border-primary/5 text-2xl font-black text-accent">${prop.price}</div>
                    <div className="h-16 flex items-center border-b border-primary/5 gap-2">
                      <span className="material-symbols-outlined text-accent">star</span>
                      <span className="font-bold">{prop.rating}</span>
                    </div>
                    <div className="h-16 flex items-center border-b border-primary/5 text-sm font-medium text-text-muted">{prop.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

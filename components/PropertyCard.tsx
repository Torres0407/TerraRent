
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, layout = 'grid' }) => {
  if (layout === 'list') {
    return (
      <Link to={`/property-details/${property.id}`} className="group flex flex-col items-stretch justify-start rounded-xl sm:flex-row sm:items-start bg-white hover:shadow-lg transition-shadow border border-transparent hover:border-primary/20 overflow-hidden cursor-pointer">
        <div 
          className="w-full sm:w-72 h-64 sm:h-auto shrink-0 bg-center bg-no-repeat bg-cover relative" 
          style={{backgroundImage: `url('${property.image}')`}}
        ></div>
        <div className="flex flex-col flex-1 justify-between p-5 h-full">
          <div className="flex flex-col gap-1">
            <h3 className="text-[#141613] text-lg font-bold leading-snug group-hover:text-primary transition-colors">{property.title}</h3>
            <p className="text-[#727a6c] text-sm font-normal line-clamp-2 mt-1">{property.description}</p>
          </div>
          <div className="flex items-end justify-between mt-4">
            <p className="text-[#141613] text-lg font-bold">
              <span className="font-extrabold">${property.price}</span> 
              <span className="text-sm font-normal text-[#727a6c]"> / night</span>
            </p>
            <div className="flex items-center gap-1 text-sm font-medium text-text-main">
              <span className="material-symbols-outlined text-accent" style={{fontSize: "16px"}}>star</span>
              {property.rating}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/property-details/${property.id}`} className="group flex flex-col gap-3 cursor-pointer">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200">
        <div 
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
          style={{backgroundImage: `url('${property.image}')`}}
        ></div>
        {property.isSuperhost && (
          <div className="absolute left-3 top-3 rounded-md bg-accent px-2 py-1 text-xs font-bold text-white uppercase tracking-wider">Superhost</div>
        )}
        <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-primary backdrop-blur-sm transition hover:scale-110 cursor-pointer">
          <span className="material-symbols-outlined" style={{fontSize: "20px"}}>favorite</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">{property.title}</h3>
          <div className="flex items-center gap-1 text-sm font-medium text-text-main">
            <span className="material-symbols-outlined text-accent" style={{fontSize: "16px"}}>star</span>
            {property.rating}
          </div>
        </div>
        <p className="text-sm text-text-muted">{property.location}</p>
        <p className="mt-1 text-base font-medium text-primary"><span className="font-bold">${property.price}</span> / night</p>
      </div>
    </Link>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { landlordApi } from '../../api/endpoints/landlord';
import { LandlordLayout } from './LandlordLayout';

export const LandlordAddProperty: React.FC = () => {
  const navigate = useNavigate();
  
  // Basic Information
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState('APARTMENT');
  
  // Location
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  
  // Property Details
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [maxGuests, setMaxGuests] = useState(2);
  const [squareFeet, setSquareFeet] = useState('');
  
  // Pricing
  const [pricePerNight, setPricePerNight] = useState('');
  const [nightDeposit, setNightDeposit] = useState('');
  const [pricePerYear, setPricePerYear] = useState('');
  const [annualDeposit, setAnnualDeposit] = useState('');
  
  // Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const amenitiesList = [
    { id: 'b1c2d3e4-f5a6-7890-1234-567890abcdef', label: 'WiFi', icon: 'wifi' },
    { id: 'c2d3e4f5-a6b7-8901-2345-67890abcdef1', label: 'Parking', icon: 'local_parking' },
    { id: 'd3e4f5a6-b7c8-9012-3456-7890abcdef12', label: 'Kitchen', icon: 'kitchen' },
    { id: 'e4f5a6b7-c8d9-0123-4567-890abcdef123', label: 'Washer', icon: 'local_laundry_service' },
    { id: 'f5a6b7c8-d901-2345-6789-0abcdef12345', label: 'Air Conditioning', icon: 'ac_unit' },
    { id: 'a6b7c8d9-0123-4567-890a-bcdef1234567', label: 'Heating', icon: 'heat' },
    { id: 'b7c8d901-2345-6789-0abc-def123456789', label: 'Pool', icon: 'pool' },
    { id: 'c8d90123-4567-890a-bcde-f1234567890a', label: 'Gym', icon: 'fitness_center' },
  ];

  const propertyTypes = [
    { value: 'APARTMENT', label: 'Apartment' },
    { value: 'HOUSE', label: 'House' },
    { value: 'VILLA', label: 'Villa' },
    { value: 'CONDO', label: 'Condo' },
    { value: 'STUDIO', label: 'Studio' },
    { value: 'CABIN', label: 'Cabin' },
  ];

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Frontend validation
    if (!title.trim()) {
      setError('Property title is required');
      setIsLoading(false);
      return;
    }
    
    if (!description.trim()) {
      setError('Property description is required');
      setIsLoading(false);
      return;
    }
    
    if (!address.trim() || !city.trim() || !country.trim()) {
      setError('Complete address is required (address, city, and country)');
      setIsLoading(false);
      return;
    }

    // Validate at least one pricing option
    const hasNightlyPrice = pricePerNight && !isNaN(parseFloat(pricePerNight)) && parseFloat(pricePerNight) > 0;
    const hasAnnualPrice = pricePerYear && !isNaN(parseFloat(pricePerYear)) && parseFloat(pricePerYear) > 0;

    if (!hasNightlyPrice && !hasAnnualPrice) {
      setError('Please provide at least one pricing option (nightly or annual)');
      setIsLoading(false);
      return;
    }

    if (pricePerNight && parseFloat(pricePerNight) <= 0) {
      setError('Nightly price must be greater than 0');
      setIsLoading(false);
      return;
    }

    if (pricePerYear && parseFloat(pricePerYear) <= 0) {
      setError('Annual price must be greater than 0');
      setIsLoading(false);
      return;
    }

    try {
      const location = `${address}, ${city}${state ? ', ' + state : ''}${zipCode ? ', ' + zipCode : ''}, ${country}`.trim();

      const propertyData: any = {
        title: title.trim(),
        description: description.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim() || null,
        zipCode: zipCode.trim() || null,
        country: country.trim(),
        location,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        propertyType,
        maxGuests: Number(maxGuests),
        amenityIds: selectedAmenities,
        imageUrls: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000'],
          nightlyPrice: hasNightlyPrice ? parseFloat(pricePerNight) : undefined,
  annualPrice: hasAnnualPrice ? parseFloat(pricePerYear) : undefined,
  nightlyDeposit: nightDeposit ? parseFloat(nightDeposit) : undefined,
  annualDeposit: annualDeposit ? parseFloat(annualDeposit) : undefined,
  squareFeet: squareFeet ? parseFloat(squareFeet) : undefined,
      };

      // Add pricing fields only if they have values
      if (hasNightlyPrice) {
        propertyData.nightlyPrice = parseFloat(pricePerNight);
      }
      
      if (hasAnnualPrice) {
        propertyData.annualPrice = parseFloat(pricePerYear);
      }

      // Add deposits if provided
      if (nightDeposit && parseFloat(nightDeposit) > 0) {
        propertyData.nightlyDeposit = parseFloat(nightDeposit);
      }

      if (annualDeposit && parseFloat(annualDeposit) > 0) {
        propertyData.annualDeposit = parseFloat(annualDeposit);
      }

      // Add square feet if provided
      if (squareFeet && parseFloat(squareFeet) > 0) {
        propertyData.squareFeet = parseFloat(squareFeet);
      }

      console.log('Sending property data:', propertyData);

      const newProperty = await landlordApi.createProperty(propertyData);
      if (!newProperty || !newProperty.id) {
  setError('Failed to create property: No ID received from server');
  return;
}
      navigate(`/landlord/media/${newProperty.id}`);
    } catch (err: any) {
      console.error('Error creating property:', err);
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || 'Failed to create property. Please try again.';
      setError(errorMessage);

      if (err.response?.data) {
        console.error('Backend error details:', err.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LandlordLayout>
      <div className="min-h-full bg-gradient-to-br from-sand-light/20 via-white to-accent/5 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/landlord/properties" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors mb-4">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="font-semibold">Back to Properties</span>
            </Link>
            <h1 className="text-4xl font-black text-primary tracking-tight">List New Property</h1>
            <p className="text-lg text-text-muted mt-2">Fill in the details to add your property to TerraRent</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500">error</span>
                <div>
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-primary/10">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">info</span>
                Basic Information
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Property Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    placeholder="e.g., Cozy Mountain Retreat"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Property Type *</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                  >
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all resize-none"
                    rows={4}
                    placeholder="Describe your property, highlight unique features..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-primary/10">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">location_on</span>
                Location
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-primary mb-2">Street Address *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">City *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    placeholder="San Francisco"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">State/Province</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    placeholder="California"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">ZIP/Postal Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    placeholder="94102"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Country *</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    placeholder="United States"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-primary/10">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">home</span>
                Property Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Bedrooms *</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                      className="w-10 h-10 rounded-lg border-2 border-primary/20 hover:bg-primary hover:text-white transition-all font-bold"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-primary w-12 text-center">{bedrooms}</span>
                    <button
                      type="button"
                      onClick={() => setBedrooms(bedrooms + 1)}
                      className="w-10 h-10 rounded-lg border-2 border-primary/20 hover:bg-primary hover:text-white transition-all font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Bathrooms *</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                      className="w-10 h-10 rounded-lg border-2 border-primary/20 hover:bg-primary hover:text-white transition-all font-bold"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-primary w-12 text-center">{bathrooms}</span>
                    <button
                      type="button"
                      onClick={() => setBathrooms(bathrooms + 1)}
                      className="w-10 h-10 rounded-lg border-2 border-primary/20 hover:bg-primary hover:text-white transition-all font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Max Guests *</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMaxGuests(Math.max(1, maxGuests - 1))}
                      className="w-10 h-10 rounded-lg border-2 border-primary/20 hover:bg-primary hover:text-white transition-all font-bold"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-primary w-12 text-center">{maxGuests}</span>
                    <button
                      type="button"
                      onClick={() => setMaxGuests(maxGuests + 1)}
                      className="w-10 h-10 rounded-lg border-2 border-primary/20 hover:bg-primary hover:text-white transition-all font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Square Feet</label>
                  <input
                    type="number"
                    value={squareFeet}
                    onChange={(e) => setSquareFeet(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    placeholder="1200"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-primary/10">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">payments</span>
                Pricing
              </h2>
              
              <p className="text-sm text-text-muted mb-5">Provide at least one pricing option (nightly or annual)</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nightly Price */}
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    Price per Night ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    placeholder="150.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    Nightly Security Deposit ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={nightDeposit}
                    onChange={(e) => setNightDeposit(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    placeholder="500.00"
                  />
                </div>

                {/* Annual Price */}
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    Price Annually ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={pricePerYear}
                    onChange={(e) => setPricePerYear(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    placeholder="18000.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    Annual Security Deposit ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={annualDeposit}
                    onChange={(e) => setAnnualDeposit(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                    placeholder="2000.00"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-primary/10">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">stars</span>
                Amenities
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {amenitiesList.map(amenity => (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      selectedAmenities.includes(amenity.id)
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-gray-200 hover:border-accent/50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{amenity.icon}</span>
                    <span className="text-sm font-semibold">{amenity.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-between items-center pt-6">
              <Link
                to="/landlord/properties"
                className="text-primary/60 hover:text-primary font-semibold transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading && <span className="material-symbols-outlined animate-spin">progress_activity</span>}
                {isLoading ? 'Creating Property...' : 'Create Property'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </LandlordLayout>
  );
};
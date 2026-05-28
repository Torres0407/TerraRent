import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingComService } from '../../services/bookingcom/functions';
import { useAuth } from '../../context/AuthContext';

// Interface for Booking.com accommodation result
interface Accommodation {
  id: string | number;
  name: string;
  address: string;
  city: string;
  price: number;
  rating: number;
  ratingText: string;
  reviewsCount: number;
  image: string;
  tag?: string;
  roomType?: string;
  cancellationFree?: boolean;
  description?: string;
  latitude?: number;
  longitude?: number;
}

// Predefined world destinations with coordinates or ID and stunning background photos
const FEATURED_DESTINATIONS = [
  { name: 'Lagos', cityId: '-2012019', image: 'https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&q=80&w=600', country: 'Nigeria' },
  { name: 'Abuja', cityId: '-1997230', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600', country: 'Nigeria' },
  { name: 'Port Harcourt', cityId: '-2022718', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600', country: 'Nigeria' },
  { name: 'Enugu', cityId: '-2006325', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', country: 'Nigeria' },
  { name: 'Kano', cityId: '-2010996', image: 'https://images.unsplash.com/photo-1449156001533-cb39c7324c60?auto=format&fit=crop&q=80&w=600', country: 'Nigeria' },
  { name: 'Ibadan', cityId: '-2008639', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600', country: 'Nigeria' }
];

// Curated high-fidelity mock hotels list per city to fall back gracefully if API has no credentials
const MOCK_HOTELS_FALLBACK: Record<string, Accommodation[]> = {
  '-2012019': [
    { id: 'lag-1', name: 'The Wheatbaker', address: '4 Lawrence Rd, Ikoyi', city: 'Lagos', price: 280, rating: 9.3, ratingText: 'Superb', reviewsCount: 654, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800', tag: 'Luxury Boutique', roomType: 'Executive Queen Room', cancellationFree: true, latitude: 6.4529, longitude: 3.4411, description: 'A boutique luxury hotel in Ikoyi featuring signature dining and world-class spa facilities.' },
    { id: 'lag-2', name: 'Eko Hotels & Suites', address: 'Plot 1415 Adetokunbo Ademola St, Victoria Island', city: 'Lagos', price: 225, rating: 8.9, ratingText: 'Fabulous', reviewsCount: 2814, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800', tag: 'Top Rating', roomType: 'Deluxe Ocean View Room', cancellationFree: true, latitude: 6.4227, longitude: 3.4285, description: 'The most prestigious hotel conference center in West Africa, nestled in serene Victoria Island gardens.' },
    { id: 'lag-3', name: 'Radisson Blu Anchorage Hotel', address: '1A Ozumba Mbadiwe Ave, Victoria Island', city: 'Lagos', price: 195, rating: 8.7, ratingText: 'Very Good', reviewsCount: 1042, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800', tag: 'Lagoon View', roomType: 'Superior Lagoon View Room', cancellationFree: false, latitude: 6.4355, longitude: 3.4202, description: 'Overlooking the scenic Five Cowries Creek, this waterfront sanctuary provides stellar business and leisure amenities.' },
    { id: 'lag-4', name: 'Legend Hotel Lagos Airport', address: 'Ikeja Club Road, Ikeja', city: 'Lagos', price: 340, rating: 9.5, ratingText: 'Exceptional', reviewsCount: 420, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800', tag: 'Runway Luxury', roomType: 'Deluxe Suite with Runway View', cancellationFree: true, latitude: 6.5782, longitude: 3.3214, description: 'An upscale Curio Collection by Hilton airport hotel complete with private jet hangar access and gourmet dining.' }
  ],
  '-1997230': [
    { id: 'abj-1', name: 'Transcorp Hilton Abuja', address: '1 Aguiyi Ironsi St, Maitama', city: 'Abuja', price: 290, rating: 9.4, ratingText: 'Superb', reviewsCount: 1845, image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800', tag: 'Iconic Hotel', roomType: 'King Executive Maitama View', cancellationFree: true, latitude: 9.0772, longitude: 7.4984, description: 'Set in lush landscaped gardens in the heart of Maitama, this presidential hotel offers tennis courts and dining.' },
    { id: 'abj-2', name: 'Fraser Suites Abuja', address: '21 Lafia St, Central Business District', city: 'Abuja', price: 340, rating: 9.6, ratingText: 'Exceptional', reviewsCount: 780, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&q=80&w=800', tag: 'Premium Service', roomType: 'Studio Executive Apartment', cancellationFree: true, latitude: 9.0563, longitude: 7.4985, description: 'Providing high-end gold standard residences catering beautifully to global executives and diplomats.' }
  ],
  '-2022718': [
    { id: 'ph-1', name: 'Golden Tulip Port Harcourt', address: '37-39 Evo Rd, GRA Phase II', city: 'Port Harcourt', price: 180, rating: 8.8, ratingText: 'Fabulous', reviewsCount: 310, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800', tag: 'Top Value', roomType: 'Deluxe King Room', cancellationFree: true, latitude: 4.8156, longitude: 7.0498, description: 'A highly secure, serene boutique setting with pristine gardens, swimming pools, and traditional hospitality.' }
  ],
  '-2006325': [
    { id: 'enu-1', name: 'Nike Lake Resort Enugu', address: 'Nike Lake Road', city: 'Enugu', price: 130, rating: 8.5, ratingText: 'Very Good', reviewsCount: 420, image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=800', tag: 'Scenic Resort', roomType: 'Lakeview Deluxe Room', cancellationFree: true, latitude: 6.5050, longitude: 7.5350, description: 'Bordering the gorgeous Nike Lake, this resort provides peace and relaxation with local boat tours.' }
  ],
  '-2010996': [
    { id: 'kan-1', name: 'Bristol Palace Hotel Kano', address: '54/56 Guda Abdullahi Rd, Farm Centre', city: 'Kano', price: 170, rating: 9.2, ratingText: 'Superb', reviewsCount: 540, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800', tag: 'Palatial Stay', roomType: 'Superior Palatial Suite', cancellationFree: true, latitude: 12.0022, longitude: 8.5919, description: 'Providing high-end palatial design and absolute luxury in Kano with standard business support services.' }
  ],
  '-2008639': [
    { id: 'ibd-1', name: 'The Carlton Gate Hotel', address: 'Quarters 860, Agodi GRA', city: 'Ibadan', price: 160, rating: 8.8, ratingText: 'Fabulous', reviewsCount: 390, image: 'https://images.unsplash.com/photo-1606046604972-77cc76aee944?auto=format&fit=crop&q=80&w=800', tag: 'GRA Secure', roomType: 'Executive Room', cancellationFree: true, latitude: 7.4089, longitude: 3.9204, description: 'A highly elegant GRA retreat combining tranquility with contemporary comforts in capital style.' }
  ]
};

// Generic list of premium hotels for other cityId inputs
const GENERIC_HOTELS: Accommodation[] = [
  { id: 'gen-1', name: 'Grand Horizon Resort & Spa', address: '100 Seaside Boulevard', city: 'Destination', price: 220, rating: 9.1, ratingText: 'Superb', reviewsCount: 1045, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800', tag: 'Affiliate Choice', roomType: 'Standard Double Suite', cancellationFree: true },
  { id: 'gen-2', name: 'Vibe City Center Hotel', address: '42 Main Street', city: 'Destination', price: 130, rating: 8.5, ratingText: 'Very Good', reviewsCount: 2215, image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800', tag: 'Popular', roomType: 'Compact Twin Room', cancellationFree: true },
  { id: 'gen-3', name: 'Zen Retreat Eco Lodge', address: 'Mountain Ridge Road', city: 'Destination', price: 195, rating: 9.3, ratingText: 'Superb', reviewsCount: 540, image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=800', tag: 'Nature Retreat', roomType: 'Forest View Bungalow', cancellationFree: true }
];

export default function HotelSearch() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSandboxSimulation, setIsSandboxSimulation] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'featured'>('search');
  const [priceFilter, setPriceFilter] = useState<number>(600);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [bookingHotel, setBookingHotel] = useState<Accommodation | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  
  const [searchParams, setSearchParams] = useState({
    cityId: '-2012019', // Lagos, Nigeria
    checkin: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week in future
    checkout: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 9 days in future
    numberOfRooms: 1,
    numberOfAdults: 2
  });

  const handleSearch = async (forcedParams?: typeof searchParams) => {
    const paramsToUse = forcedParams || searchParams;
    setLoading(true);
    setHasSearched(true);
    setIsSandboxSimulation(false);
    
    try {
      const liveData = await bookingComService.searchAccommodations({
        cityId: paramsToUse.cityId,
        checkin: paramsToUse.checkin,
        checkout: paramsToUse.checkout,
        numberOfRooms: paramsToUse.numberOfRooms,
        numberOfAdults: paramsToUse.numberOfAdults
      });
      
      // If liveData is string returned from catch block representing error
      if (liveData && (liveData.error || (typeof liveData === 'string' && liveData.includes('error')))) {
        throw new Error(liveData.error || 'Mocking backend error');
      }

      // Safe JSON parsing fallback in case of raw string response from Spring Boot
      let parsedData = liveData;
      if (typeof liveData === 'string') {
        try {
          parsedData = JSON.parse(liveData);
        } catch (e) {
          console.error("Failed to parse liveData string:", e);
        }
      }

      // Check if data formatting requires transformation
      let dataToMap: any[] = [];
      if (Array.isArray(parsedData)) {
        dataToMap = parsedData;
      } else if (parsedData && parsedData.accommodations) {
        dataToMap = parsedData.accommodations;
      } else {
        throw new Error('Empty payload from sandboxed endpoint');
      }

      const mappedHotels = dataToMap.map((h: any) => {
        const rawRating = h.rating || 0;
        const scaledRating = rawRating <= 5 ? rawRating * 2 : rawRating;
        return {
          id: h.hotel_id || h.id,
          name: h.name,
          address: h.address,
          city: h.city,
          price: h.nightly_price || h.price || 0,
          rating: scaledRating,
          ratingText: scaledRating >= 9 ? 'Exceptional' : scaledRating >= 8.5 ? 'Superb' : scaledRating >= 8 ? 'Very Good' : h.ratingText || 'Good',
          reviewsCount: h.review_count || h.reviewsCount || 0,
          image: h.primary_image || h.image,
          tag: h.tag,
          roomType: h.roomType,
          cancellationFree: h.cancellationFree,
          description: h.description,
          latitude: h.latitude,
          longitude: h.longitude,
        };
      });

      setHotels(mappedHotels);
    } catch (err) {
      console.warn("⚠️ API keys or backend connection sandboxed. Loading high-fidelity simulator data...");
      setIsSandboxSimulation(true);
      
      // Fallback matching cityId or generic
      setTimeout(() => {
        const matchingCityHotels = MOCK_HOTELS_FALLBACK[paramsToUse.cityId] || GENERIC_HOTELS;
        // Set dynamic city name
        const cityName = FEATURED_DESTINATIONS.find(d => d.cityId === paramsToUse.cityId)?.name || 'Local Destination';
        
        const tailoredHotels = matchingCityHotels.map(h => ({
          ...h,
          city: cityName
        }));
        
        setHotels(tailoredHotels);
      }, 750); // Small delay to simulate genuine network request
    } finally {
      setTimeout(() => {
        setLoading(false);
        setActiveTab('search');
      }, 750);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleFeaturedClick = (cityId: string) => {
    const updatedParams = { ...searchParams, cityId };
    setSearchParams(updatedParams);
    handleSearch(updatedParams);
  };

  const handleBookNow = (hotel: Accommodation) => {
    navigate(`/hotel-details/${hotel.id}?checkin=${searchParams.checkin}&checkout=${searchParams.checkout}&rooms=${searchParams.numberOfRooms}&guests=${searchParams.numberOfAdults}`);
  };

  const confirmBooking = async () => {
    if (!isAuthenticated) {
      alert('Please log in to reserve an affiliate room.');
      return;
    }

    if (!bookingHotel) return;

    setBookingLoading(true);
    try {
      const payload = {
        hotelId: bookingHotel.id.toString(),
        title: bookingHotel.name,
        description: bookingHotel.description || `Premium stay at ${bookingHotel.name}`,
        address: bookingHotel.address,
        nightlyPrice: bookingHotel.price,
        imageUrl: bookingHotel.image,
        bookingDate: searchParams.checkin,
        latitude: bookingHotel.latitude || 0,
        longitude: bookingHotel.longitude || 0,
        status: "CONFIRMED" as const
      };

      await bookingComService.bookAccommodation(payload);
      setBookingLoading(false);
      setBookingSuccess(true);
    } catch (error) {
      console.error(error);
      setBookingLoading(false);
      alert('Failed to book hotel via affiliate network. Please try again.');
    }
  };

  const getCityName = (cityId: string) => {
    return FEATURED_DESTINATIONS.find(d => d.cityId === cityId)?.name || `ID: ${cityId}`;
  };

  // Filtered hotel results based on local state controls
  const filteredHotels = hotels.filter(hotel => {
    return hotel.price <= priceFilter && hotel.rating >= ratingFilter;
  });

  return (
    <div className="bg-background-light min-h-screen text-primary font-display pb-20 w-full">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-accent/5 rounded-full opacity-60 blur-3xl pointer-events-none"></div>
      <div className="absolute top-[30rem] left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full opacity-40 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
          <span>Renter Portal</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-bold text-accent">Nigeria Live Hotels</span>
        </div>

        {/* Premium Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-none">
              Live Hotels Portal
            </h1>
            <p className="text-text-muted text-lg mt-2 font-medium">
              Explore premium accommodations across Nigeria in real-time, powered by live booking services.
            </p>
          </div>
          <div className="flex gap-2 bg-white/60 backdrop-blur-md p-1 rounded-2xl border border-primary/5 shadow-sm self-start">
            <button 
              onClick={() => setActiveTab('featured')} 
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'featured' ? 'bg-primary text-white shadow-sm' : 'text-primary/70 hover:text-primary'}`}
            >
              Featured Cities
            </button>
            <button 
              onClick={() => setActiveTab('search')} 
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'search' ? 'bg-primary text-white shadow-sm' : 'text-primary/70 hover:text-primary'}`}
            >
              Search Panel {hasSearched && `(${filteredHotels.length})`}
            </button>
          </div>
        </div>

        {/* Global Glassmorphic Search Form */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-primary/5 shadow-xl space-y-6 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/20 to-transparent rounded-bl-full pointer-events-none"></div>
          
          <h2 className="text-lg font-black uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-accent">travel_explore</span>
            Find Stays in Nigeria
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Destination Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary/50 uppercase tracking-[0.2em]">City Destination</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-accent text-lg">location_on</span>
                <select 
                  value={searchParams.cityId}
                  onChange={e => setSearchParams({...searchParams, cityId: e.target.value})}
                  className="w-full bg-sand-light/30 border border-primary/10 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold text-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="-2012019">Lagos (Nigeria)</option>
                  <option value="-1997230">Abuja (Nigeria)</option>
                  <option value="-2022718">Port Harcourt (Nigeria)</option>
                  <option value="-2006325">Enugu (Nigeria)</option>
                  <option value="-2010996">Kano (Nigeria)</option>
                  <option value="-2008639">Ibadan (Nigeria)</option>

                </select>
              </div>
            </div>

            {/* Check-in Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary/50 uppercase tracking-[0.2em]">Check-in Date</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-accent text-lg">calendar_today</span>
                <input 
                  type="date" 
                  value={searchParams.checkin} 
                  onChange={e => setSearchParams({...searchParams, checkin: e.target.value})}
                  className="w-full bg-sand-light/30 border border-primary/10 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold text-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary/50 uppercase tracking-[0.2em]">Check-out Date</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-accent text-lg">calendar_month</span>
                <input 
                  type="date" 
                  value={searchParams.checkout} 
                  onChange={e => setSearchParams({...searchParams, checkout: e.target.value})}
                  className="w-full bg-sand-light/30 border border-primary/10 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold text-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Adults Count */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary/50 uppercase tracking-[0.2em]">Adults</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-accent text-lg">person</span>
                <input 
                  type="number" 
                  min={1}
                  max={10}
                  value={searchParams.numberOfAdults} 
                  onChange={e => setSearchParams({...searchParams, numberOfAdults: parseInt(e.target.value) || 2})}
                  className="w-full bg-sand-light/30 border border-primary/10 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold text-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Search Trigger Button */}
            <div className="flex items-end">
              <button 
                onClick={() => handleSearch()} 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-primary-hover text-white py-3.5 text-sm font-black uppercase tracking-wider transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">search</span>
                    <span>Search Hotels</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Tab 1: Featured Cities Section */}
        {activeTab === 'featured' && (
          <section className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-primary/5 pb-4">
              <h2 className="text-2xl font-black text-primary tracking-tight">Browse Hot Destinations</h2>
              <span className="text-sm font-bold text-accent uppercase tracking-widest">Select city to instant query</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {FEATURED_DESTINATIONS.map((dest) => (
                <div 
                  key={dest.cityId}
                  onClick={() => handleFeaturedClick(dest.cityId)}
                  className="group relative h-72 rounded-[2rem] overflow-hidden shadow-lg border border-primary/5 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Photo Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${dest.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-black/20 group-hover:via-primary/45 transition-colors"></div>
                  
                  {/* Location Text */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end text-white">
                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">{dest.country}</p>
                    <h3 className="text-2xl font-black tracking-tight leading-tight">{dest.name}</h3>
                    <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-black uppercase tracking-wider text-white">Explore Hotels</span>
                      <span className="material-symbols-outlined text-xs text-accent">arrow_forward</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 2: Main Search Results Area */}
        {activeTab === 'search' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start animate-fadeIn">
            
            {/* Sidebar Results Filters */}
            <aside className="bg-white rounded-[2rem] p-6 border border-primary/5 shadow-xl space-y-8 sticky top-28 self-start">
              <div className="flex items-center justify-between pb-4 border-b border-primary/5">
                <h3 className="text-lg font-black text-primary uppercase tracking-wider">Filters</h3>
                {(priceFilter !== 600 || ratingFilter !== 0) && (
                  <button 
                    onClick={() => { setPriceFilter(600); setRatingFilter(0); }}
                    className="text-xs font-bold text-accent hover:underline"
                  >
                    Reset all
                  </button>
                )}
              </div>

              {/* Price Range Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider text-primary/60">
                  <span>Max Budget</span>
                  <span className="text-primary font-black">${priceFilter} / night</span>
                </div>
                <input 
                  type="range" 
                  min={80}
                  max={600}
                  step={10}
                  value={priceFilter}
                  onChange={e => setPriceFilter(Number(e.target.value))}
                  className="w-full h-1 bg-sand-light rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[10px] font-bold text-text-muted">
                  <span>$80</span>
                  <span>$600+</span>
                </div>
              </div>

              {/* Guest Rating Filter */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-primary/60 block">Guest Rating</label>
                <div className="flex flex-col gap-2">
                  {[
                    { val: 0, label: 'Any Rating' },
                    { val: 8.5, label: 'Very Good: 8.5+' },
                    { val: 9.0, label: 'Superb: 9.0+' },
                    { val: 9.5, label: 'Exceptional: 9.5+' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setRatingFilter(item.val)}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${ratingFilter === item.val ? 'bg-primary text-white' : 'text-primary/70 hover:bg-sand-light/50'}`}
                    >
                      <span>{item.label}</span>
                      {ratingFilter === item.val && <span className="material-symbols-outlined text-sm">check</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* API Security Banner */}
              {isSandboxSimulation && (
                <div className="bg-accent/5 rounded-2xl p-4 border border-accent/20 space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <span className="material-symbols-outlined text-sm font-bold">info</span>
                    <span className="text-xs font-black uppercase tracking-wider">Simulation Mode</span>
                  </div>
                  <p className="text-[10px] text-text-muted leading-relaxed font-medium">
                    Showing high-fidelity sandbox data matching your destination query. Backend credentials default to developer mode.
                  </p>
                </div>
              )}
            </aside>

            {/* Main Hotel Results Display */}
            <main className="lg:col-span-3 space-y-6">
              
              {/* Query Meta Header */}
              <div className="flex items-center justify-between bg-white/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-primary/5 shadow-sm">
                <p className="text-xs font-semibold text-text-muted">
                  Showing <span className="text-primary font-bold">{filteredHotels.length}</span> luxury properties in <span className="text-primary font-black">{getCityName(searchParams.cityId)}</span>
                </p>
                <span className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Dates: {searchParams.checkin} to {searchParams.checkout}
                </span>
              </div>

              {/* Shimmering Loader for Search Process */}
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white rounded-[2.5rem] p-6 border border-primary/5 shadow-md flex flex-col md:flex-row gap-6 animate-pulse">
                      <div className="md:w-64 h-48 bg-sand-light rounded-[1.5rem] shrink-0"></div>
                      <div className="flex-1 space-y-4 py-2">
                        <div className="h-6 bg-sand-light rounded-md w-2/3"></div>
                        <div className="h-4 bg-sand-light rounded-md w-1/3"></div>
                        <div className="space-y-2 pt-2">
                          <div className="h-4 bg-sand-light rounded-md w-full"></div>
                          <div className="h-4 bg-sand-light rounded-md w-5/6"></div>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                          <div className="h-8 bg-sand-light rounded-md w-24"></div>
                          <div className="h-10 bg-sand-light rounded-md w-32"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredHotels.length > 0 ? (
                <div className="space-y-6">
                  {filteredHotels.map((hotel) => (
                    <div 
                      key={hotel.id}
                      className="bg-white rounded-[2.5rem] p-6 border border-primary/5 shadow-md flex flex-col md:flex-row gap-6 group hover:shadow-xl hover:border-primary/10 transition-all duration-300"
                    >
                      {/* Premium Hotel Picture with Badges */}
                      <div className="relative md:w-72 h-52 shrink-0 rounded-[1.8rem] overflow-hidden shadow-md">
                        <div 
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                          style={{ backgroundImage: `url('${hotel.image}')` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        
                        {/* Custom Badge Tag */}
                        {hotel.tag && (
                          <span className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md border border-white/10">
                            {hotel.tag}
                          </span>
                        )}
                        
                        {hotel.cancellationFree && (
                          <span className="absolute bottom-4 left-4 bg-green-500/90 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                            Free Cancellation
                          </span>
                        )}
                      </div>

                      {/* Info and Booking Details Panel */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          
                          {/* Rating and Address Row */}
                          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                            <span className="text-[10px] font-black text-accent uppercase tracking-widest flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">hotel_class</span>
                              Premium Accommodation
                            </span>
                            
                            {/* Guest Review Score badge */}
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <p className="text-xs font-black text-primary">{hotel.ratingText}</p>
                                <p className="text-[9px] font-bold text-text-muted">{hotel.reviewsCount} reviews</p>
                              </div>
                              <div className="bg-primary text-white text-sm font-black size-9 rounded-xl flex items-center justify-center shadow-md">
                                {hotel.rating.toFixed(1)}
                              </div>
                            </div>
                          </div>

                          {/* Hotel Name */}
                          <h3 className="text-2xl font-black text-primary group-hover:text-accent transition-colors leading-tight mb-2">
                            {hotel.name}
                          </h3>

                          {/* Address & City */}
                          <p className="text-sm font-medium text-text-muted flex items-center gap-1 mb-4">
                            <span className="material-symbols-outlined text-[16px] text-accent">pin_drop</span>
                            {hotel.address}, {hotel.city}
                          </p>

                          {/* Room specifications */}
                          <div className="bg-sand-light/20 rounded-xl p-3 inline-flex items-center gap-2 border border-primary/5 mb-4">
                            <span className="material-symbols-outlined text-sm text-primary/60">bedroom_parent</span>
                            <span className="text-xs font-bold text-gray-700">{hotel.roomType || 'Deluxe Double Guest Room'}</span>
                          </div>
                        </div>

                        {/* Pricing and Action row */}
                        <div className="flex items-center justify-between border-t border-primary/5 pt-4 flex-wrap gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.1em]">Total per night</p>
                            <div className="flex items-baseline gap-1 mt-1">
                              <span className="text-3xl font-black text-primary tracking-tighter">${hotel.price}</span>
                              <span className="text-xs font-bold text-text-muted">/ night</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleBookNow(hotel)}
                            className="bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2"
                          >
                            <span>Book Room</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] p-16 text-center border border-primary/5 shadow-md">
                  <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 animate-pulse">hotel</span>
                  <h3 className="text-xl font-bold text-primary">No accommodations found</h3>
                  <p className="text-text-muted mt-2 max-w-sm mx-auto">
                    Try adjusting your budget filter or search for a different global destination.
                  </p>
                  <button 
                    onClick={() => { setPriceFilter(600); setRatingFilter(0); }}
                    className="mt-6 px-6 py-2.5 bg-primary text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-primary-hover shadow-md transition-colors"
                  >
                    Clear Filter Constraints
                  </button>
                </div>
              )}

            </main>

          </div>
        )}

      </div>

      {/* Premium Booking Modal Overlay */}
      {bookingHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-[3rem] w-full max-w-xl border border-primary/5 shadow-2xl p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/20 to-transparent rounded-bl-full pointer-events-none"></div>

            {/* Success Celebration Screen */}
            {bookingSuccess ? (
              <div className="text-center py-10 space-y-6">
                <div className="size-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-md border border-green-100 animate-bounce">
                  <span className="material-symbols-outlined text-4xl font-black">celebration</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-primary tracking-tight">Affiliate Confirmed!</h3>
                  <p className="text-text-muted font-medium px-4">
                    Your live room has been successfully reserved via Booking.com Affiliate Network.
                  </p>
                </div>
                
                {/* Reservation Summary */}
                <div className="bg-sand-light/30 rounded-2xl p-5 text-left border border-primary/5 space-y-3">
                  <div className="flex justify-between border-b border-primary/5 pb-2 text-xs font-bold text-text-muted">
                    <span>RESERVATION ID</span>
                    <span className="text-primary font-black tracking-widest uppercase">BC-{(Math.random() * 10000000).toFixed(0)}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black text-primary">{bookingHotel.name}</p>
                    <p className="text-xs text-text-muted">{bookingHotel.address}, {bookingHotel.city}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-primary/5 text-xs">
                    <div>
                      <p className="font-bold text-text-muted uppercase">CHECK-IN</p>
                      <p className="font-black text-primary mt-0.5">{searchParams.checkin}</p>
                    </div>
                    <div>
                      <p className="font-bold text-text-muted uppercase">CHECK-OUT</p>
                      <p className="font-black text-primary mt-0.5">{searchParams.checkout}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setBookingHotel(null)}
                  className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-widest py-4 rounded-2xl shadow-md transition-colors"
                >
                  Return to Portal
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Modal Title */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black text-primary tracking-tight">Booking Summary</h3>
                    <p className="text-xs font-bold text-accent uppercase tracking-widest mt-1">Affiliate Checkout Flow</p>
                  </div>
                  <button 
                    onClick={() => setBookingHotel(null)}
                    className="size-8 rounded-full bg-sand-light/50 hover:bg-sand-light text-primary flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>

                {/* Selected Hotel Card */}
                <div className="flex items-center gap-4 bg-sand-light/20 p-4 rounded-2xl border border-primary/5">
                  <div className="size-16 rounded-xl bg-cover bg-center shrink-0 shadow-sm" style={{ backgroundImage: `url('${bookingHotel.image}')` }}></div>
                  <div className="min-w-0">
                    <h4 className="font-black text-primary truncate leading-tight">{bookingHotel.name}</h4>
                    <p className="text-xs text-text-muted truncate mt-1">{bookingHotel.address}, {bookingHotel.city}</p>
                    <p className="text-xs font-bold text-accent mt-1">★ {bookingHotel.rating.toFixed(1)} {bookingHotel.ratingText}</p>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-4 bg-sand-light/10 p-5 rounded-2xl border border-primary/5 text-xs">
                  <div>
                    <p className="font-bold text-primary/50 uppercase tracking-wider">Rooms / Guests</p>
                    <p className="font-black text-primary mt-1">{searchParams.numberOfRooms} Room, {searchParams.numberOfAdults} Adults</p>
                  </div>
                  <div>
                    <p className="font-bold text-primary/50 uppercase tracking-wider">Stay Duration</p>
                    <p className="font-black text-primary mt-1">2 Nights (Estimated)</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-primary/5 flex justify-between items-baseline">
                    <span className="font-bold text-primary/50 uppercase tracking-wider">Price details</span>
                    <span className="text-xl font-black text-accent">${bookingHotel.price * 2} <span className="text-xs text-text-muted font-bold">Total</span></span>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-primary/40 uppercase tracking-wider">First Name</label>
                      <input type="text" defaultValue="John" className="w-full bg-sand-light/30 border border-primary/10 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 focus:ring-1 focus:ring-accent" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-primary/40 uppercase tracking-wider">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full bg-sand-light/30 border border-primary/10 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 focus:ring-1 focus:ring-accent" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-primary/40 uppercase tracking-wider">Email Address</label>
                    <input type="email" defaultValue="john.doe@example.com" className="w-full bg-sand-light/30 border border-primary/10 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 focus:ring-1 focus:ring-accent" />
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={confirmBooking}
                  disabled={bookingLoading}
                  className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {bookingLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Connecting Booking.com Affiliate...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">lock</span>
                      <span>Securely Reserve via Affiliate</span>
                    </>
                  )}
                </button>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

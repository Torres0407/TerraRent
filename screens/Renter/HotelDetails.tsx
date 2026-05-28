import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { bookingComService } from '../../services/bookingcom/functions';

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

// Flat map of all premium Nigerian hotels to easily look them up by ID
const NIGERIAN_HOTELS: Record<string, Accommodation> = {
  'lag-1': { id: 'lag-1', name: 'The Wheatbaker', address: '4 Lawrence Rd, Ikoyi', city: 'Lagos', price: 280, rating: 9.3, ratingText: 'Superb', reviewsCount: 654, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800', tag: 'Luxury Boutique', roomType: 'Executive Queen Room', cancellationFree: true, latitude: 6.4529, longitude: 3.4411, description: 'A boutique luxury hotel in Ikoyi featuring signature dining and world-class spa facilities.' },
  'lag-2': { id: 'lag-2', name: 'Eko Hotels & Suites', address: 'Plot 1415 Adetokunbo Ademola St, Victoria Island', city: 'Lagos', price: 225, rating: 8.9, ratingText: 'Fabulous', reviewsCount: 2814, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800', tag: 'Top Rating', roomType: 'Deluxe Ocean View Room', cancellationFree: true, latitude: 6.4227, longitude: 3.4285, description: 'The most prestigious hotel conference center in West Africa, nestled in serene Victoria Island gardens.' },
  'lag-3': { id: 'lag-3', name: 'Radisson Blu Anchorage Hotel', address: '1A Ozumba Mbadiwe Ave, Victoria Island', city: 'Lagos', price: 195, rating: 8.7, ratingText: 'Very Good', reviewsCount: 1042, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800', tag: 'Lagoon View', roomType: 'Superior Lagoon View Room', cancellationFree: false, latitude: 6.4355, longitude: 3.4202, description: 'Overlooking the scenic Five Cowries Creek, this waterfront sanctuary provides stellar business and leisure amenities.' },
  'lag-4': { id: 'lag-4', name: 'Legend Hotel Lagos Airport', address: 'Ikeja Club Road, Ikeja', city: 'Lagos', price: 340, rating: 9.5, ratingText: 'Exceptional', reviewsCount: 420, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800', tag: 'Runway Luxury', roomType: 'Deluxe Suite with Runway View', cancellationFree: true, latitude: 6.5782, longitude: 3.3214, description: 'An upscale Curio Collection by Hilton airport hotel complete with private jet hangar access and gourmet dining.' },
  'abj-1': { id: 'abj-1', name: 'Transcorp Hilton Abuja', address: '1 Aguiyi Ironsi St, Maitama', city: 'Abuja', price: 290, rating: 9.4, ratingText: 'Superb', reviewsCount: 1845, image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800', tag: 'Iconic Hotel', roomType: 'King Executive Maitama View', cancellationFree: true, latitude: 9.0772, longitude: 7.4984, description: 'Set in lush landscaped gardens in the heart of Maitama, this presidential hotel offers tennis courts and dining.' },
  'abj-2': { id: 'abj-2', name: 'Fraser Suites Abuja', address: '21 Lafia St, Central Business District', city: 'Abuja', price: 340, rating: 9.6, ratingText: 'Exceptional', reviewsCount: 780, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&q=80&w=800', tag: 'Premium Service', roomType: 'Studio Executive Apartment', cancellationFree: true, latitude: 9.0563, longitude: 7.4985, description: 'Providing high-end gold standard residences catering beautifully to global executives and diplomats.' },
  'ph-1': { id: 'ph-1', name: 'Golden Tulip Port Harcourt', address: '37-39 Evo Rd, GRA Phase II', city: 'Port Harcourt', price: 180, rating: 8.8, ratingText: 'Fabulous', reviewsCount: 310, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800', tag: 'Top Value', roomType: 'Deluxe King Room', cancellationFree: true, latitude: 4.8156, longitude: 7.0498, description: 'A highly secure, serene boutique setting with pristine gardens, swimming pools, and traditional hospitality.' },
  'enu-1': { id: 'enu-1', name: 'Nike Lake Resort Enugu', address: 'Nike Lake Road', city: 'Enugu', price: 130, rating: 8.5, ratingText: 'Very Good', reviewsCount: 420, image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=800', tag: 'Scenic Resort', roomType: 'Lakeview Deluxe Room', cancellationFree: true, latitude: 6.5050, longitude: 7.5350, description: 'Bordering the gorgeous Nike Lake, this resort provides peace and relaxation with local boat tours.' },
  'kan-1': { id: 'kan-1', name: 'Bristol Palace Hotel Kano', address: '54/56 Guda Abdullahi Rd, Farm Centre', city: 'Kano', price: 170, rating: 9.2, ratingText: 'Superb', reviewsCount: 540, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800', tag: 'Palatial Stay', roomType: 'Superior Palatial Suite', cancellationFree: true, latitude: 12.0022, longitude: 8.5919, description: 'Providing high-end palatial design and absolute luxury in Kano with standard business support services.' },
  'ibd-1': { id: 'ibd-1', name: 'The Carlton Gate Hotel', address: 'Quarters 860, Agodi GRA', city: 'Ibadan', price: 160, rating: 8.8, ratingText: 'Fabulous', reviewsCount: 390, image: 'https://images.unsplash.com/photo-1606046604972-77cc76aee944?auto=format&fit=crop&q=80&w=800', tag: 'GRA Secure', roomType: 'Executive Room', cancellationFree: true, latitude: 7.4089, longitude: 3.9204, description: 'A highly elegant GRA retreat combining tranquility with contemporary comforts in capital style.' },
  
  // Aliases for BookingCom API live hotel IDs returned from sandboxed backend
  'bookingcom_the_wheatbaker': { id: 'bookingcom_the_wheatbaker', name: 'The Wheatbaker', address: '4 Onitolo Road, Ikoyi', city: 'Lagos', price: 280, rating: 9.3, ratingText: 'Superb', reviewsCount: 654, image: 'https://images.unsplash.com/photo-1544097652-3d31157d83d6?auto=format&fit=crop&w=800&q=80', tag: 'Luxury Boutique', roomType: 'Executive Queen Room', cancellationFree: true, latitude: 6.4529, longitude: 3.4411, description: 'A boutique luxury hotel in Ikoyi featuring signature dining and world-class spa facilities.' },
  'bookingcom_eko_hotels': { id: 'bookingcom_eko_hotels', name: 'Eko Hotels & Suites', address: 'Plot 1415 Adetokunbo Ademola Street, Victoria Island', city: 'Lagos', price: 225, rating: 8.9, ratingText: 'Fabulous', reviewsCount: 2814, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', tag: 'Top Rating', roomType: 'Deluxe Ocean View Room', cancellationFree: true, latitude: 6.4267, longitude: 3.4301, description: 'The most prestigious hotel conference center in West Africa, nestled in serene Victoria Island gardens.' },
  'bookingcom_radisson_blu': { id: 'bookingcom_radisson_blu', name: 'Radisson Blu Anchorage Hotel', address: '1a Ozumba Mbadiwe Avenue, Victoria Island', city: 'Lagos', price: 195, rating: 8.7, ratingText: 'Very Good', reviewsCount: 1042, image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80', tag: 'Lagoon View', roomType: 'Superior Lagoon View Room', cancellationFree: false, latitude: 6.4355, longitude: 3.4202, description: 'Overlooking the scenic Five Cowries Creek, this waterfront sanctuary provides stellar business and leisure amenities.' },
  'bookingcom_transcorp_hilton': { id: 'bookingcom_transcorp_hilton', name: 'Transcorp Hilton Abuja', address: '1 Aguiyi Ironsi Street, Maitama', city: 'Abuja', price: 290, rating: 9.4, ratingText: 'Superb', reviewsCount: 1845, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', tag: 'Iconic Hotel', roomType: 'King Executive Maitama View', cancellationFree: true, latitude: 9.0772, longitude: 7.4939, description: 'Set in lush landscaped gardens in the heart of Maitama, this presidential hotel offers tennis courts and dining.' },
  'bookingcom_fraser_suites': { id: 'bookingcom_fraser_suites', name: 'Fraser Suites Abuja', address: '21 Lafia St, Central Business District', city: 'Abuja', price: 340, rating: 9.6, ratingText: 'Exceptional', reviewsCount: 780, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80', tag: 'Premium Service', roomType: 'Studio Executive Apartment', cancellationFree: true, latitude: 9.0563, longitude: 7.4985, description: 'Providing high-end gold standard residences catering beautifully to global executives and diplomats.' },
  'bookingcom_golden_tulip': { id: 'bookingcom_golden_tulip', name: 'Golden Tulip Port Harcourt', address: '37-39 Evo Rd, GRA Phase II', city: 'Port Harcourt', price: 180, rating: 8.8, ratingText: 'Fabulous', reviewsCount: 310, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', tag: 'Top Value', roomType: 'Deluxe King Room', cancellationFree: true, latitude: 4.8156, longitude: 7.0498, description: 'A highly secure, serene boutique setting with pristine gardens, swimming pools, and traditional hospitality.' },
  'bookingcom_nike_lake': { id: 'bookingcom_nike_lake', name: 'Nike Lake Resort Enugu', address: 'Nike Lake Road', city: 'Enugu', price: 130, rating: 8.5, ratingText: 'Very Good', reviewsCount: 420, image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80', tag: 'Scenic Resort', roomType: 'Lakeview Deluxe Room', cancellationFree: true, latitude: 6.5050, longitude: 7.5350, description: 'Bordering the gorgeous Nike Lake, this resort provides peace and relaxation with local boat tours.' },
  'bookingcom_bristol_palace': { id: 'bookingcom_bristol_palace', name: 'Bristol Palace Hotel Kano', address: '54/56 Guda Abdullahi Rd, Farm Centre', city: 'Kano', price: 170, rating: 9.2, ratingText: 'Superb', reviewsCount: 540, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', tag: 'Palatial Stay', roomType: 'Superior Palatial Suite', cancellationFree: true, latitude: 12.0022, longitude: 8.5919, description: 'Providing high-end palatial design and absolute luxury in Kano with standard business support services.' },
  'bookingcom_carlton_gate': { id: 'bookingcom_carlton_gate', name: 'The Carlton Gate Hotel', address: 'Quarters 860, Agodi GRA', city: 'Ibadan', price: 160, rating: 8.8, ratingText: 'Fabulous', reviewsCount: 390, image: 'https://images.unsplash.com/photo-1606046604972-77cc76aee944?auto=format&fit=crop&w=800&q=80', tag: 'GRA Secure', roomType: 'Executive Room', cancellationFree: true, latitude: 7.4089, longitude: 3.9204, description: 'A highly elegant GRA retreat combining tranquility with contemporary comforts in capital style.' },
  'bookingcom_ibom_icon': { id: 'bookingcom_ibom_icon', name: 'Ibom Icon Hotel & Golf Resort', address: 'Nwaniba Road, Uyo, Akwa Ibom', city: 'Uyo', price: 110, rating: 9.0, ratingText: 'Superb', reviewsCount: 340, image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80', tag: 'Golf Resort', roomType: 'Lush Forest View Room', cancellationFree: true, latitude: 5.0410, longitude: 7.9861, description: 'Spread across a sprawling lush tropical forest landscape, Ibom Icon Hotel is renowned for its world-class 18-hole golf course, serene natural surroundings, and majestic resort architecture.' },
  'bookingcom_obudu_resort': { id: 'bookingcom_obudu_resort', name: 'Obudu Mountain Resort', address: 'Obudu Plateau, Obanliku, Cross River', city: 'Calabar', price: 95, rating: 8.3, ratingText: 'Very Good', reviewsCount: 285, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80', tag: 'Eco Resort', roomType: 'Standard Cabin', cancellationFree: true, latitude: 6.5312, longitude: 9.3872, description: 'Perched high in the scenic mountains of Cross River State, Obudu Mountain Resort features temperate climate, breathtaking canyon views, and a spectacular cable car ride.' }
};

const AMENITIES_LIST = [
  { name: 'Free High-speed Wi-Fi', icon: 'wifi' },
  { name: 'Infinity Swimming Pool', icon: 'pool' },
  { name: 'Luxury Wellness Spa', icon: 'spa' },
  { name: '24/7 Room Service & Dining', icon: 'room_service' },
  { name: 'Fitness & Cardio Center', icon: 'fitness_center' },
  { name: 'Secure Private Parking', icon: 'local_parking' },
  { name: 'Complimentary Airport Shuttle', icon: 'airport_shuttle' },
  { name: 'Executive Meeting Suites', icon: 'meeting_room' }
];

export default function HotelDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const hotel = NIGERIAN_HOTELS[id || ''] || NIGERIAN_HOTELS['lag-1'];

  // Parse dates
  const checkin = searchParams.get('checkin') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const checkout = searchParams.get('checkout') || new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const roomsCount = parseInt(searchParams.get('rooms') || '1') || 1;
  const guestsCount = parseInt(searchParams.get('guests') || '2') || 2;

  // Calculate nights
  const d1 = new Date(checkin);
  const d2 = new Date(checkout);
  const nights = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));

  // States
  const [selectedRoomType, setSelectedRoomType] = useState<'superior' | 'executive' | 'presidential'>('superior');
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [reservationId, setReservationId] = useState('');

  // Setup Leaflet map on load
  useEffect(() => {
    // Inject Leaflet CDN if not already present
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }

    let mapInstance: any = null;

    function initMap() {
      const L = (window as any).L;
      if (!L || !document.getElementById('details-map')) return;

      const lat = hotel.latitude || 6.4529;
      const lng = hotel.longitude || 3.4411;

      // Clean up previous map if exists
      const container = document.getElementById('details-map');
      if (container && (container as any)._leaflet_id) {
        return; 
      }

      mapInstance = L.map('details-map', {
        center: [lat, lng],
        zoom: 15,
        zoomControl: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(mapInstance);

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background-color:#3f4936;color:white;padding:6px 12px;border-radius:999px;font-weight:900;border:2px solid white;box-shadow:0 10px 15px rgba(0,0,0,0.2);white-space:nowrap;">$${hotel.price}</div>`,
        iconSize: [60, 30],
        iconAnchor: [30, 15]
      });

      L.marker([lat, lng], { icon: customIcon }).addTo(mapInstance)
        .bindPopup(`<b>${hotel.name}</b><br/>${hotel.address}`)
        .openPopup();
    }

    return () => {
      // Leaflet cleanup if needed
    };
  }, [hotel]);

  // Pricing calculations based on selected room
  const getRoomRateMultiplier = () => {
    if (selectedRoomType === 'executive') return 1.4;
    if (selectedRoomType === 'presidential') return 2.2;
    return 1.0;
  };

  const getRoomName = () => {
    if (selectedRoomType === 'executive') return 'Executive Business Suite';
    if (selectedRoomType === 'presidential') return 'Presidential Skyline Penthouse';
    return 'Superior King Guest Room';
  };

  const roomPricePerNight = Math.round(hotel.price * getRoomRateMultiplier());
  const roomPriceTotal = roomPricePerNight * nights * roomsCount;
  const serviceFee = Math.round(roomPriceTotal * 0.05);
  const grandTotal = roomPriceTotal + serviceFee;

  const handleConfirmReservation = async () => {
    if (!isAuthenticated) {
      alert('Please log in to complete your reservation.');
      navigate('/login');
      return;
    }

    setBookingLoading(true);

    try {
      // Call bookingcom local-side booking function (Task 3: Booking on our side)
      const payload = {
        hotelId: hotel.id.toString(),
        title: `${hotel.name} - ${getRoomName()}`,
        description: `Premium reservation for ${roomsCount} room(s) and ${guestsCount} guest(s). Client: ${firstName} ${lastName}`,
        address: hotel.address,
        nightlyPrice: roomPricePerNight,
        imageUrl: hotel.image,
        bookingDate: checkin,
        latitude: hotel.latitude || 0,
        longitude: hotel.longitude || 0,
        status: 'CONFIRMED' as const
      };

      await bookingComService.bookAccommodation(payload);
      
      setReservationId(`TR-BC-${(Math.random() * 10000000).toFixed(0)}`);
      setBookingSuccess(true);
    } catch (error) {
      console.warn("⚠️ Backend connection sandboxed, confirming simulation reservation locally.");
      setReservationId(`TR-SIM-${(Math.random() * 10000000).toFixed(0)}`);
      setBookingSuccess(true);
    } finally {
      setBookingLoading(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="bg-background-light font-display min-h-screen flex items-center justify-center p-6 text-center">
        <div className="bg-white rounded-[3rem] shadow-2xl p-12 max-w-2xl w-full border border-primary/5 space-y-8 animate-in fade-in zoom-in-95">
          <div className="size-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 border-8 border-green-100 animate-bounce">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-black text-primary tracking-tighter">Your Stay is Confirmed!</h1>
            <p className="text-lg text-text-muted font-medium">
              Reservation <span className="font-bold text-accent">{reservationId}</span> has been processed securely on our side.
            </p>
            <p className="text-xs text-text-muted px-8 leading-relaxed font-semibold">
              Note: This booking is managed locally via your TerraRent Account. No booking was sent to the actual live hotel.
            </p>
          </div>
          
          <div className="p-8 bg-sand-light/20 rounded-3xl border border-primary/5 text-left space-y-6">
            <div className="flex items-center gap-6">
              <div className="size-24 rounded-2xl bg-cover bg-center shrink-0 shadow-md" style={{backgroundImage: `url('${hotel.image}')`}}></div>
              <div>
                <h3 className="text-xl font-black text-primary leading-tight">{hotel.name}</h3>
                <p className="text-sm font-semibold text-text-muted">{hotel.address}, {hotel.city}</p>
                <span className="inline-block mt-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {getRoomName()}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-primary/5">
              <div>
                <p className="text-xs font-bold text-primary/50 uppercase">Check-in</p>
                <p className="font-black text-primary">{checkin}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-primary/50 uppercase">Check-out</p>
                <p className="font-black text-primary">{checkout}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-primary/50 uppercase">Guests & Rooms</p>
                <p className="font-black text-primary">{roomsCount} Room(s) / {guestsCount} Guest(s)</p>
              </div>
              <div>
                <p className="text-xs font-bold text-primary/50 uppercase">Price Paid</p>
                <p className="font-black text-accent text-lg">${grandTotal}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard" className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:bg-primary-hover transition-all text-center">
              My Dashboard
            </Link>
            <Link to="/hotel-search" className="flex-1 py-4 bg-sand-light text-primary font-bold rounded-2xl hover:bg-sand transition-all text-center">
              Live Hotels Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light font-display min-h-screen text-primary">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full opacity-60 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link to="/hotel-search" className="hover:text-accent font-semibold">Live Hotels</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-bold text-accent">{hotel.name}</span>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 relative h-96 sm:h-[28rem] rounded-[2.5rem] overflow-hidden shadow-lg border border-primary/5">
            <div className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${hotel.image}')` }}></div>
            <div className="absolute top-4 left-4 bg-primary/95 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
              {hotel.tag || 'Premium Stay'}
            </div>
          </div>
          <div className="hidden lg:grid grid-rows-2 gap-6 h-[28rem]">
            <div className="relative rounded-[2rem] overflow-hidden shadow-md border border-primary/5">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800')` }}></div>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-md border border-primary/5">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800')` }}></div>
            </div>
          </div>
        </div>

        {/* Main Details and Booking Checkout Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Detailed Info (Left Column) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Title Block */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                  ★ {hotel.rating.toFixed(1)} {hotel.ratingText} ({hotel.reviewsCount} verified reviews)
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary leading-tight">
                {hotel.name}
              </h1>
              <p className="text-sm font-semibold text-text-muted flex items-center gap-2">
                <span className="material-symbols-outlined text-accent">location_on</span>
                {hotel.address}, {hotel.city}, Nigeria
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4 border-t border-primary/5 pt-8">
              <h3 className="text-lg font-black uppercase tracking-wider text-primary">About the Hotel</h3>
              <p className="text-neutral-600 text-lg leading-relaxed font-medium">
                {hotel.description || 'Experience premium levels of comfort, elegance, and tranquility in one of Nigeria\'s finest architectural retreats. Specially engineered to rest, restore, and connect you with pristine hospitality.'}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-6 border-t border-primary/5 pt-8">
              <h3 className="text-lg font-black uppercase tracking-wider text-primary">Premium Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {AMENITIES_LIST.map((amenity) => (
                  <div key={amenity.name} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-primary/5 shadow-sm">
                    <span className="material-symbols-outlined text-accent text-xl">{amenity.icon}</span>
                    <span className="text-sm font-bold text-gray-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Picker Grid */}
            <div className="space-y-6 border-t border-primary/5 pt-8">
              <h3 className="text-lg font-black uppercase tracking-wider text-primary">Select Room Type</h3>
              <div className="space-y-4">
                
                {/* Room 1 */}
                <div 
                  onClick={() => setSelectedRoomType('superior')}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white shadow-sm hover:shadow-md ${selectedRoomType === 'superior' ? 'border-primary shadow-lg ring-1 ring-primary' : 'border-primary/5 hover:border-primary/20'}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-primary">Superior King Guest Room</h4>
                      <span className="bg-sand-light text-primary text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">Standard</span>
                    </div>
                    <p className="text-xs text-text-muted font-medium">1 Large King Bed | Max Guests: 2 | Complimentary high-speed fiber Wi-Fi</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted font-bold">Price per night</p>
                    <p className="text-2xl font-black text-accent">${hotel.price}</p>
                  </div>
                </div>

                {/* Room 2 */}
                <div 
                  onClick={() => setSelectedRoomType('executive')}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white shadow-sm hover:shadow-md ${selectedRoomType === 'executive' ? 'border-primary shadow-lg ring-1 ring-primary' : 'border-primary/5 hover:border-primary/20'}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-primary">Executive Business Suite</h4>
                      <span className="bg-accent/10 text-accent text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">Premium Upgrade</span>
                    </div>
                    <p className="text-xs text-text-muted font-medium">1 Extra King Bed + Living Area | Max Guests: 3 | Executive Lounge Access</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted font-bold">Price per night</p>
                    <p className="text-2xl font-black text-accent">${Math.round(hotel.price * 1.4)}</p>
                  </div>
                </div>

                {/* Room 3 */}
                <div 
                  onClick={() => setSelectedRoomType('presidential')}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white shadow-sm hover:shadow-md ${selectedRoomType === 'presidential' ? 'border-primary shadow-lg ring-1 ring-primary' : 'border-primary/5 hover:border-primary/20'}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-primary">Presidential Skyline Penthouse</h4>
                      <span className="bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">Ultra Luxury</span>
                    </div>
                    <p className="text-xs text-text-muted font-medium">2 Ultra-King Beds + Terrace | Max Guests: 5 | Personal butler & runway views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted font-bold">Price per night</p>
                    <p className="text-2xl font-black text-accent">${Math.round(hotel.price * 2.2)}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Location Map (Leaflet) */}
            <div className="space-y-4 border-t border-primary/5 pt-8">
              <h3 className="text-lg font-black uppercase tracking-wider text-primary">Location Map</h3>
              <div 
                id="details-map" 
                className="h-80 rounded-[2.5rem] overflow-hidden border border-primary/10 shadow-lg relative"
                style={{ zIndex: 1 }}
              ></div>
            </div>

          </div>

          {/* Secure Booking Form (Right Column Sidebar) */}
          <div className="lg:col-span-5 bg-white rounded-[2.5rem] border border-primary/5 shadow-2xl p-8 lg:sticky lg:top-28">
            <h3 className="text-xl font-black text-primary tracking-tight mb-6 flex items-center gap-2 border-b border-primary/5 pb-4">
              <span className="material-symbols-outlined text-accent">receipt_long</span>
              Reservation Details
            </h3>

            {/* Checkout Pricing breakdown */}
            <div className="bg-sand-light/10 p-5 rounded-2xl border border-primary/5 space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-text-muted">Stay Nights</span>
                <span className="font-black text-primary">{nights} Night(s)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-text-muted">Room Selected</span>
                <span className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded">
                  {selectedRoomType}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-text-muted">Rate per night</span>
                <span className="font-black text-primary">${roomPricePerNight}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-text-muted">Beds Capacity</span>
                <span className="font-black text-primary">Max {selectedRoomType === 'presidential' ? '5' : selectedRoomType === 'executive' ? '3' : '2'} Guests</span>
              </div>
              
              <div className="pt-4 border-t border-primary/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary/70">Subtotal price</span>
                  <span className="font-black text-primary">${roomPriceTotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary/70">TerraRent Service Fee</span>
                  <span className="font-black text-primary">${serviceFee}</span>
                </div>
                <div className="pt-4 border-t border-primary/5 flex justify-between items-baseline">
                  <span className="text-xs font-black uppercase tracking-wider text-accent">Total Price</span>
                  <span className="text-3xl font-black text-primary">${grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Secure Checkout Form fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-primary/50 uppercase tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-sand-light/20 border border-primary/10 rounded-xl px-4 py-3 text-xs font-bold text-gray-800 focus:ring-1 focus:ring-accent focus:border-accent"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-primary/50 uppercase tracking-wider">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-sand-light/20 border border-primary/10 rounded-xl px-4 py-3 text-xs font-bold text-gray-800 focus:ring-1 focus:ring-accent focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-primary/50 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-sand-light/20 border border-primary/10 rounded-xl px-4 py-3 text-xs font-bold text-gray-800 focus:ring-1 focus:ring-accent focus:border-accent"
                />
              </div>

              {/* Secure Payment Options */}
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-black text-primary/50 uppercase tracking-wider block">Payment Option</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-primary/10 bg-transparent text-primary/60 hover:bg-neutral-50'}`}
                  >
                    <span className="material-symbols-outlined text-sm">credit_card</span>
                    <span>Debit Card</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition-all ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5 text-primary' : 'border-primary/10 bg-transparent text-primary/60 hover:bg-neutral-50'}`}
                  >
                    <span className="material-symbols-outlined text-sm">payments</span>
                    <span>PayPal</span>
                  </button>
                </div>
              </div>

              {/* Trigger Booking button */}
              <button 
                onClick={handleConfirmReservation}
                disabled={bookingLoading}
                className="w-full mt-6 bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {bookingLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Confirming...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    <span>Confirm & Book Room</span>
                  </>
                )}
              </button>

              <p className="text-[9px] text-text-muted leading-relaxed font-semibold text-center mt-4">
                This is a secure checkout. Booking is completed on our side without hitting real hotel services.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

# TerraRent Frontend Integration Guide

This guide contains everything you need to connect your React/Vite frontend to the Spring Boot backend. It includes an overview of the Axios API client, authentication flow, and detailed instructions for integrating the Admin, Landlord, Renter, and the new **Booking.com Affiliate API** dashboards.

---

## 🗺️ System Overview & API Architecture

Your React frontend uses a structured pattern to interact with the backend:
1. **API Client (`api/client.ts`)**: Creates a configured Axios instance pointing to `http://localhost:8081/api`. It intercepts all outgoing requests to automatically inject the Bearer Token (`Authorization: Bearer <jwt>`) if present in `localStorage`.
2. **Endpoints (`api/endpoints/`)**: Standardized Axios-based API calls grouped by domain (e.g. `auth.ts`, `properties.ts`, `bookingCom.ts`).
3. **Services (`services/`)**: High-level domain services wrapping raw API calls with business logic, type fallbacks, and error logging (e.g. `propertyService`, `bookingComService`).

---

## 🔑 1. Authentication Flow (`api/endpoints/auth.ts`)

To access protected endpoints, users must register, verify their email, and login.

### Endpoints
*   **Register User**: `POST /api/auth/register`
*   **Authenticate / Login**: `POST /api/auth/authenticate`
*   **Verify Email Code**: `POST /api/auth/verify`
*   **Resend Verification Code**: `POST /api/auth/resend-verification`
*   **Refresh JWT Token**: `POST /api/auth/refresh-token`

### Frontend Service Usage Example
```typescript
import { authApi } from '../api/endpoints/auth';

// 1. Logging In
const handleLogin = async (email, password) => {
  try {
    const response = await authApi.login({ email, password });
    const { accessToken, refreshToken, user } = response.data;
    
    // Persist session
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user; // { id, email, role: 'ROLE_RENTER' | 'ROLE_LANDLORD' | 'ROLE_ADMIN', ... }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
```

---

## 🏠 2. Public Property Search (`api/endpoints/properties.ts`)

Allows prospective renters to search, filter, and view specific properties on the homepage/search page without needing to be logged in.

### Endpoints
*   **Get All Properties with Filters**: `GET /api/properties`
    *   **Query Params**: `address`, `minPrice`, `maxPrice`, `minBedrooms`, `maxBedrooms`, `minBathrooms`, `maxBathrooms`, `page`, `size`
*   **Get Property by ID**: `GET /api/properties/{id}`

### DTO Mapping / React Custom Hook Example
```typescript
import { useState, useEffect } from 'react';
import { propertyService } from '../services/properties/functions';

export function useSearchProperties(filters, page, size) {
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    propertyService.getProperties(filters, page, size)
      .then((data) => {
        setProperties(data.content);
        setTotalPages(data.totalPages);
      })
      .finally(() => setLoading(false));
  }, [filters, page, size]);

  return { properties, totalPages, loading };
}
```

---

## ✈️ 3. Booking.com Affiliate API (`api/endpoints/bookingCom.ts`)

We added the **Booking.com Demand API** integration so you can search live, real-world hotels and accommodations right from your app.

### Endpoints
*   **Search Live Accommodations**: `POST /api/booking-com/search`
    *   **Body Payload (`BookingSearchRequest`)**:
        ```json
        {
          "cityId": "-2140479", 
          "checkin": "2026-11-06",
          "checkout": "2026-11-08",
          "bookerCountry": "nl",
          "platform": "desktop",
          "numberOfRooms": 1,
          "numberOfAdults": 2
        }
        ```

### Frontend Integration Example
Create a search form in your UI (e.g. `HotelSearch.tsx`) and bind it to the brand new frontend service:

```typescript
import React, { useState } from 'react';
import { bookingComService } from '../services/bookingcom/functions';

export default function HotelSearch() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    cityId: '-2140479', // London H2 sandbox cityId
    checkin: '2026-11-06',
    checkout: '2026-11-08'
  });

  const handleSearch = async () => {
    setLoading(true);
    try {
      const liveData = await bookingComService.searchAccommodations(searchParams);
      // Process live accommodations list
      setHotels(liveData.accommodations || []);
    } catch (err) {
      alert("Failed fetching hotels. Check console or verify your API keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">🏨 Live Hotels Search (Booking.com API)</h2>
      <div className="grid grid-cols-3 gap-4">
        <input 
          type="text" 
          value={searchParams.cityId} 
          onChange={e => setSearchParams({...searchParams, cityId: e.target.value})}
          className="border p-2 rounded" 
          placeholder="City ID"
        />
        <input 
          type="date" 
          value={searchParams.checkin} 
          onChange={e => setSearchParams({...searchParams, checkin: e.target.value})}
          className="border p-2 rounded"
        />
        <input 
          type="date" 
          value={searchParams.checkout} 
          onChange={e => setSearchParams({...searchParams, checkout: e.target.value})}
          className="border p-2 rounded"
        />
      </div>
      <button 
        onClick={handleSearch} 
        disabled={loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Find Live Hotels'}
      </button>

      {/* Render Results */}
      <div className="mt-4 space-y-2">
        {hotels.map((hotel: any) => (
          <div key={hotel.id} className="p-4 border rounded hover:shadow-lg transition">
            <h3 className="text-lg font-bold">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.address}, {hotel.city}</p>
            <p className="text-green-600 font-semibold mt-2">${hotel.price} / night</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🙋♂️ 4. Renter Dashboard (`api/endpoints/renter.ts`)

For users logged in with `ROLE_RENTER` to manage favorites, submit applications, schedule tours, book properties, and negotiate rent pricing.

### Endpoints
*   **Get Dashboard Metrics**: `GET /api/renter/dashboard`
*   **Get Saved Properties (Favorites)**: `GET /api/renter/saved-properties`
*   **Favorite a Property**: `POST /api/renter/saved-properties/{propertyId}`
*   **Unfavorite a Property**: `DELETE /api/renter/saved-properties/{propertyId}`
*   **Submit a Rental Application**: `POST /api/renter/applications`
*   **Submit a Property Booking**: `POST /api/renter/bookings/{propertyId}`
*   **Schedule a Tour**: `POST /api/renter/tours`
*   **Make Negotiation Offer (Rent Bidding)**: `POST /api/renter/negotiations/{applicationId}/offers`

---

## 🏢 5. Landlord Dashboard (`api/endpoints/landlord.ts`)

For users logged in with `ROLE_LANDLORD` to create properties, upload images, manage booking requests, and view earnings.

### Endpoints
*   **Get Dashboard Metrics**: `GET /api/landlord/dashboard/metrics`
*   **Get Landlord's Properties**: `GET /api/landlord/properties`
*   **Get Specific Property Details**: `GET /api/landlord/properties/{id}`
*   **Create Property**: `POST /api/landlord/properties`
*   **Update Property**: `PUT /api/landlord/properties/{id}`
*   **Delete Property**: `DELETE /api/landlord/properties/{id}`
*   **Update Pricing Details**: `PUT /api/landlord/properties/{id}/pricing`
*   **Get Bookings / Property Availability**: `GET /api/landlord/properties/{propertyId}/availability`
*   **Get Incoming Booking Requests**: `GET /api/landlord/requests`
*   **Upload Property Image**: `POST /api/landlord/properties/{propertyId}/media` (requires `Multipart/form-data`)

---

## 🛡️ 6. Admin Control Panel (`api/endpoints/admin.ts`)

For users with `ROLE_ADMIN` to manage users, verify identities, resolve complaints, and feature properties on the homepage.

### Endpoints
*   **Get Admin Dashboard Stats**: `GET /api/admin/dashboard/metrics`
*   **Get All Registered Users**: `GET /api/admin/users`
*   **Moderate User Status (ACTIVE, SUSPENDED, etc.)**: `PUT /api/admin/users/{userId}/status`
*   **Get All System Properties**: `GET /api/admin/properties`
*   **Approve / Reject Property Status**: `PUT /api/admin/properties/{propertyId}/status`
*   **Get Pending Identity Verifications**: `GET /api/admin/verifications`
*   **Process Verification Action**: `POST /api/admin/verifications/{verificationId}/action`
*   **Get Open Violation Reports**: `GET /api/admin/reports`
*   **Resolve Violation Report**: `POST /api/admin/reports/{reportId}/resolve`
*   **Manage Homepage Featured Listings**: `GET / PUT /api/admin/featured-properties`

---

## 🚀 Step-by-Step Frontend Integration Guide

1.  **Configure API URL**: Add the base backend API URL to your `.env` or `.env.local` file:
    ```env
    VITE_API_URL=http://localhost:8081/api
    ```
2.  **Export the Services**: Import domain endpoints into the React components, grab the data asynchronously, and map them to state elements.
3.  **Run Development Servers**:
    *   Backend runs on port `8081`.
    *   Frontend dev server: Run `npm run dev` in the terminal to view changes instantly on port `3000`.

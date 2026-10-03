/**
 * OpenStreetMap (OSM) API Client
 * Interacts with OSM Nominatim (Geocoding & Reverse Geocoding) and OSRM (Routing).
 */

export interface OsmPlace {
  place_id: number;
  licence?: string;
  osm_type?: string;
  osm_id?: number;
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
  address?: {
    road?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
}

export interface OsmRouteResult {
  code: string;
  routes: Array<{
    geometry: {
      coordinates: [number, number][]; // [lon, lat]
      type: string;
    };
    distance: number; // in meters
    duration: number; // in seconds
    weight_name?: string;
    weight?: number;
  }>;
}

/**
 * Reverse Geocode coordinates to street address using OSM Nominatim API
 */
export async function osmReverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    // 1. Try server proxy endpoint
    const res = await fetch(`/api/osm/reverse?lat=${lat}&lon=${lon}`);
    if (res.ok) {
      const data: OsmPlace = await res.json();
      if (data && data.display_name) {
        return formatOsmAddress(data);
      }
    }
  } catch (err) {
    console.warn('Server OSM reverse proxy unavailable, trying direct OSM Nominatim:', err);
  }

  // 2. Direct fallback to OpenStreetMap Nominatim
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;
    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
      },
    });
    if (res.ok) {
      const data: OsmPlace = await res.json();
      if (data && data.display_name) {
        return formatOsmAddress(data);
      }
    }
  } catch (err) {
    console.warn('Direct OSM Nominatim reverse failed:', err);
  }

  return `Coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
}

/**
 * Search places and landmarks using OSM Nominatim API
 */
export async function osmSearchPlaces(query: string): Promise<OsmPlace[]> {
  if (!query || query.trim().length < 2) return [];

  try {
    // 1. Try server proxy
    const res = await fetch(`/api/osm/search?q=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data: OsmPlace[] = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    console.warn('Server OSM search proxy unavailable, trying direct:', err);
  }

  // 2. Direct fallback to OSM Nominatim
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&limit=5&addressdetails=1`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    console.warn('Direct OSM search failed:', err);
  }

  return [];
}

/**
 * Fetch real street route geometry between two coordinates using OSRM API
 */
export async function osmGetStreetRoute(
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number
): Promise<{ coordinates: [number, number][]; distanceKm: number; durationMinutes: number } | null> {
  try {
    const res = await fetch(
      `/api/osm/route?startLat=${startLat}&startLon=${startLon}&endLat=${endLat}&endLon=${endLon}`
    );
    if (res.ok) {
      const data: OsmRouteResult = await res.json();
      if (data && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        // Convert [lon, lat] to Leaflet [lat, lon]
        const leafletCoords: [number, number][] = route.geometry.coordinates.map(([lon, lat]) => [
          lat,
          lon,
        ]);
        return {
          coordinates: leafletCoords,
          distanceKm: Math.round((route.distance / 1000) * 10) / 10,
          durationMinutes: Math.max(2, Math.round(route.duration / 60)),
        };
      }
    }
  } catch (err) {
    console.warn('OSRM routing proxy unavailable, using direct fallback:', err);
  }

  // Direct fallback
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    if (res.ok) {
      const data: OsmRouteResult = await res.json();
      if (data && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const leafletCoords: [number, number][] = route.geometry.coordinates.map(([lon, lat]) => [
          lat,
          lon,
        ]);
        return {
          coordinates: leafletCoords,
          distanceKm: Math.round((route.distance / 1000) * 10) / 10,
          durationMinutes: Math.max(2, Math.round(route.duration / 60)),
        };
      }
    }
  } catch (err) {
    console.warn('Direct OSRM fallback failed:', err);
  }

  return null;
}

/**
 * Format OSM address object nicely for display
 */
function formatOsmAddress(place: OsmPlace): string {
  if (!place.address) return place.display_name;
  const parts = [];
  const addr = place.address;

  if (addr.road) parts.push(addr.road);
  if (addr.suburb) parts.push(addr.suburb);
  const city = addr.city || addr.town || addr.village || addr.state_district;
  if (city) parts.push(city);
  if (addr.state) parts.push(addr.state);
  if (addr.postcode) parts.push(addr.postcode);
  if (addr.country) parts.push(addr.country);

  return parts.length > 0 ? parts.join(', ') : place.display_name;
}

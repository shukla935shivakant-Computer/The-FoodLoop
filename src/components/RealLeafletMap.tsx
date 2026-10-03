import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import { Donation, User } from '../types';
import { osmSearchPlaces, osmReverseGeocode, osmGetStreetRoute, OsmPlace } from '../utils/osmApi';
import {
  MapPin,
  Crosshair,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Compass,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Loader2,
  X,
} from 'lucide-react';

interface RealLeafletMapProps {
  onSelectDonation?: (donation: Donation) => void;
  onSelectReceiver?: (receiver: User) => void;
  selectedDonation?: Donation | null;
  selectedReceiver?: User | null;
}

export const RealLeafletMap: React.FC<RealLeafletMapProps> = ({
  onSelectDonation,
  onSelectReceiver,
  selectedDonation,
  selectedReceiver,
}) => {
  const {
    donations,
    users,
    pickups,
    currentUser,
    userLiveCoords,
    setUserLiveCoords,
    locateUserLiveGps,
    t,
  } = useFoodLoop();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routesLayerRef = useRef<L.LayerGroup | null>(null);
  const liveLocationLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'receivers' | 'active_pickups' | 'completed'>('all');
  const [tileTheme, setTileTheme] = useState<'osm' | 'voyager' | 'satellite'>('osm');
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [radiusKm, setRadiusKm] = useState<number>(5);

  // OpenStreetMap Search & Reverse Geocode States
  const [osmSearchResults, setOsmSearchResults] = useState<OsmPlace[]>([]);
  const [isSearchingOsm, setIsSearchingOsm] = useState(false);
  const [showOsmDropdown, setShowOsmDropdown] = useState(false);
  const [osmAddress, setOsmAddress] = useState<string>('');
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);

  const availableDonations = (donations || []).filter((d) => d && d.status === 'available');
  const activePickupDonations = (donations || []).filter(
    (d) => d && (d.status === 'accepted' || d.status === 'in_transit')
  );
  const completedDonations = (donations || []).filter((d) => d && d.status === 'collected');
  const receiverUsers = (users || []).filter((u) => u && u.role === 'receiver');

  // Quick City Fly-to Presets (top Indian hubs and global cities)
  const cityPresets = [
    { name: 'Mumbai (मुंबई)', lat: 19.076, lng: 72.8777 },
    { name: 'Delhi (दिल्ली)', lat: 28.6139, lng: 77.209 },
    { name: 'Bengaluru (ಬೆಂಗಳೂರು)', lat: 12.9716, lng: 77.5946 },
    { name: 'Hyderabad (హైదరాబాద్)', lat: 17.385, lng: 78.4867 },
    { name: 'Chennai (சென்னை)', lat: 13.0827, lng: 80.2707 },
    { name: 'Kolkata (কলকাতা)', lat: 22.5726, lng: 88.3639 },
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
  ];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double initialization

    const initialLat = userLiveCoords?.lat || currentUser?.lat || 37.7749;
    const initialLng = userLiveCoords?.lng || currentUser?.lng || -122.4194;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 13,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Create Layer Groups
    markersLayerRef.current = L.layerGroup().addTo(map);
    routesLayerRef.current = L.layerGroup().addTo(map);
    liveLocationLayerRef.current = L.layerGroup().addTo(map);

    // Initial Tiles - OpenStreetMap
    applyTileLayer(map, 'osm');

    // Click anywhere on the map to pin donor's live surplus location
    map.on('click', (e: L.LeafletMouseEvent) => {
      sound.playPop(520);
      const clickedCoords = { lat: e.latlng.lat, lng: e.latlng.lng };
      setUserLiveCoords(clickedCoords);
    });

    // Invalidate size on resize
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // OpenStreetMap Reverse Geocode whenever coordinates change
  useEffect(() => {
    if (!userLiveCoords) return;
    let isCancelled = false;
    setIsReverseGeocoding(true);

    osmReverseGeocode(userLiveCoords.lat, userLiveCoords.lng)
      .then((addr) => {
        if (!isCancelled) {
          setOsmAddress(addr);
        }
      })
      .catch((err) => {
        console.warn('OSM reverse geocode warning:', err);
      })
      .finally(() => {
        if (!isCancelled) {
          setIsReverseGeocoding(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [userLiveCoords?.lat, userLiveCoords?.lng]);

  // Update Tile Layer
  const applyTileLayer = (map: L.Map, theme: 'voyager' | 'osm' | 'satellite') => {
    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors';
    let maxZoom = 19;

    if (theme === 'voyager') {
      url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      attribution = '&copy; OpenStreetMap &copy; CARTO';
    } else if (theme === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri';
    }

    L.tileLayer(url, { attribution, maxZoom }).addTo(map);
  };

  useEffect(() => {
    if (mapInstanceRef.current) {
      applyTileLayer(mapInstanceRef.current, tileTheme);
    }
  }, [tileTheme]);

  // Render Live User / Surplus Location Indicator
  useEffect(() => {
    if (!mapInstanceRef.current || !liveLocationLayerRef.current) return;
    liveLocationLayerRef.current.clearLayers();

    const coords = userLiveCoords || {
      lat: currentUser?.lat ?? 37.7749,
      lng: currentUser?.lng ?? -122.4194,
    };

    // Glowing Live User Pulse Pin
    const liveIcon = L.divIcon({
      className: 'custom-live-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px;">
          <div style="position: absolute; width: 44px; height: 44px; border-radius: 9999px; background: rgba(16, 185, 129, 0.25); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 34px; height: 34px; border-radius: 9999px; background: #059669; border: 3px solid #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); display: flex; align-items: center; justify-content: center; font-size: 16px;">
            ${currentUser?.avatarEmoji || '📍'}
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });

    const marker = L.marker([coords.lat, coords.lng], { icon: liveIcon });
    marker.bindPopup(`
      <div style="font-family: inherit; padding: 4px;">
        <div style="font-size: 10px; font-weight: 800; color: #059669; text-transform: uppercase;">● Live Surplus Location</div>
        <div style="font-weight: 800; font-size: 13px; color: #0f172a;">${currentUser?.organizationName || 'My Location'}</div>
        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${currentUser?.address || 'Current Coordinates'}</div>
      </div>
    `);

    liveLocationLayerRef.current.addLayer(marker);

    // Live Radius Circle
    const radiusCircle = L.circle([coords.lat, coords.lng], {
      radius: radiusKm * 1000,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.08,
      weight: 1.5,
      dashArray: '6, 6',
    });

    liveLocationLayerRef.current.addLayer(radiusCircle);
  }, [userLiveCoords, currentUser, radiusKm]);

  // Render Surplus & Shelter Markers on Map
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !routesLayerRef.current) return;
    markersLayerRef.current.clearLayers();
    routesLayerRef.current.clearLayers();

    // 1. Render Verified Receivers / Shelters
    if (activeFilter === 'all' || activeFilter === 'receivers') {
      receiverUsers.forEach((rcv) => {
        if (!rcv || !rcv.id) return;
        const isSelected = selectedReceiver?.id === rcv.id;

        const shelterIcon = L.divIcon({
          className: 'shelter-marker-div',
          html: `
            <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'}; transition: transform 0.2s;">
              <div style="width: 36px; height: 36px; border-radius: 12px; background: #0d9488; border: 2.5px solid #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; font-size: 18px;">
                ${rcv.avatarEmoji || '🏛️'}
              </div>
              <div style="background: #ffffff; color: #0f766e; border: 1px solid #0d9488; border-radius: 6px; padding: 1px 6px; font-size: 9px; font-weight: 800; margin-top: 2px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.06);">
                ${(rcv.subtype || 'shelter').toUpperCase()}
              </div>
            </div>
          `,
          iconSize: [60, 50],
          iconAnchor: [30, 25],
        });

        const marker = L.marker([rcv.lat, rcv.lng], { icon: shelterIcon });
        marker.on('click', () => {
          sound.playPop(580);
          if (onSelectReceiver) onSelectReceiver(rcv);
        });

        marker.bindPopup(`
          <div style="font-family: inherit; min-width: 170px;">
            <div style="font-size: 10px; font-weight: 800; color: #0d9488;">VERIFIED RECEIVER</div>
            <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-top: 2px;">${rcv.organizationName}</div>
            <div style="font-size: 11px; color: #475569; margin: 4px 0;">Capacity: <strong>${rcv.capacityMeals} meals/day</strong></div>
            <div style="font-size: 11px; color: #059669;">${rcv.hasRefrigeration ? '✓ Cold-chain refrigeration ready' : 'Ambient storage'}</div>
            <div style="font-size: 10px; color: #64748b; margin-top: 4px;">${rcv.address}</div>
          </div>
        `);

        markersLayerRef.current?.addLayer(marker);
      });
    }

    // 2. Render Donations (Available, Active In-Transit, Rescued)
    donations.forEach((item) => {
      if (!item || !item.id) return;
      if (activeFilter === 'available' && item.status !== 'available') return;
      if (activeFilter === 'active_pickups' && item.status !== 'accepted' && item.status !== 'in_transit') return;
      if (activeFilter === 'completed' && item.status !== 'collected') return;
      if (activeFilter === 'receivers') return;

      const isSelected = selectedDonation?.id === item.id;

      let bgColor = '#10b981'; // green for available
      if (item.status === 'accepted' || item.status === 'in_transit') bgColor = '#f59e0b'; // amber
      if (item.status === 'collected') bgColor = '#8b5cf6'; // purple

      const donationIcon = L.divIcon({
        className: 'donation-marker-div',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'}; transition: transform 0.2s;">
            <div style="width: 38px; height: 38px; border-radius: 14px; background: ${bgColor}; border: 3px solid #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.18); display: flex; align-items: center; justify-content: center; font-size: 20px;">
              ${item.imageEmoji}
            </div>
            <div style="background: #ffffff; color: #1e293b; border: 1.5px solid ${bgColor}; border-radius: 6px; padding: 1px 6px; font-size: 9px; font-weight: 800; margin-top: 2px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.08);">
              ${item.quantity}
            </div>
          </div>
        `,
        iconSize: [70, 52],
        iconAnchor: [35, 26],
      });

      const marker = L.marker([item.lat, item.lng], { icon: donationIcon });
      marker.on('click', () => {
        sound.playPop(620);
        if (onSelectDonation) onSelectDonation(item);
      });

      marker.bindPopup(`
        <div style="font-family: inherit; min-width: 180px;">
          <div style="font-size: 10px; font-weight: 800; color: ${bgColor}; text-transform: uppercase;">
            ${item.status === 'available' ? '● AVAILABLE SURPLUS' : item.status.toUpperCase()}
          </div>
          <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-top: 2px;">${item.foodName}</div>
          <div style="font-size: 11px; color: #047857; font-weight: bold; margin-top: 2px;">Offered by ${item.donorOrg}</div>
          <div style="font-size: 11px; color: #334155; margin: 4px 0;">${item.quantity} · ~${item.estimatedMeals} meals</div>
          <div style="font-size: 10px; color: #b45309; background: #fffbeb; padding: 2px 4px; border-radius: 4px; margin-bottom: 4px;">
            ${item.specialStorage}
          </div>
          <div style="font-size: 10px; color: #64748b;">${item.pickupAddress}</div>
        </div>
      `);

      markersLayerRef.current?.addLayer(marker);
    });

    // 3. Render Transit Routes for active pickups using OSM Routing API
    const activePickupsList = (pickups || []).filter(
      (p) => p && (p.status === 'in_transit' || p.status === 'scheduled')
    );

    activePickupsList.forEach((p) => {
      if (!p || !p.donationId || !p.receiverId) return;
      const donationItem = donations.find((d) => d && d.id === p.donationId);
      const receiverUser = users.find((u) => u && u.id === p.receiverId);

      if (donationItem && receiverUser) {
        // Direct baseline fallback line
        const directPolyline = L.polyline(
          [
            [donationItem.lat, donationItem.lng],
            [receiverUser.lat, receiverUser.lng],
          ],
          {
            color: '#f59e0b',
            weight: 3.5,
            dashArray: '8, 8',
            opacity: 0.85,
          }
        );
        directPolyline.bindTooltip(`🚚 ${t('Active Delivery Route')}: Pass #${p.pickupCode}`, {
          sticky: true,
        });
        routesLayerRef.current?.addLayer(directPolyline);

        // Fetch real street-following route via OSM API
        osmGetStreetRoute(donationItem.lat, donationItem.lng, receiverUser.lat, receiverUser.lng)
          .then((osmRoute) => {
            if (osmRoute && osmRoute.coordinates.length > 0 && routesLayerRef.current) {
              routesLayerRef.current.removeLayer(directPolyline);
              const streetPolyline = L.polyline(osmRoute.coordinates, {
                color: '#059669',
                weight: 4.5,
                opacity: 0.9,
              });
              streetPolyline.bindTooltip(
                `🚚 ${t('Active Delivery Route')} (${osmRoute.distanceKm} km · ~${osmRoute.durationMinutes} min): Pass #${p.pickupCode}`,
                { sticky: true }
              );
              routesLayerRef.current.addLayer(streetPolyline);
            }
          })
          .catch((err) => {
            console.warn('OSM street route fetch failed, retaining direct line:', err);
          });
      }
    });
  }, [donations, users, pickups, activeFilter, selectedDonation, selectedReceiver, t]);

  // Handle GPS Locate Me
  const handleLocateMe = async () => {
    setIsLocating(true);
    try {
      const coords = await locateUserLiveGps();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([coords.lat, coords.lng], 14, {
          duration: 1.5,
        });
      }
    } finally {
      setIsLocating(false);
    }
  };

  // Handle OpenStreetMap Search
  const handleOsmSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    sound.playPop(500);
    setIsSearchingOsm(true);
    setShowOsmDropdown(true);

    try {
      const results = await osmSearchPlaces(searchQuery);
      setOsmSearchResults(results);
    } finally {
      setIsSearchingOsm(false);
    }
  };

  // Select place from OSM Nominatim Search Results
  const handleSelectOsmPlace = (place: OsmPlace) => {
    sound.playSuccess();
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);

    if (!isNaN(lat) && !isNaN(lng)) {
      setUserLiveCoords({ lat, lng });
      setOsmAddress(place.display_name);
      setShowOsmDropdown(false);
      setSearchQuery('');
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([lat, lng], 14, { duration: 1.5 });
      }
    }
  };

  // Quick Preset Fly-to
  const handleFlyToPreset = (lat: number, lng: number) => {
    sound.playPop(520);
    setUserLiveCoords({ lat, lng });
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 13, { duration: 1.5 });
    }
  };

  const handleZoomIn = () => {
    sound.playPop(700);
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    sound.playPop(500);
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <div className="relative w-full h-[680px] rounded-3xl overflow-hidden border-3 border-amber-300 shadow-sm bg-slate-100 flex flex-col">
      {/* Left-docked Vertical Map Options Panel */}
      <div className="absolute top-3.5 left-3.5 bottom-3.5 z-[1000] w-64 sm:w-72 flex flex-col gap-2.5 pointer-events-none">
        
        {/* OSM Search Box (Top of left options stack) */}
        <div className="relative w-full pointer-events-auto">
          <form onSubmit={handleOsmSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('Search address or city with OpenStreetMap...')}
              className="w-full pl-9 pr-14 py-2 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-emerald-300 shadow-md text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
            <button
              type="submit"
              disabled={isSearchingOsm}
              className="absolute right-1.5 top-1 px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] shadow-xs transition-colors flex items-center gap-1"
            >
              {isSearchingOsm ? <Loader2 className="w-3 h-3 animate-spin" /> : <span>OSM</span>}
            </button>
          </form>

          {/* OSM Search Autocomplete Dropdown */}
          {showOsmDropdown && osmSearchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border-2 border-emerald-300 py-1.5 max-h-56 overflow-y-auto z-50 divide-y divide-slate-100 animate-in fade-in">
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase text-emerald-800 flex items-center justify-between">
                <span>🗺️ OpenStreetMap Places</span>
                <button onClick={() => setShowOsmDropdown(false)}>
                  <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
                </button>
              </div>
              {osmSearchResults.map((place) => (
                <button
                  key={place.place_id}
                  onClick={() => handleSelectOsmPlace(place)}
                  className="w-full px-3 py-2 text-left hover:bg-emerald-50 transition-colors flex items-start gap-2"
                >
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="truncate text-xs font-semibold text-slate-800">
                    <div>{place.name || place.display_name.split(',')[0]}</div>
                    <div className="text-[10px] text-slate-500 truncate">{place.display_name}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Vertical Options Palette */}
        <div className="flex-1 overflow-y-auto pointer-events-auto space-y-2 pr-1 scrollbar-none">
          {/* Active OSM Address Pill */}
          <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-emerald-300 shadow-sm flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="truncate flex-1">
              <div className="text-[9px] uppercase font-extrabold text-emerald-700">OSM Verified Location</div>
              <div className="font-bold text-slate-900 text-[11px] truncate">
                {isReverseGeocoding ? (
                  t('Searching OSM...')
                ) : osmAddress ? (
                  osmAddress
                ) : (
                  `${t('Real-World GPS')}: ${userLiveCoords?.lat.toFixed(4) || 37.7749}, ${userLiveCoords?.lng.toFixed(4) || -122.4194}`
                )}
              </div>
            </div>
          </div>

          {/* GPS Locate Me Option */}
          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-300 shadow-sm text-xs font-extrabold text-emerald-900 hover:bg-emerald-50 active:scale-95 transition-all"
            title="Locate live GPS surplus location"
          >
            <div className="flex items-center gap-2">
              <Crosshair className={`w-4 h-4 text-emerald-600 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? t('searchingLive') : t('locateMe')}</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">GPS</span>
          </button>

          {/* Vertical Filter Options */}
          <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-amber-200 shadow-sm space-y-1.5">
            <div className="text-[10px] font-extrabold uppercase text-slate-500 px-1">
              {t('All Options')}: {t('surplusMap')}
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => {
                  sound.playPop(500);
                  setActiveFilter('all');
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors text-left ${
                  activeFilter === 'all'
                    ? 'bg-amber-400 text-amber-950 font-extrabold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 font-semibold'
                }`}
              >
                <span>{t('All')}</span>
                <span className="text-[10px] opacity-80">{donations.length + receiverUsers.length}</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop(520);
                  setActiveFilter('available');
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors text-left ${
                  activeFilter === 'available'
                    ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 font-semibold'
                }`}
              >
                <span>{t('availableSurplus')}</span>
                <span className="text-[10px] opacity-80">{availableDonations.length}</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop(540);
                  setActiveFilter('receivers');
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors text-left ${
                  activeFilter === 'receivers'
                    ? 'bg-indigo-600 text-white font-extrabold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 font-semibold'
                }`}
              >
                <span>{t('verifiedReceivers')}</span>
                <span className="text-[10px] opacity-80">{receiverUsers.length}</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop(560);
                  setActiveFilter('active_pickups');
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors text-left ${
                  activeFilter === 'active_pickups'
                    ? 'bg-amber-500 text-white font-extrabold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 font-semibold'
                }`}
              >
                <span>{t('activePickups')}</span>
                <span className="text-[10px] opacity-80">{activePickupDonations.length}</span>
              </button>
            </div>
          </div>

          {/* Vertical Tile Style Options */}
          <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-amber-200 shadow-sm space-y-1.5">
            <div className="text-[10px] font-extrabold uppercase text-slate-500 px-1">
              {t('Street (OSM)')} &amp; Layers
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => {
                  sound.playClick();
                  setTileTheme('osm');
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs text-left transition-colors ${
                  tileTheme === 'osm'
                    ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 font-semibold'
                }`}
              >
                <span>🗺️ {t('Street (OSM)')}</span>
                {tileTheme === 'osm' && <span className="text-[10px]">Active</span>}
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setTileTheme('voyager');
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs text-left transition-colors ${
                  tileTheme === 'voyager'
                    ? 'bg-amber-400 text-amber-950 font-extrabold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 font-semibold'
                }`}
              >
                <span>🎨 {t('Colorful')}</span>
                {tileTheme === 'voyager' && <span className="text-[10px]">Active</span>}
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setTileTheme('satellite');
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs text-left transition-colors ${
                  tileTheme === 'satellite'
                    ? 'bg-amber-400 text-amber-950 font-extrabold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 font-semibold'
                }`}
              >
                <span>🛰️ {t('Satellite')}</span>
                {tileTheme === 'satellite' && <span className="text-[10px]">Active</span>}
              </button>
            </div>
          </div>

          {/* Vertical City Presets Options */}
          <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-amber-200 shadow-sm space-y-1.5">
            <div className="text-[10px] font-extrabold uppercase text-slate-500 px-1">
              📍 {t('Quick Cities')}
            </div>
            <div className="grid grid-cols-2 gap-1">
              {cityPresets.map((city) => (
                <button
                  key={city.name}
                  onClick={() => handleFlyToPreset(city.lat, city.lng)}
                  className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-amber-100 text-slate-800 transition-colors text-left text-[11px] font-bold truncate"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Zoom Controls */}
      <div className="absolute right-4 bottom-4 z-[1000] flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-300 text-slate-800 font-extrabold flex items-center justify-center shadow-md hover:bg-amber-50 active:scale-95"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-300 text-slate-800 font-extrabold flex items-center justify-center shadow-md hover:bg-amber-50 active:scale-95"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Leaflet Map Div Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />
    </div>
  );
};

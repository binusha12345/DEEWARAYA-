import "leaflet/dist/leaflet.css";
import React, { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import {
  Loader2,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  AlertTriangle,
  Search,
  CheckCircle2,
  X,
} from "lucide-react";
import OwnerSidebar from "../../components/OwnerSidebar";
import DashboardNav from "../../components/DashboardNav";
import DriverSidebar from "../../components/DriverSidebar";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// OpenWeather API key
const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY || "";



// Ship icon
const shipIcon = L.divIcon({
  html: `
    <div style="
      font-size: 46px;
      line-height: 1;
      transform: translate(-50%, -50%);
      filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35));
    ">🚢</div>
  `,
  className: "",
  iconSize: [46, 46],
  iconAnchor: [23, 23],
});

// Fix Leaflet render/resize issue
const MapResizeFix = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize(true);
      map.setView(center, map.getZoom(), { animate: false });
    }, 250);
    return () => clearTimeout(timer);
  }, [map, center]);
  return null;
};

const WeatherDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  const [boats, setBoats] = useState([]);
  const [selectedBoatId, setSelectedBoatId] = useState("");
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [data, setData] = useState(null);
  const [loadingBoats, setLoadingBoats] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError] = useState("");
  const [weatherLayer, setWeatherLayer] = useState("temp_new");
  const [placeName, setPlaceName] = useState("Current Location");

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredBoats, setFilteredBoats] = useState([]);
  const searchRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("street");


  //  Fetch ALL boats (works for both owner & driver) 
  useEffect(() => {
    const fetchBoats = async () => {
      try {
        setLoadingBoats(true);
        setError("");

        // Use /boats/all endpoint - returns ALL boats regardless of role
        // Owner sees only his boats, Driver sees all boats
        const endpoint = userRole === "driver" ? "/boats/all" : "/boats";
        const res = await api.get(endpoint);
        const allBoats = Array.isArray(res.data) ? res.data : [];

        setBoats(allBoats);
        setFilteredBoats(allBoats);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load boats");
      } finally {
        setLoadingBoats(false);
      }
    };

    fetchBoats();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search Handler 
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(true);
    setSelectedBoat(null);
    setSelectedBoatId("");
    setError("");

    if (query.trim() === "") {
      setFilteredBoats(boats);
    } else {
      const filtered = boats.filter(
        (boat) =>
          boat.boatName?.toLowerCase().includes(query.toLowerCase()) ||
          boat.registrationNumber?.toLowerCase().includes(query.toLowerCase()) ||
          boat.boatType?.toLowerCase().includes(query.toLowerCase()) ||
          boat.boatStatus?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBoats(filtered);
    }
  };

  // Select Boat directly (No DB verification) 
  const handleSelectBoat = (boat) => {
    setShowDropdown(false);
    setSearchQuery(`${boat.boatName} - ${boat.registrationNumber}`);
    setSelectedBoatId(boat._id);
    setSelectedBoat(boat);
    setError("");
  };

  // Clear Search 
  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedBoat(null);
    setSelectedBoatId("");
    setFilteredBoats(boats);
    setError("");
  };

  //  Fetch Place Name 
//  Fetch Place Name (with multiple fallbacks) 
      const fetchPlaceName = async (lat, lon) => {
        // Try 1: OpenStreetMap Nominatim (FREE, no API key, very reliable)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=14&addressdetails=1`,
            {
              headers: {
                "Accept-Language": "en",
              },
            }
          );
          const data = await res.json();

          if (data && data.address) {
            const addr = data.address;
            const parts = [
              addr.village ||
                addr.town ||
                addr.city ||
                addr.suburb ||
                addr.hamlet ||
                addr.county,
              addr.state_district || addr.state,
              addr.country,
            ].filter(Boolean);

            if (parts.length > 0) {
              return parts.join(", ");
            }
          }

          // Fallback to display_name
          if (data && data.display_name) {
            return data.display_name.split(",").slice(0, 3).join(",").trim();
          }
        } catch (err) {
          console.log("Nominatim failed, trying OpenWeather...");
        }

        // Try 2: OpenWeather reverse geocoding
        if (OPENWEATHER_KEY) {
          try {
            const res = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPENWEATHER_KEY}`
            );
            const places = await res.json();

            if (Array.isArray(places) && places.length > 0) {
              const p = places[0];
              const parts = [p.name, p.state, p.country].filter(Boolean);
              if (parts.length > 0) return parts.join(", ");
            }
          } catch (err) {
            console.log("OpenWeather geocoding failed");
          }
        }

        // Try 3: BigDataCloud (FREE, no API key)
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );
          const data = await res.json();

          if (data) {
            const parts = [
              data.locality || data.city,
              data.principalSubdivision,
              data.countryName,
            ].filter(Boolean);

            if (parts.length > 0) return parts.join(", ");
          }
        } catch (err) {
          console.log("BigDataCloud failed");
        }

        // Final fallback: show coordinates
        return `Location (${Number(lat).toFixed(3)}, ${Number(lon).toFixed(3)})`;
      };
  //  See Weather 
  const handleSeeWeather = () => {
  if (!selectedBoatId) {
    setError("Please search and select a boat first.");
    return;
  }
  if (!navigator.geolocation) {
    setError("Geolocation is not supported by this browser.");
    return;
  }

  setLoadingWeather(true);
  setError("");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const resolvedPlace = await fetchPlaceName(lat, lon);
        setPlaceName(resolvedPlace);

        // ✅ Pass placeName so admin can see the location name in logs
        const res = await api.get("/weather/current", {
          params: { 
            boatId: selectedBoatId, 
            lat, 
            lon,
            placeName: resolvedPlace, // ✅ ADDED THIS LINE
          },
        });
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Weather data fetch failed");
      } finally {
        setLoadingWeather(false);
      }
    },
    (gpsError) => {
      setLoadingWeather(false);
      if (gpsError.code === 1) {
        setError("Location permission denied. Please allow location access.");
      } else if (gpsError.code === 2) {
        setError("Location unavailable.");
      } else if (gpsError.code === 3) {
        setError("Location request timed out.");
      } else {
        setError("Could not get current location.");
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
};

  const mapCenter = data
    ? [Number(data.location.latitude), Number(data.location.longitude)]
    : [6.9271, 79.8612];

  const mapKey = data
    ? `${data.location.latitude}-${data.location.longitude}-${selectedBoatId}-${mapStyle}`
    : "default-map";

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-800 overflow-hidden">
      {userRole === "owner" ? <OwnerSidebar /> : <DriverSidebar />}

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <DashboardNav />

        <main className="flex-1 min-h-0 overflow-y-auto px-6 lg:px-10 py-8">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-2">
                Fleet / Weather & Safety
              </p>
              <h1 className="text-3xl font-black text-slate-900">
                Weather and Safety Alerts
              </h1>
              <p className="mt-3 text-slate-600 text-[16px]">
                Search any boat, allow GPS, and view current weather at your
                location
              </p>
            </div>

            {/* Search & Select Boat */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">

              <div className="flex items-center justify-between mb-4">
                <label className="text-[18px] font-bold text-slate-800">
                  Search & Select Boat
                </label>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                    userRole === "driver"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {userRole === "driver" ? "🧑‍✈️ Driver" : "👑 Owner"}
                  {boats.length > 0 && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        userRole === "driver"
                          ? "bg-purple-200 text-purple-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {boats.length} boat{boats.length !== 1 ? "s" : ""} available
                    </span>
                  )}
                </span>
              </div>

              {loadingBoats ? (
                <div className="flex items-center gap-2 text-slate-500">
                  <Loader2 className="animate-spin" size={18} />
                  Loading boats...
                </div>
              ) : boats.length === 0 ? (
                <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-yellow-700 text-sm">
                  <AlertTriangle size={16} />
                  No boats found in database. Please add boats first.
                </div>
              ) : (
                <div className="relative max-w-lg" ref={searchRef}>

                  {/* Search Input */}
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                      size={18}
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => {
                        setShowDropdown(true);
                        setFilteredBoats(
                          searchQuery.trim() === "" ? boats : filteredBoats
                        );
                      }}
                      placeholder="Search by boat name, registration, type..."
                      className={`w-full border rounded-xl pl-10 pr-10 py-2.5 outline-none focus:ring-2 bg-white transition text-sm
                        ${
                          selectedBoat
                            ? "border-green-400 focus:ring-green-300"
                            : "border-blue-300 focus:ring-blue-500"
                        }`}
                    />

                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {selectedBoat ? (
                        <CheckCircle2 className="text-green-500" size={18} />
                      ) : searchQuery ? (
                        <button onClick={handleClearSearch}>
                          <X
                            className="text-slate-400 hover:text-red-400 transition"
                            size={16}
                          />
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {/* Selected Boat Info */}
                  {selectedBoat && !showDropdown && (
                    <div className="mt-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2
                          className="text-green-500 shrink-0"
                          size={16}
                        />
                        <p className="text-sm font-bold text-green-800">
                          Boat selected
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-green-700">
                        <p>
                          <span className="font-semibold">🚢 Name:</span>{" "}
                          {selectedBoat.boatName}
                        </p>
                        <p>
                          <span className="font-semibold">📋 Reg:</span>{" "}
                          {selectedBoat.registrationNumber}
                        </p>
                        {selectedBoat.boatType && (
                          <p>
                            <span className="font-semibold">🔹 Type:</span>{" "}
                            {selectedBoat.boatType}
                          </p>
                        )}
                        {selectedBoat.boatStatus && (
                          <p>
                            <span className="font-semibold">● Status:</span>{" "}
                            <span
                              className={
                                selectedBoat.boatStatus === "ACTIVE"
                                  ? "text-green-600 font-bold"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {selectedBoat.boatStatus}
                            </span>
                          </p>
                        )}
                        {selectedBoat.modelYear && (
                          <p>
                            <span className="font-semibold">📅 Year:</span>{" "}
                            {selectedBoat.modelYear}
                          </p>
                        )}
                        {selectedBoat.horsepower && (
                          <p>
                            <span className="font-semibold">⚡ HP:</span>{" "}
                            {selectedBoat.horsepower}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Dropdown */}
                  {showDropdown && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-blue-200 rounded-xl shadow-xl max-h-72 overflow-y-auto">

                      <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 rounded-t-xl sticky top-0">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                          {filteredBoats.length} boat
                          {filteredBoats.length !== 1 ? "s" : ""} found
                        </p>
                      </div>

                      {filteredBoats.length > 0 ? (
                        filteredBoats.map((boat) => (
                          <div
                            key={boat._id}
                            onClick={() => handleSelectBoat(boat)}
                            className="flex flex-col px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-100 last:border-none transition group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-800 text-sm group-hover:text-blue-700 transition">
                                🚢 {boat.boatName}
                              </span>
                              {boat.boatStatus && (
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    boat.boatStatus === "ACTIVE"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-600"
                                  }`}
                                >
                                  {boat.boatStatus}
                                </span>
                              )}
                            </div>

                            <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5">
                              <span className="text-xs text-slate-500">
                                📋 {boat.registrationNumber}
                              </span>
                              {boat.boatType && (
                                <span className="text-xs text-slate-400">
                                  🔹 {boat.boatType}
                                </span>
                              )}
                              {boat.modelYear && (
                                <span className="text-xs text-slate-400">
                                  📅 {boat.modelYear}
                                </span>
                              )}
                              {boat.horsepower && (
                                <span className="text-xs text-slate-400">
                                  ⚡ {boat.horsepower} HP
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center">
                          <p className="text-slate-400 text-sm">
                            ❌ No boats found matching
                          </p>
                          <p className="font-semibold text-slate-600 text-sm mt-1">
                            "{searchQuery}"
                          </p>
                          <p className="text-xs text-slate-400 mt-2">
                            Try searching by name, registration or type
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={handleSeeWeather}
                disabled={loadingWeather || !selectedBoat}
                className="mt-5 px-10 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loadingWeather ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Getting GPS & Weather...
                  </>
                ) : (
                  "See Weather"
                )}
              </button>
            </div>
            {/* ═══════════════════════════════════════════════════ */}

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl bg-red-100 text-red-700 px-4 py-3 font-medium flex items-center gap-2">
                <AlertTriangle size={16} />
                {error}
              </div>
            )}

            {/* Result */}
            {data && (
              <>
                {/* Boat + Location */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                      {data.boat ? data.boat.boatName : "Selected Boat"}
                    </h2>
                    {data.boat && (
                      <>
                        <p className="text-slate-600">
                          Registration: {data.boat.registrationNumber}
                        </p>
                        <p className="text-slate-600 mt-2">
                          Status: {data.boat.boatStatus}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold">
                      <MapPin size={18} />
                      Current GPS Location
                    </div>
                    <p className="text-sm text-slate-500 mb-3">
                      Exact place detected from your device
                    </p>
                    <div className="space-y-2 text-slate-700">
                      <p>
                        <span className="font-semibold">Place:</span> {placeName}
                      </p>
                      <p>
                        <span className="font-semibold">Latitude:</span>{" "}
                        {data.location.latitude}
                      </p>
                      <p>
                        <span className="font-semibold">Longitude:</span>{" "}
                        {data.location.longitude}
                      </p>
                      <p>
                        <span className="font-semibold">Source:</span>{" "}
                        {data.location.source}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Weather Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Thermometer size={18} />
                      <span className="font-semibold">Temperature</span>
                    </div>
                    <p className="text-3xl font-extrabold">
                      {data.weather.temperature}°C
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Droplets size={18} />
                      <span className="font-semibold">Humidity</span>
                    </div>
                    <p className="text-3xl font-extrabold">
                      {data.weather.humidity}%
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Wind size={18} />
                      <span className="font-semibold">Wind</span>
                    </div>
                    <p className="text-3xl font-extrabold">
                      {data.weather.windSpeedKts} kts
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Eye size={18} />
                      <span className="font-semibold">Visibility</span>
                    </div>
                    <p className="text-3xl font-extrabold">
                      {data.weather.visibilityKm} km
                    </p>
                  </div>
                </div>

                {/* Current Condition */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
                  <h3 className="text-xl font-bold mb-2">Current Condition</h3>
                  <p className="capitalize text-slate-600">
                    {data.weather.description}
                  </p>
                  <p className="mt-2 text-slate-600">
                    Estimated Wave Height: {data.weather.estimatedWaveHeight} m
                  </p>
                </div>

                {/* Safety Alerts */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
                  <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                    <AlertTriangle size={18} />
                    Safety Alerts
                  </div>
                  {data.alerts && data.alerts.length > 0 ? (
                    <div className="space-y-3">
                      {data.alerts.map((alert, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-yellow-200 bg-yellow-50 p-4"
                        >
                          <p className="font-bold text-slate-900">
                            {alert.title}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">
                            {alert.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500">No alerts right now.</p>
                  )}
                </div>

                {/* Weather Map */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-slate-800 font-bold">
                      <MapPin size={20} className="text-blue-600" />
                      <span className="text-lg">Live Location & Weather Map</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-full">
                      📍 {placeName}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 mb-4">
                    Your exact GPS location with real-time weather overlay
                  </p>

                  {/* Layer selector */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-700">
                        Weather Overlay:
                      </span>
                      <select
                        value={weatherLayer}
                        onChange={(e) => setWeatherLayer(e.target.value)}
                        className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                      >
                        <option value="temp_new">🌡️ Temperature</option>
                        <option value="precipitation_new">🌧️ Precipitation</option>
                        <option value="clouds_new">☁️ Clouds</option>
                        <option value="wind_new">💨 Wind</option>
                        <option value="pressure_new">📊 Pressure</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-600">Map Style:</span>
                      <select
                        value={mapStyle}
                        onChange={(e) => setMapStyle(e.target.value)}
                        className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                      >
                        <option value="street">🗺️ Street</option>
                        <option value="satellite">🛰️ Satellite</option>
                        <option value="terrain">⛰️ Terrain</option>
                        <option value="light">🌤️ Light</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative w-full h-[75vh] rounded-xl overflow-hidden border-2 border-slate-200 shadow-inner">
                    <MapContainer
                      key={mapKey}
                      center={mapCenter}
                      zoom={14}
                      scrollWheelZoom={true}
                      className="absolute inset-0 w-full h-full z-0"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <MapResizeFix center={mapCenter} />

                      {/* Base map with style selection */}
                      {mapStyle === "street" && (
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                      )}
                      {mapStyle === "satellite" && (
                        <TileLayer
                          attribution="&copy; Esri"
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                      )}
                      {mapStyle === "terrain" && (
                        <TileLayer
                          attribution="&copy; OpenTopoMap"
                          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                        />
                      )}
                      {mapStyle === "light" && (
                        <TileLayer
                          attribution="&copy; CARTO"
                          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        />
                      )}

                      {/* Weather overlay from OpenWeather */}
                      {OPENWEATHER_KEY && (
                        <TileLayer
                          attribution="&copy; OpenWeatherMap"
                          url={`https://tile.openweathermap.org/map/${weatherLayer}/{z}/{x}/{y}.png?appid=${OPENWEATHER_KEY}`}
                          opacity={0.6}
                        />
                      )}

                      {/* Accuracy circle */}
                      <Circle
                        center={mapCenter}
                        radius={200}
                        pathOptions={{
                          color: "#2563eb",
                          fillColor: "#3b82f6",
                          fillOpacity: 0.15,
                          weight: 2,
                        }}
                      />

                      {/* Outer pulse circle */}
                      <Circle
                        center={mapCenter}
                        radius={500}
                        pathOptions={{
                          color: "#60a5fa",
                          fillColor: "#93c5fd",
                          fillOpacity: 0.08,
                          weight: 1,
                          dashArray: "5, 10",
                        }}
                      />

                      {/* Ship marker */}
                      <Marker position={mapCenter} icon={shipIcon}>
                        <Popup maxWidth={280}>
                          <div className="p-1">
                            <div className="border-b border-slate-200 pb-2 mb-2">
                              <strong className="text-blue-700 text-base">
                                📍 {placeName}
                              </strong>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Current Location
                              </p>
                            </div>

                            <div className="space-y-1.5 text-xs">
                              <p>
                                <span className="font-semibold text-slate-700">🚢 Boat:</span>{" "}
                                {data.boat?.boatName || "N/A"}
                              </p>
                              <p>
                                <span className="font-semibold text-slate-700">📋 Reg:</span>{" "}
                                {data.boat?.registrationNumber || "N/A"}
                              </p>
                              <p>
                                <span className="font-semibold text-slate-700">🌡️ Temp:</span>{" "}
                                {data.weather.temperature}°C
                              </p>
                              <p>
                                <span className="font-semibold text-slate-700">💧 Humidity:</span>{" "}
                                {data.weather.humidity}%
                              </p>
                              <p>
                                <span className="font-semibold text-slate-700">💨 Wind:</span>{" "}
                                {data.weather.windSpeedKts} kts
                              </p>
                              <p>
                                <span className="font-semibold text-slate-700">☁️ Sky:</span>{" "}
                                <span className="capitalize">{data.weather.description}</span>
                              </p>
                              <p className="text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-100">
                                📌 {data.location.latitude.toFixed(4)},{" "}
                                {data.location.longitude.toFixed(4)}
                              </p>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>

                    {/* Top-Left: Live Weather Panel */}
                    <div className="absolute top-4 left-4 z-[1000] bg-white/95 text-slate-900 rounded-2xl p-4 w-[290px] shadow-2xl backdrop-blur-md border border-white">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-bold">
                            Live Weather
                          </div>
                          <p className="font-bold text-slate-800 text-sm truncate max-w-[200px]">
                            📍 {placeName}
                          </p>
                        </div>
                        <div className="text-3xl">
                          {data.weather.description?.includes("cloud")
                            ? "☁️"
                            : data.weather.description?.includes("rain")
                            ? "🌧️"
                            : data.weather.description?.includes("clear")
                            ? "☀️"
                            : data.weather.description?.includes("snow")
                            ? "❄️"
                            : "🌤️"}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-blue-50 rounded-lg p-2">
                          <p className="text-blue-600 font-bold text-[10px] uppercase">Temp</p>
                          <p className="text-slate-900 font-black text-lg">
                            {data.weather.temperature}°C
                          </p>
                        </div>
                        <div className="bg-cyan-50 rounded-lg p-2">
                          <p className="text-cyan-600 font-bold text-[10px] uppercase">
                            Humidity
                          </p>
                          <p className="text-slate-900 font-black text-lg">
                            {data.weather.humidity}%
                          </p>
                        </div>
                        <div className="bg-teal-50 rounded-lg p-2">
                          <p className="text-teal-600 font-bold text-[10px] uppercase">Wind</p>
                          <p className="text-slate-900 font-black text-lg">
                            {data.weather.windSpeedKts}{" "}
                            <span className="text-xs">kts</span>
                          </p>
                        </div>
                        <div className="bg-indigo-50 rounded-lg p-2">
                          <p className="text-indigo-600 font-bold text-[10px] uppercase">
                            Visibility
                          </p>
                          <p className="text-slate-900 font-black text-lg">
                            {data.weather.visibilityKm}{" "}
                            <span className="text-xs">km</span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-200">
                        <p className="text-[11px] text-slate-500">
                          <span className="font-semibold">Condition:</span>{" "}
                          <span className="capitalize text-slate-700">
                            {data.weather.description}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Bottom-Right: Coordinates Panel */}
                    <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 text-slate-900 rounded-xl px-4 py-2.5 shadow-lg backdrop-blur-md border border-white">
                      <div className="flex items-center gap-3 text-xs">
                        <MapPin size={14} className="text-blue-600" />
                        <div>
                          <p className="font-semibold text-slate-500 text-[10px] uppercase">
                            Coordinates
                          </p>
                          <p className="font-mono font-bold text-slate-800">
                            {Number(data.location.latitude).toFixed(5)},{" "}
                            {Number(data.location.longitude).toFixed(5)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Top-Right: Zoom to My Location */}
                    <button
                      onClick={() => {
                        if (data) {
                          const map = document.querySelector(".leaflet-container");
                          if (map) map.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                      className="absolute top-4 right-4 z-[1000] bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-110"
                      title="Center on My Location"
                    >
                      <MapPin size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WeatherDashboard;
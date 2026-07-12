import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  HiOutlineRefresh,
  HiOutlineArrowLeft,
  HiOutlineExclamation,
  HiOutlineCheckCircle,
  HiOutlineLocationMarker,
  HiOutlineCloud,
  HiOutlineSun,
  HiOutlineEye,
  HiOutlineChip,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineExclamationCircle
} from 'react-icons/hi';
import { 
  WiHumidity, 
  WiStrongWind, 
  WiThermometer, 
  WiBarometer,
  WiCloudy,
  WiDaySunny,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog
} from 'react-icons/wi';
import { FaAnchor } from 'react-icons/fa';
import { IoBoatOutline } from 'react-icons/io5';
import { MdOutlineWaves, MdOutlineWarning } from 'react-icons/md';

// Custom boat icon for map
const boatIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2942/2942076.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

// Alert boat icon (red)
const alertBoatIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1673/1673188.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

// Component to fit map bounds to boats
const FitBounds = ({ boats }) => {
  const map = useMap();
  
  useEffect(() => {
    if (boats.length > 0) {
      const bounds = boats.map(b => [b.currentLocation.lat, b.currentLocation.lng]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [boats, map]);
  
  return null;
};

const AdminWeather = () => {
  const navigate = useNavigate();
  const [boats, setBoats] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [notification, setNotification] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchData();
    
    // Auto refresh every 60 seconds
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchData, 60000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/weather/boats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );
      setBoats(response.data.boats || []);
      setAlerts(response.data.alerts || []);
    } catch (err) {
      console.error(err);
      showNotification('Failed to fetch weather data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Default map center (Sri Lanka)
  const defaultCenter = [7.8731, 80.7718];

  // Get weather icon
  const getWeatherIcon = (condition) => {
    const icons = {
      'Clear': <WiDaySunny className="text-yellow-400 text-5xl" />,
      'Clouds': <WiCloudy className="text-gray-400 text-5xl" />,
      'Rain': <WiRain className="text-blue-400 text-5xl" />,
      'Thunderstorm': <WiThunderstorm className="text-purple-400 text-5xl" />,
      'Snow': <WiSnow className="text-blue-200 text-5xl" />,
      'Fog': <WiFog className="text-gray-300 text-5xl" />,
      'Mist': <WiFog className="text-gray-300 text-5xl" />
    };
    return icons[condition] || <WiDaySunny className="text-yellow-400 text-5xl" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-4 rounded-2xl backdrop-blur-xl border shadow-2xl animate-slide-in ${
          notification.type === 'success' 
            ? 'bg-green-500/20 border-green-500/40 text-green-100' 
            : 'bg-red-500/20 border-red-500/40 text-red-100'
        }`}>
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? (
              <HiOutlineCheckCircle className="text-2xl" />
            ) : (
              <HiOutlineExclamation className="text-2xl" />
            )}
            <p className="font-semibold">{notification.message}</p>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="relative z-20 bg-slate-900/60 backdrop-blur-2xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dw-admin/dashboard')}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-blue-100 transition-all"
              >
                <HiOutlineArrowLeft className="text-lg" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <FaAnchor className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">Deewaraya</h1>
                  <p className="text-[10px] text-blue-300 tracking-widest uppercase">Weather Monitoring</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  autoRefresh 
                    ? 'bg-green-500/20 border border-green-500/40 text-green-300' 
                    : 'bg-white/5 border border-white/10 text-blue-100 hover:bg-white/10'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></span>
                <span className="hidden sm:inline">Auto Refresh</span>
              </button>

              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-blue-100 text-sm font-medium transition-all"
              >
                <HiOutlineRefresh className={`${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3">
            <HiOutlineCloud className="text-cyan-400 text-4xl" />
            Weather Monitoring
          </h2>
          <p className="text-blue-200/70 text-sm">
            Real-time weather monitoring for all active boats at sea
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Online Boats" 
            value={boats.length}
            icon={IoBoatOutline}
            color="from-green-500 to-emerald-500"
            iconBg="bg-green-500/10"
            iconColor="text-green-400"
            pulse={true}
          />
          <StatCard 
            title="Active Alerts" 
            value={alerts.length}
            icon={MdOutlineWarning}
            color="from-red-500 to-orange-500"
            iconBg="bg-red-500/10"
            iconColor="text-red-400"
            pulse={alerts.length > 0}
          />
          <StatCard 
            title="High Severity" 
            value={alerts.filter(a => a.severity === 'high').length}
            icon={HiOutlineExclamationCircle}
            color="from-red-500 to-rose-500"
            iconBg="bg-red-500/10"
            iconColor="text-red-400"
          />
          <StatCard 
            title="Locations" 
            value={new Set(boats.map(b => b.weather?.location)).size}
            icon={HiOutlineLocationMarker}
            color="from-blue-500 to-cyan-500"
            iconBg="bg-blue-500/10"
            iconColor="text-blue-400"
          />
        </div>

        {/* Alerts Banner */}
        {alerts.length > 0 && (
          <div className="mb-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-500/30 rounded-xl flex items-center justify-center">
                <MdOutlineWarning className="text-red-300 text-xl animate-pulse" />
              </div>
              <div>
                <h3 className="text-white font-bold">Active Weather Alerts</h3>
                <p className="text-red-200/70 text-xs">{alerts.length} alerts require attention</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {alerts.slice(0, 6).map((alert, i) => (
                <AlertBadge key={i} alert={alert} />
              ))}
            </div>
          </div>
        )}

        {/* Map & Boats List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Map - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-2">
                <HiOutlineLocationMarker className="text-cyan-400" />
                Live Boat Locations
              </h3>
              <span className="text-xs text-blue-200/60">{boats.length} boats online</span>
            </div>
            <div className="h-[500px] relative">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                  <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                </div>
              ) : boats.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
                  <div className="text-center">
                    <IoBoatOutline className="text-6xl text-blue-300/30 mx-auto mb-3" />
                    <p className="text-white font-semibold mb-1">No boats online</p>
                    <p className="text-blue-200/60 text-sm">Waiting for boats with GPS enabled</p>
                  </div>
                </div>
              ) : (
                <MapContainer
                  center={defaultCenter}
                  zoom={8}
                  style={{ height: '100%', width: '100%' }}
                  className="z-0"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  <FitBounds boats={boats} />
                  {boats.map(boat => (
                    <Marker
                      key={boat._id}
                      position={[boat.currentLocation.lat, boat.currentLocation.lng]}
                      icon={boat.alerts?.length > 0 ? alertBoatIcon : boatIcon}
                      eventHandlers={{
                        click: () => setSelectedBoat(boat)
                      }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <p className="font-bold text-base">{boat.name}</p>
                          <p className="text-gray-600">Owner: {boat.owner?.name}</p>
                          {boat.weather && (
                            <>
                              <p className="text-blue-600 mt-1">
                                🌡️ {boat.weather.temperature}°C - {boat.weather.condition}
                              </p>
                              <p className="text-gray-500">📍 {boat.weather.location}</p>
                            </>
                          )}
                          {boat.alerts?.length > 0 && (
                            <p className="text-red-600 font-semibold mt-1">
                              ⚠️ {boat.alerts.length} alerts
                            </p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>

          {/* Boats List - 1 column */}
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-bold flex items-center gap-2">
                <IoBoatOutline className="text-cyan-400" />
                Online Boats
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[500px]">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
                </div>
              ) : boats.length === 0 ? (
                <div className="p-8 text-center">
                  <IoBoatOutline className="text-4xl text-blue-300/30 mx-auto mb-2" />
                  <p className="text-blue-200/60 text-sm">No boats online</p>
                </div>
              ) : (
                <div className="p-3 space-y-2">
                  {boats.map(boat => (
                    <BoatCard 
                      key={boat._id} 
                      boat={boat} 
                      isSelected={selectedBoat?._id === boat._id}
                      onClick={() => setSelectedBoat(boat)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Boat Weather Details */}
        {selectedBoat && selectedBoat.weather && (
          <div className="mt-6 bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <IoBoatOutline className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{selectedBoat.name}</h3>
                  <p className="text-blue-200/70 text-sm flex items-center gap-1">
                    <HiOutlineLocationMarker />
                    {selectedBoat.weather.location}, {selectedBoat.weather.country}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBoat(null)}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white"
              >
                ✕
              </button>
            </div>

            {/* Main Weather Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-blue-200/70 text-sm mb-1">Temperature</p>
                  <p className="text-white text-5xl font-bold">{selectedBoat.weather.temperature}°C</p>
                  <p className="text-blue-200/60 text-xs mt-1">Feels like {selectedBoat.weather.feelsLike}°C</p>
                </div>
                {getWeatherIcon(selectedBoat.weather.condition)}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-blue-200/70 text-sm mb-3">Current Condition</p>
                <p className="text-white text-2xl font-bold capitalize mb-2">{selectedBoat.weather.description}</p>
                <p className="text-blue-200/60 text-sm">
                  <HiOutlineClock className="inline mr-1" />
                  Updated: {new Date(selectedBoat.weather.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Weather Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <WeatherMetric icon={WiHumidity} label="Humidity" value={`${selectedBoat.weather.humidity}%`} />
              <WeatherMetric icon={WiStrongWind} label="Wind" value={`${selectedBoat.weather.windSpeed} m/s`} />
              <WeatherMetric icon={WiBarometer} label="Pressure" value={`${selectedBoat.weather.pressure} hPa`} />
              <WeatherMetric icon={HiOutlineEye} label="Visibility" value={selectedBoat.weather.visibility ? `${selectedBoat.weather.visibility} km` : 'N/A'} />
              <WeatherMetric icon={HiOutlineCloud} label="Cloudiness" value={`${selectedBoat.weather.cloudiness}%`} />
              <WeatherMetric icon={WiThermometer} label="Feels Like" value={`${selectedBoat.weather.feelsLike}°C`} />
              <WeatherMetric icon={WiDaySunny} label="Sunrise" value={new Date(selectedBoat.weather.sunrise).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} />
              <WeatherMetric icon={WiDaySunny} label="Sunset" value={new Date(selectedBoat.weather.sunset).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} />
            </div>

            {/* Boat Owner Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
              <p className="text-blue-200/70 text-xs uppercase tracking-wider mb-3">Boat Owner Info</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <HiOutlineUser className="text-cyan-400" />
                  <span className="text-white text-sm">{selectedBoat.owner?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlinePhone className="text-cyan-400" />
                  <span className="text-white text-sm">{selectedBoat.owner?.phone || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Alerts for this boat */}
            {selectedBoat.alerts?.length > 0 && (
              <div>
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <MdOutlineWarning className="text-red-400" />
                  Weather Alerts ({selectedBoat.alerts.length})
                </h4>
                <div className="space-y-2">
                  {selectedBoat.alerts.map((alert, i) => (
                    <AlertBadge key={i} alert={alert} full={true} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

// ============ COMPONENTS ============

const StatCard = ({ title, value, icon: Icon, color, iconBg, iconColor, pulse }) => (
  <div className="group relative bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-2xl p-5 transition-all hover:-translate-y-1 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="relative">
      <div className={`w-11 h-11 ${iconBg} border border-white/10 rounded-xl flex items-center justify-center mb-3 ${pulse ? 'animate-pulse' : ''}`}>
        <Icon className={`text-xl ${iconColor}`} />
      </div>
      <p className="text-blue-200/60 text-xs mb-1 uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const BoatCard = ({ boat, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer p-3 rounded-xl border transition-all ${
      isSelected 
        ? 'bg-cyan-500/20 border-cyan-400/50' 
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    }`}
  >
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
          <IoBoatOutline className="text-white text-sm" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{boat.name}</p>
          <p className="text-blue-200/60 text-xs">{boat.owner?.name}</p>
        </div>
      </div>
      {boat.alerts?.length > 0 && (
        <span className="px-1.5 py-0.5 bg-red-500/20 text-red-300 text-[10px] font-bold rounded animate-pulse">
          {boat.alerts.length}
        </span>
      )}
    </div>
    {boat.weather && (
      <div className="flex items-center justify-between text-xs">
        <span className="text-cyan-300 flex items-center gap-1">
          <WiThermometer className="text-base" />
          {boat.weather.temperature}°C
        </span>
        <span className="text-blue-200/60">{boat.weather.condition}</span>
      </div>
    )}
  </div>
);

const AlertBadge = ({ alert, full }) => {
  const severityColors = {
    high: 'bg-red-500/20 border-red-500/40 text-red-200',
    medium: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-200',
    low: 'bg-blue-500/20 border-blue-500/40 text-blue-200'
  };

  return (
    <div className={`flex items-start gap-2 p-2 rounded-lg border ${severityColors[alert.severity]}`}>
      <span className="text-lg">{alert.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold">{alert.title}</p>
        {full && <p className="text-xs opacity-80 mt-0.5">{alert.message}</p>}
        {alert.boatName && !full && (
          <p className="text-[10px] opacity-70 truncate">🚤 {alert.boatName}</p>
        )}
      </div>
    </div>
  );
};

const WeatherMetric = ({ icon: Icon, label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
    <div className="flex items-center gap-2 mb-1">
      <Icon className="text-cyan-400 text-lg" />
      <p className="text-blue-200/60 text-xs">{label}</p>
    </div>
    <p className="text-white font-bold text-sm">{value}</p>
  </div>
);

export default AdminWeather;
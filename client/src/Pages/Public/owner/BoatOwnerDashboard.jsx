import React from 'react';
import { 
  Ship, 
  Wrench, 
  Plus, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Minus, 
  Crosshair, 
  Cloud
} from 'lucide-react';
import OwnerSidebar from '../../../components/OwnerSidebar';
import DashboardNav from '../../../components/DashboardNav';
import { useAuth } from '../../../context/AuthContext'; // ✅ ADD THIS

const BoatOwnerDashboard = () => {
  const { user } = useAuth(); // ✅ ADD THIS

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar */}
      <OwnerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header Bar */}
        <DashboardNav />

        {/* Dashboard Main Area */}
        <main className="flex-1 overflow-y-auto p-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                Overview
              </p>
              {/* ✅ Dynamic welcome message */}
              <h1 className="text-3xl font-black text-slate-900">
                Welcome, {user?.name || 'Owner'}! 🚤
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your fleet and monitor operations
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-[16px] font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition cursor-pointer">
                <Download size={16} /> Download Report
              </button>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard 
              title="Total Boats" 
              value="24" 
              sub="Vessels" 
            />
            <StatCard 
              title="Active Boats" 
              value="5" 
              sub="Live" 
              indicator="bg-green-500" 
            />
            <StatCard 
              title="Monthly Income" 
              value="$12.4k" 
              sub={<TrendingUp size={14} className="text-green-500 inline ml-1" />} 
            />
            <StatCard 
              title="Monthly Expenses" 
              value="$4.2k" 
              sub={<TrendingDown size={14} className="text-red-500 inline ml-1" />} 
            />
            
            {/* Net Profit Card */}
            <div className="bg-gradient-to-br from-blue-900 to-cyan-600 p-5 rounded-xl text-white shadow-lg flex flex-col justify-between">
              <p className="text-[10px] font-bold uppercase text-white/60">Net Profit</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-sm font-medium text-white/60">$</span>
                <span className="text-2xl font-black">8,200</span>
              </div>
            </div>
          </div>

          {/* Map and Side Widgets Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Map Section */}
            <div className="xl:col-span-2 relative h-[500px] rounded-2xl overflow-hidden shadow-sm">
              <img 
                src="src/assets/bddashmap.png" 
                alt="Ocean Map" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
              
              {/* Floating Info */}
              <div className="absolute top-6 left-6 flex bg-white/90 backdrop-blur rounded-xl shadow-md border border-white/40">
                <div className="p-3 border-r border-slate-200">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    Current Location
                  </p>
                  <p className="text-xs font-bold text-slate-900">Andaman Sea, TH</p>
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    Wind Speed
                  </p>
                  <p className="text-xs font-bold text-slate-900">12 knots NW</p>
                </div>
              </div>

              {/* Boat Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                <div className="bg-[#0f172a] text-white p-2 rounded-full shadow-xl border-2 border-white">
                  <Ship size={16} />
                </div>
                <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-md shadow-lg mt-2 border border-white/50">
                  <p className="text-[10px] font-bold text-slate-900 whitespace-nowrap">
                    Blue Horizon II
                  </p>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <div className="flex flex-col bg-white/90 backdrop-blur rounded-lg shadow-md overflow-hidden">
                  <button className="p-2 hover:bg-slate-100 text-slate-700 transition">
                    <Plus size={18} />
                  </button>
                  <div className="h-px bg-slate-200 mx-1"></div>
                  <button className="p-2 hover:bg-slate-100 text-slate-700 transition">
                    <Minus size={18} />
                  </button>
                </div>
                <button className="p-2 bg-[#0f172a] text-white rounded-lg shadow-md hover:bg-slate-800 transition">
                  <Crosshair size={18} />
                </button>
              </div>
            </div>

            {/* Right Side Widgets */}
            <div className="space-y-6">
              
              {/* Maintenance Required Card */}
              <div className="bg-[#f8fafc] rounded-3xl p-6 border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-slate-900">Maintenance Required</h3>
                  <button className="text-[10px] font-bold text-blue-600 uppercase hover:underline">
                    See all
                  </button>
                </div>

                <div className="space-y-3">
                  <MaintenanceItem 
                    title="Ocean Queen" 
                    desc="Engine service overdue" 
                    tag="Urgent" 
                    tagColor="bg-red-50 text-red-600"
                    iconColor="bg-red-100 text-red-600"
                    border="border-l-4 border-l-red-500"
                  />
                  <MaintenanceItem 
                    title="The Mariner" 
                    desc="Hull cleaning scheduled" 
                    tag="2 days" 
                    tagColor="bg-slate-100 text-slate-600"
                    iconColor="bg-blue-100 text-blue-600"
                    border="border-l-4 border-l-blue-900"
                    isWrench={false}
                  />
                </div>
              </div>

              {/* Weather Forecast Card */}
              <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 rounded-3xl p-6 text-white shadow-4xl">
                <p className="text-[10px] font-bold uppercase text-white/60 tracking-widest mb-1">
                  Weather Forecast
                </p>

                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold">Partly Cloudy</h3>
                  <Cloud className="text-white/70" size={32} />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-black">28°C</span>
                  <div className="text-[10px] text-white/60 space-y-0.5">
                    <p>Humidity: 65%</p>
                    <p>UV Index: 4 Low</p>
                  </div>
                </div>

                <div className="flex justify-between border-t border-white/20 pt-4">
                  <DayForecast day="MON" temp="31°" />
                  <DayForecast day="TUE" temp="29°" />
                  <DayForecast day="WED" temp="24°" />
                  <DayForecast day="THU" temp="32°" />
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

// ===============================================
// ✅ Reusable Components
// ===============================================

const StatCard = ({ title, value, sub, indicator }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-tight">
      {title}
    </p>
    <div className="mt-2 flex items-baseline gap-2">
      <h3 className="text-2xl font-black text-slate-900">{value}</h3>
      <div className="flex items-center gap-1">
        {indicator && <div className={`w-1.5 h-1.5 rounded-full ${indicator}`}></div>}
        <span className="text-[10px] font-bold text-slate-500">{sub}</span>
      </div>
    </div>
  </div>
);

const MaintenanceItem = ({ title, desc, tag, tagColor, iconColor, border, isWrench = true }) => (
  <div className={`bg-white p-3 rounded-xl shadow-sm border border-slate-100 ${border} flex items-center justify-between`}>
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}>
        {isWrench ? (
          <Wrench size={18} /> 
        ) : (
          <div className="p-1 border-2 border-current rounded-md">
            <div className="w-2 h-2 bg-current rounded-sm"></div>
          </div>
        )}
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-900">{title}</h4>
        <p className="text-[10px] text-slate-400 leading-tight">{desc}</p>
      </div>
    </div>
    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter ${tagColor}`}>
      {tag}
    </span>
  </div>
);

const DayForecast = ({ day, temp }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-[8px] font-bold text-slate-500 uppercase">{day}</span>
    <div className="text-slate-300 my-1">
      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
    </div>
    <span className="text-[10px] font-bold">{temp}</span>
  </div>
);

export default BoatOwnerDashboard;
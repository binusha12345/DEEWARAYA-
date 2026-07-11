import React from 'react';
import DriverSidebar from '../../../components/DriverSidebar';
import DashboardNav from '../../../components/DashboardNav';
import { useAuth } from '../../../context/AuthContext'; // ✅ ADD THIS
import { 
  Wind, 
  Thermometer, 
  Anchor, 
  Plus, 
  Minus, 
  Crosshair, 
  Info, 
  Droplet 
} from 'lucide-react';

const BoatDriverDashboard = () => {
  const { user } = useAuth(); // ADD THIS

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar */}
      <DriverSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Navigation */}
        <DashboardNav />

        {/* Dashboard area */}
        <main className="flex-1 overflow-y-auto p-8">
          
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              {/* Show welcome message with user name */}
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome, {user?.name || 'Driver'}! ⚓
              </h1>
              <p className="text-slate-600">
                Real-time vessel telemetry and navigation systems active.
              </p>
            </div>
            
            <div className="flex items-center bg-[#f0f4f8] rounded-xl p-2 pr-4 shadow-sm border border-slate-200">
              <div className="w-10 h-10 bg-cyan-300 rounded-lg flex items-center justify-center text-cyan-900 mr-3">
                <Wind size={20} />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</p>
                <p className="text-sm font-bold text-[#0f2a4a]">System Online</p>
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left column (Map + Telemetry Cards) */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Map View */}
              <div className="relative h-[540px] bg-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <img 
                  src="src/assets/bddashmap.png"
                  alt="Map Aerial View" 
                  className="w-full h-full object-cover"
                />
                
                {/* HUD Overlay */}
                <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-lg border border-white/20 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                      Navigation HUD
                    </p>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900">12.42</span>
                    <span className="text-xs font-bold text-slate-500 ml-1">KNOTS</span>
                  </div>
                  
                  <div className="flex gap-6 border-t border-slate-200 pt-3">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Heading</p>
                      <p className="text-sm font-bold text-slate-900">284° W</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Depth</p>
                      <p className="text-sm font-bold text-slate-900">42.5 m</p>
                    </div>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-6 right-6 flex gap-2">
                  <div className="flex bg-white/90 backdrop-blur rounded-lg shadow-md overflow-hidden">
                    <button className="p-2 hover:bg-slate-100 text-slate-700 transition">
                      <Plus size={20} />
                    </button>
                    <div className="w-px bg-slate-200"></div>
                    <button className="p-2 hover:bg-slate-100 text-slate-700 transition">
                      <Minus size={20} />
                    </button>
                  </div>
                  <button className="p-2 bg-[#005a8d] text-white rounded-lg shadow-md hover:bg-[#004a75] transition">
                    <Crosshair size={20} />
                  </button>
                </div>
              </div>

              {/* Bottom Cards (Wind & Temp) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Wind Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 border-b-4 border-b-[#326978]">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Wind Velocity
                    </h3>
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <Wind size={20} />
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-slate-900">24</span>
                    <span className="text-lg font-bold text-slate-700 ml-1">kph</span>
                  </div>
                  <p className="text-sm text-slate-500">Moderate breeze from North-East</p>
                </div>

                {/* Temperature Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 border-b-4 border-b-[#326978]">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Temperature
                    </h3>
                    <div className="w-10 h-10 bg-cyan-200 text-cyan-800 rounded-lg flex items-center justify-center">
                      <Thermometer size={20} />
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-slate-900">25</span>
                    <span className="text-2xl font-bold text-slate-900 ml-1">°C</span>
                  </div>
                  <p className="text-sm text-slate-500">Ambient deck temperature</p>
                </div>

                // Emergency button on user dashboard
                <button
                  onClick={sendEmergency}
                  className="bg-red-600 text-white p-6 rounded-xl text-2xl font-bold"
                >
                  🚨 SEND EMERGENCY
                </button>

              </div>
            </div>

            {/* Right Column (Sidebar Widgets) */}
            <div className="space-y-6">
              
              {/* Boat Details Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                {/* Decorative blob top right */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#f0f4f8] rounded-full z-0"></div>
                
                <div className="flex items-center gap-2 mb-6 relative z-10">
                  <div className="w-6 h-6 bg-[#005a8d] text-white rounded-full flex items-center justify-center text-xs">
                    <Info size={14} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Boat Details</h3>
                </div>

                <div className="rounded-xl overflow-hidden mb-6 h-40">
                  <img 
                    src="src/assets/bddash.png" 
                    alt="Fishing Boat" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                      Boat Name
                    </p>
                    <p className="text-lg font-bold text-[#005a8d]">Boat A</p>
                  </div>
                  
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                      Boat Reg. No.
                    </p>
                    <p className="text-base font-bold text-slate-900">209934</p>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                        Capacity
                      </p>
                      <p className="text-base font-bold text-slate-900">2 Tons</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                        Engine Type
                      </p>
                      <p className="text-base font-bold text-slate-900">25</p>
                    </div>
                  </div>
                </div>

                {/* Fuel Level */}
                <div className="bg-[#f0f4f8] rounded-xl p-4 flex items-center gap-4">
                  <div className="text-orange-200">
                    <Droplet size={24} fill="currentColor" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-[#0f2a4a]">Fuel Level</span>
                      <span className="text-xs font-bold text-slate-900">75%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-[#005a8d] h-2 rounded-full" 
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-[#e2e8f0] rounded-3xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button className="w-full bg-[#005a8d] text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#004a75] transition-colors shadow-sm">
                    <Anchor size={18} />
                    Deploy Anchor
                  </button>
                  
                  <button className="w-full bg-white text-slate-900 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-sm border border-slate-200">
                    <span className="text-red-600 font-bold text-xs tracking-widest">SOS</span>
                    Emergency Broadcast
                  </button>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default BoatDriverDashboard;
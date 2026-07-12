import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiOutlineUsers,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineDocumentReport,
  HiOutlineExclamation,
  HiOutlineArrowRight,
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineChartBar,
  HiOutlineCloud
} from 'react-icons/hi';
import { FaAnchor, FaShip } from 'react-icons/fa';
import { IoBoatOutline } from 'react-icons/io5';
import { MdOutlineAttachMoney, MdOutlineBuild } from 'react-icons/md';

const AdminDashboard = () => {
  const { adminUser: user, adminLogout: logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/dw-admin');
  };

  // Admin management options
  const adminOptions = [
    { 
      title: 'User Management', 
      description: 'Manage all registered users, view profiles, and control access',
      icon: HiOutlineUsers, 
      color: 'from-blue-500 to-cyan-500',
      shadowColor: 'shadow-blue-500/30',
      path: '/dw-admin/users',
    },
    { 
      title: 'Boat Management', 
      description: 'Register, update, and monitor all boats in the fleet system',
      icon: IoBoatOutline, 
      color: 'from-cyan-500 to-teal-500',
      shadowColor: 'shadow-cyan-500/30',
      path: '/dw-admin/boats',
    },
    /*{ 
      title: 'Emergency Center', 
      description: 'Monitor and respond to emergency alerts from boat operators',
      icon: HiOutlineExclamation, 
      color: 'from-red-500 to-orange-500',
      shadowColor: 'shadow-red-500/30',
      path: '/dw-admin/emergencies',
      urgent: true
    },
    { 
      title: 'Maintenance Records', 
      description: 'Track boat maintenance schedules and service history',
      icon: MdOutlineBuild, 
      color: 'from-amber-500 to-orange-500',
      shadowColor: 'shadow-amber-500/30',
      path: '/dw-admin/maintenance',
    },*/,
    { 
      title: 'Weather Monitoring', 
      description: 'View real-time weather conditions and forecasts for fleet safety',
      icon: HiOutlineCloud, 
      color: 'from-sky-500 to-blue-500',
      shadowColor: 'shadow-sky-500/30',
      path: '/dw-admin/weather',
    },
    /*{ 
      title: 'Financial Reports', 
      description: 'Access revenue reports, income tracking, and financial analytics',
      icon: MdOutlineAttachMoney, 
      color: 'from-emerald-500 to-green-500',
      shadowColor: 'shadow-emerald-500/30',
      path: '/dw-admin/finance',
    },
    { 
      title: 'Trip Tracking', 
      description: 'Monitor active trips, routes, and boat locations in real-time',
      icon: HiOutlineLocationMarker, 
      color: 'from-purple-500 to-pink-500',
      shadowColor: 'shadow-purple-500/30',
      path: '/dw-admin/tracking',
    },
    { 
      title: 'Analytics & Reports', 
      description: 'View comprehensive analytics and generate custom reports',
      icon: HiOutlineChartBar, 
      color: 'from-indigo-500 to-purple-500',
      shadowColor: 'shadow-indigo-500/30',
      path: '/dw-admin/reports',
    },
    { 
      title: 'Notifications', 
      description: 'Send announcements and manage system-wide notifications',
      icon: HiOutlineBell, 
      color: 'from-yellow-500 to-amber-500',
      shadowColor: 'shadow-yellow-500/30',
      path: '/dw-admin/notifications',
    },
    { 
      title: 'System Settings', 
      description: 'Configure system preferences, security, and admin settings',
      icon: HiOutlineCog, 
      color: 'from-slate-500 to-slate-600',
      shadowColor: 'shadow-slate-500/30',
      path: '/dw-admin/settings',
    },*/
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* HEADER */}
      <header className="relative z-20 bg-slate-900/60 backdrop-blur-2xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                <FaAnchor className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Deewaraya</h1>
                <p className="text-[10px] text-blue-300 tracking-widest uppercase">Admin Panel</p>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              
              {/* Notification */}
              <button className="relative p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-blue-100 transition-all">
                <HiOutlineBell className="text-lg" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-white truncate max-w-[160px]">
                    {user?.email}
                  </p>
                  <p className="text-xs text-cyan-300 capitalize flex items-center gap-1 justify-end">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    {user?.role || 'Administrator'}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                  {user?.email?.[0]?.toUpperCase() || 'A'}
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 hover:text-red-200 rounded-xl text-sm font-semibold transition-all"
              >
                <HiOutlineLogout className="text-lg" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Banner */}
        <div className="relative bg-gradient-to-br from-sky-500/20 via-blue-600/20 to-cyan-500/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 mb-8 overflow-hidden">
          
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
          
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-400/20 border border-cyan-400/30 rounded-full mb-4">
                <HiOutlineClock className="text-cyan-300 text-sm" />
                <span className="text-xs text-cyan-100 font-medium">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Welcome back, <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">Admin!</span> 👋
              </h2>
              <p className="text-blue-100/80 text-sm md:text-base max-w-2xl">
                Manage your entire smart fishing fleet operations from one place. Access all administrative tools below.
              </p>
            </div>

            {/* System Status Card */}
            <div className="flex items-center gap-3 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
                <FaShip className="text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">System Status</p>
                <p className="text-green-400 text-xs flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  All Systems Operational
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Profile Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <HiOutlineMail className="text-blue-400 text-xl" />
            </div>
            <div className="min-w-0">
              <p className="text-blue-200/60 text-xs uppercase tracking-wider mb-1">Admin Email</p>
              <p className="text-white text-sm font-semibold truncate">{user?.email}</p>
            </div>
          </div>

          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <HiOutlineShieldCheck className="text-cyan-400 text-xl" />
            </div>
            <div>
              <p className="text-blue-200/60 text-xs uppercase tracking-wider mb-1">Access Role</p>
              <p className="text-white text-sm font-semibold capitalize flex items-center gap-2">
                {user?.role || 'Administrator'}
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded-full font-bold">ACTIVE</span>
              </p>
            </div>
          </div>

          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <HiOutlineClock className="text-purple-400 text-xl" />
            </div>
            <div>
              <p className="text-blue-200/60 text-xs uppercase tracking-wider mb-1">Last Login</p>
              <p className="text-white text-sm font-semibold">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>

        {/* Admin Options Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Admin Control Center
              </h3>
              <p className="text-blue-200/60 text-sm">
                Select any option below to manage your fleet operations
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-blue-100 text-xs font-medium">{adminOptions.length} Modules Available</span>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {adminOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div 
                  key={index}
                  onClick={() => navigate(option.path)}
                  className="group cursor-pointer relative bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Urgent badge */}
                  {option.urgent && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-red-500/20 border border-red-500/40 rounded-full">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
                      <span className="text-red-300 text-[10px] font-bold uppercase tracking-wider">Urgent</span>
                    </div>
                  )}

                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center shadow-lg ${option.shadowColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mb-4`}>
                      <Icon className="text-white text-2xl" />
                    </div>

                    {/* Title */}
                    <h4 className="text-white text-lg font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                      {option.title}
                    </h4>

                    {/* Description */}
                    <p className="text-blue-200/60 text-sm leading-relaxed mb-4">
                      {option.description}
                    </p>

                    {/* Action */}
                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all">
                      <span>Open Module</span>
                      <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 mt-8 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HiOutlineShieldCheck className="text-cyan-400" />
            <p className="text-blue-100 text-sm font-medium">
              Secured Admin Panel
            </p>
          </div>
          <p className="text-blue-300/50 text-xs">
            © 2024 Deewaraya • Smart Fleet Management System 🌊
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
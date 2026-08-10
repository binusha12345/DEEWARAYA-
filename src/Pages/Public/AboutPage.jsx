import React, { useEffect, useRef, useState } from 'react';
import HomeNavBar from "../../components/HomeNavBar";
import HomeFooter from '../../components/HomeFooter';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative w-full h-[700px] md:h-[800px] overflow-hidden">
        {/* Background Image */}
        <HomeNavBar />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
            alt="Sri Lankan fishing boat"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div
          id="hero"
          ref={setRef('hero')}
          className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto ml-5"
        >
          <p
            className={`text-cyan-400 font-semibold tracking-[3px] text-sm mb-4 transition-all duration-700 mt-[-200px] ${
              isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            ABOUT US
          </p>

          <h1
            className={`text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-200 ${
              isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Empowering Smarter
            <br />
            Safer <span className="text-cyan-400">Fishing</span>
          </h1>

          {/* Blue underline */}
          <div
            className={`w-16 h-1 bg-cyan-500 rounded mb-8 transition-all duration-700 delay-300 ${
              isVisible.hero ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            } origin-left`}
          />

          <p
            className={`text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed mb-10 transition-all duration-700 delay-400 ${
              isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            DEEWARAYA delivers an advanced Fishing Boat Management System
            designed to modernize maritime operations through intelligent
            automation, real-time monitoring, and comprehensive fleet oversight.
          </p>

          <div
            className={`transition-all duration-700 delay-500 ${
              isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button className="group flex items-center gap-3 bg-cyan-800/10 border border-cyan-200/80 text-white px-8 py-3 rounded-full hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300 backdrop-blur-sm mt-[-20px]">
              <span className="font-medium">Learn More</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div
          id="hero-cards"
          ref={setRef('hero-cards')}
          className="absolute bottom-0 left-0 right-0 z-20"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-1 mt-[-160px]">
            <div
              className={`bg-white rounded-t-2xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 delay-600 ${
                isVisible['hero-cards'] ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-12'
              }`}
            >
              {/* Real-time Tracking */}
              <div className="p-6 flex items-start gap-4 border-b sm:border-b lg:border-b-0 lg:border-r border-gray-100 group hover:bg-gray-50 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Real-time Tracking</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    Monitor your fleet in real-time with accurate location data.
                  </p>
                </div>
              </div>

              {/* Smart Alerts */}
              <div className="p-6 flex items-start gap-4 border-b sm:border-b lg:border-b-0 lg:border-r border-gray-100 group hover:bg-gray-50 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Smart Alerts</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    Get instant alerts for safety, zones, and critical updates.
                  </p>
                </div>
              </div>

              {/* Fleet Management */}
              <div className="p-6 flex items-start gap-4 border-b sm:border-b-0 lg:border-r border-gray-100 group hover:bg-gray-50 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Fleet Management</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    Manage vessels, crew, and operations from one platform.
                  </p>
                </div>
              </div>

              {/* Live Tracking Widget */}
              <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-tr-2xl group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/80 text-xs font-semibold tracking-wider">LIVE TRACKING</span>
                  <svg className="w-4 h-4 text-white/60 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" />
                  </svg>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">24.5 KNOTS</p>
                    <p className="text-white/70 text-sm mt-1">
                      Speed: <span className="text-green-400 font-medium">Good</span>
                    </p>
                  </div>
                  <svg className="w-16 h-10 text-white/30" viewBox="0 0 80 40" fill="none" stroke="currentColor">
                    <path d="M5 35 Q20 35 25 25 Q30 15 40 20 Q50 25 55 15 Q60 5 75 5" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CAPABILITIES / OPERATIONAL EXCELLENCE SECTION ==================== */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
        {/* Capabilities Hero Banner */}
        <div className="relative w-full h-[350px] md:h-[420px] overflow-hidden mb-16">
          <img
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80"
            alt="Fishing vessel at sea"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/85 via-[#0a1628]/50 to-transparent" />
          <div
            id="capabilities-hero"
            ref={setRef('capabilities-hero')}
            className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto"
          >
            <p
              className={`text-cyan-400 font-semibold tracking-[3px] text-sm mb-3 transition-all duration-700 ${
                isVisible['capabilities-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              OUR CAPABILITIES
            </p>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 transition-all duration-700 delay-200 ${
                isVisible['capabilities-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Operational Excellence
            </h2>
            <div
              className={`w-16 h-1 bg-cyan-500 rounded mb-6 transition-all duration-700 delay-300 ${
                isVisible['capabilities-hero'] ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              } origin-left`}
            />
            <p
              className={`text-gray-300 text-base sm:text-lg max-w-lg leading-relaxed transition-all duration-700 delay-400 ${
                isVisible['capabilities-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Smart tools and real-time insights to help you operate safer, smarter, and more efficiently.
            </p>
          </div>
        </div>

        {/* Feature Cards Row */}
        <div
          id="feature-cards"
          ref={setRef('feature-cards')}
          className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Track Locations Card */}
            <div
              className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group ${
                isVisible['feature-cards'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Track Locations</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Real-time GPS tracking and route history to help you stay on course and ensure compliance in every fishing zone.
                    </p>
                  </div>
                  <div className="w-28 h-36 rounded-xl overflow-hidden flex-shrink-0 hidden sm:block">
                    <img
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=300&q=80"
                      alt="Map tracking"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <button className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors group/btn">
                  View Live Map
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Monitor Vessels Card */}
            <div
              className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group ${
                isVisible['feature-cards'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">Monitor Vessels</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  Live engine data, performance alerts, and system diagnostics from a single command center.
                </p>

                {/* Mini dashboard */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-500">Engine Status</span>
                    <span className="text-xs font-bold text-green-500">Online</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Fuel Efficiency</span>
                        <span className="font-bold text-gray-900">87%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '87%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Engine Load</span>
                        <span className="font-bold text-gray-900">72%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: '72%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <button className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors group/btn">
                  Open Monitor
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Manage Crew Card */}
            <div
              className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group ${
                isVisible['feature-cards'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Crew</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  Shift planning, certifications, and onboard communication tools to keep your crew connected and productive.
                </p>

                {/* Crew list */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-700 mb-3">Active Crew</p>
                  <div className="space-y-3">
                    {[
                      { name: 'A. Rahman', role: 'Deckhand', status: 'On Duty', color: 'text-green-500' },
                      { name: 'M. Hasan', role: 'Engineer', status: 'On Duty', color: 'text-green-500' },
                      { name: 'S. Karim', role: 'Navigator', status: 'Resting', color: 'text-yellow-500' },
                    ].map((crew, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-xs font-bold text-blue-700">
                          {crew.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">{crew.name}</p>
                          <p className="text-[10px] text-gray-400">{crew.role}</p>
                        </div>
                        <span className={`text-[10px] font-medium ${crew.color}`}>{crew.status}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 text-xs text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700">
                    View All Crew
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <button className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors group/btn">
                  Manage Crew
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div
          id="stats-bar"
          ref={setRef('stats-bar')}
          className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mt-16"
        >
          <div
            className={`bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] rounded-2xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${
              isVisible['stats-bar'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {[
              {
                value: '24',
                label: 'Active Vessels',
                sub: 'Currently at sea',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
              },
              {
                value: '1,245 NM',
                label: 'Distance Traveled',
                sub: 'This month',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
              {
                value: '328 MT',
                label: 'Total Catch',
                sub: 'This month',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
              },
              {
                value: '100%',
                label: 'Safety Compliance',
                sub: 'Current status',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 ${i < 3 ? 'lg:border-r lg:border-white/10' : ''} ${i < 2 ? 'border-b lg:border-b-0 border-white/10 pb-6 lg:pb-0' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                  <p className="text-white/40 text-xs">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MODERNIZING THE HIGH SEAS SECTION ==================== */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div
          id="modernizing"
          ref={setRef('modernizing')}
          className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Content */}
            <div>
              <div
                className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                  isVisible.modernizing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="w-10 h-[2px] bg-gray-300" />
                <p className="text-cyan-500 font-semibold tracking-[3px] text-sm">ABOUT OUR SYSTEM</p>
              </div>

              <h2
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8 transition-all duration-700 delay-200 ${
                  isVisible.modernizing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Modernizing
                <br />
                the <span className="text-cyan-500">High Seas</span>
              </h2>

              <p
                className={`text-gray-500 text-base leading-relaxed mb-10 max-w-lg transition-all duration-700 delay-300 ${
                  isVisible.modernizing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                We bridge the gap between legacy operations and future-proof digital infrastructure—providing actionable
                intelligence that reduces costs and maximizes yield.
              </p>

              <div
                className={`w-full h-[1px] bg-gray-200 mb-10 transition-all duration-700 delay-400 ${
                  isVisible.modernizing ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                } origin-left`}
              />

              {/* Feature Items */}
              <div className="space-y-8">
                {[
                  {
                    title: 'AI-Powered Predictive Maintenance',
                    desc: 'Monitor engine and system health to prevent failures.',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    ),
                    delay: 500,
                  },
                  {
                    title: 'Unified Fleet Dashboard',
                    desc: 'Real-time visibility across all vessels for smarter decisions.',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    ),
                    delay: 600,
                  },
                  {
                    title: 'Secure GPS Communication',
                    desc: 'Encrypted, tamper-proof communication that keeps data safe.',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    ),
                    delay: 700,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 transition-all duration-700 ${
                      isVisible.modernizing ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transitionDelay: `${item.delay}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6">
              <div
                className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-700 delay-300 ${
                  isVisible.modernizing ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80"
                  alt="Fishing vessel"
                  className="w-full h-[300px] sm:h-[380px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 98% Efficiency Card */}
              <div
                className={`bg-white rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm transition-all duration-700 delay-500 ${
                  isVisible.modernizing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <div className="flex items-center gap-4 sm:border-r sm:border-gray-200 sm:pr-6">
                  <svg className="w-10 h-10 text-cyan-500" viewBox="0 0 40 40" fill="none">
                    <path d="M5 25 Q10 20 15 25 Q20 30 25 25 Q30 20 35 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M5 20 Q10 15 15 20 Q20 25 25 20 Q30 15 35 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                    <path d="M5 15 Q10 10 15 15 Q20 20 25 15 Q30 10 35 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.25" />
                  </svg>
                  <div>
                    <p className="text-4xl font-bold text-cyan-500">98%</p>
                    <p className="text-gray-500 text-sm">Efficiency Gained</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Smarter operations.</p>
                  <p className="text-gray-700 font-medium">Lower costs. Higher yield.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />
    </div>
  );
};

export default AboutPage;
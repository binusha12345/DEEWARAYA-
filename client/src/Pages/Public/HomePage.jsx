import React from 'react';
import { 
  Settings, Moon, Ship, MapPin, Wrench, 
  PieChart, CloudRain, QrCode, ShieldCheck, 
  Map, Phone, Mail, Globe, Share2,
  Home, TrendingUp, Sparkles, ArrowRight
} from 'lucide-react';
import HomeNavBar from '../../components/HomeNavBar';
import { Link } from 'react-router-dom';
import homeImage from '../../assets/home.png';
import mockupImage from '../../assets/mockup.png'; 
import HomeFooter from '../../components/HomeFooter';
import { motion } from "framer-motion"; 

//Animations and transitions import
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  zoomOut,
  scaleIn,
  staggerContainer,
  hoverScale,
  hoverLift,
  hoverRotate,
  floatUp,
  floatDown,
  viewportConfig,
} from "../../animations";


const HomePage = () => {
  return (
    <div className="min-h-screen font-sans text-slate-800 bg-white">
      <main>

        {/*  HERO SECTION  */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          
          {/* Background Image with zoom animation */}
          <motion.div className="absolute inset-0 z-0" {...zoomOut}>
            <img
              src={homeImage}
              alt="Fishing Fleet"
              className="absolute inset-0 w-full h-full object-cover object-center" 
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/25 via-blue-900/20 to-blue-950/30"></div>
          </motion.div>

          {/* Navbar */}
          <div className="absolute top-0 left-0 w-full z-20">
            <HomeNavBar />
          </div>

          {/* Hero Content with stagger animation */}
          <motion.div 
            className="container mx-auto px-20 relative z-10 text-white pt-60"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-2 py-1 mb-6 bg-white/30 backdrop-blur-md border border-white/60 rounded-full"
            >
              <span className="w-1 h-1 bg-cyan-800 rounded-full animate-pulse"></span>
              <span className="text-[12px] font-bold text-slate-600 tracking-[0.2em] uppercase font-modern">
                🌊 Sri Lanka's #1 Fleet System
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={fadeInUp}
              className="text-2xl md:text-5xl font-bold leading-tight mb-10 mt-[-20px]"
            >
              <div className="inline-block">
                Modernize Fishing <br />
                Operations with <br />
                <span className="text-blue-900 mt-[50px]">Smart Boat <br /> Management</span>
              </div>
            </motion.h1>

            {/* Description with Left Accent */}
            <motion.div 
              variants={fadeInLeft}
              className="relative pl-5 border-l-2 border-cyan-400 mb-10 max-w-xl mt-[-6px]"
            >
              <p className="text-base text-white/90 leading-relaxed font-modern font-light drop-shadow-lg">
                A centralized digital platform designed to manage fishing fleets,
                <span className="text-cyan-300 font-medium"> track real-time locations</span>,
                monitor maintenance, calculate income, and 
                <span className="text-cyan-300 font-medium"> ensure safety at sea</span>.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex items-center gap-4 flex-wrap font-body mt-[-6px]"
            >
              <Link to="/register">
                <motion.button 
                  {...hoverScale}
                  className="group bg-gradient-to-r from-blue-700 to-cyan-600 rounded-full text-white px-6 py-1.5 rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/40 flex items-center gap-2 cursor-pointer"
                >
                  Get Started 
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </motion.button>
              </Link>

              <motion.button 
                {...hoverScale}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-1.5 rounded-lg font-semibold hover:bg-white/20 flex items-center gap-2"
              >
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[20px]">▶</span>
                View Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/*  FEATURES SECTION  */}
        <div className="features relative py-24 bg-gradient-to-br from-slate-100 via-blue-300/20 to-slate-100 overflow-hidden">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative container mx-auto px-8">
        
            {/* Section Header with scroll animation */}
            <motion.div 
              className="text-center mb-20 mt-[-20px]"
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              variants={fadeInUp}
            >
              {/* Small Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-100 border border-blue-200 rounded-full">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest text-blue-700 uppercase font-modern">
                  ⚡ Powerful Features
                </span>
              </div>

              {/* Main Title with Gradient */}
              <h2 className="text-4xl md:text-6xl font-bold mb-6 font-modern">
                <span className="text-slate-900">Command Your </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradientMove">
                  Fleet
                </span>
              </h2>

              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-900"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-500"></span>
              </div>

              <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed font-modern font-light">
                Powerful tools designed for the modern maritime operator, ensuring
                efficiency from <span className="text-blue-600 font-semibold">dock to deep sea</span>.
              </p>
            </motion.div>

            {/* Features Grid with stagger animation */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[-30px]"
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              variants={staggerContainer}
            >
              <FeatureCard
                icon={<Ship className="w-7 h-7" />}
                title="Boat Management"
                desc="Track and manage your entire fishing fleet with comprehensive digital profiles for every vessel."
              />
              
              <FeatureCard
                icon={<MapPin className="w-7 h-7" />}
                title="GPS Tracking"
                desc="Real-time location tracking with custom geofencing and restricted zone alerts for complete oversight."
              />
              
              <FeatureCard
                icon={<Wrench className="w-7 h-7" />}
                title="Maintenance"
                desc="Schedule and track boat maintenance, repairs, and engine hours to prevent downtime at sea."
              />
              
              <FeatureCard
                icon={<PieChart className="w-7 h-7" />}
                title="Finance Management"
                desc="Monitor daily catches, expenses, fuel costs, and overall profitability in one clean dashboard."
              />
              
              <FeatureCard
                icon={<CloudRain className="w-7 h-7" />}
                title="Weather Alerts"
                desc="Get real-time marine weather forecasts and critical safety notifications directly to your device."
              />
              
              <FeatureCard
                icon={<QrCode className="w-7 h-7" />}
                title="QR Code System"
                desc="Instantly access boat history and documentation via a secure unique QR code for each vessel."
              />
            </motion.div>
          </div>
        </div>

        {/*  STEPS SECTION  */}
        <div className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-100/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-16 max-w-7xl">
            
            {/* Left Content - slides in from left */}
            <motion.div 
              className="flex-1 relative z-10"
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-100/80 backdrop-blur-sm rounded-full border border-blue-200">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                  How It Works
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
                Streamline Your Fleet in{" "}
                <span className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                  Three Simple Steps
                </span>
              </h2>
              
              <p className="text-lg text-slate-600 mb-12 max-w-lg">
                Get your entire fleet operational and optimized in minutes, not months.
              </p>

              {/* Steps with stagger */}
              <motion.div 
                className="space-y-6 relative"
                initial="initial"
                whileInView="animate"
                viewport={viewportConfig}
                variants={staggerContainer}
              >
                {/* Vertical connecting line */}
                <div className="absolute left-[38px] top-16 bottom-16 w-[2px] bg-gradient-to-b from-blue-400 via-cyan-400 to-transparent"></div>
                
                <EnhancedStepItem
                  num="01"
                  title="Register Your Fleet"
                  desc="Onboard your vessels into the secure Deewaraya database with detailed specifications and crew info."
                />
                <EnhancedStepItem
                  num="02"
                  title="Track in Real-time"
                  desc="View live GPS positions of every boat. Monitor navigation paths and set boundary alerts instantly."
                />
                <EnhancedStepItem
                  num="03"
                  title="Manage Operations"
                  desc="Access analytics on catch volume, fuel efficiency, and maintenance logs to optimize your business."
                />
              </motion.div>
            </motion.div>

            {/* Right Image/Mockup - slides in from right */}
            <motion.div 
              className="flex-1 relative"
              variants={fadeInRight}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl scale-95"></div>
              
              <div className="relative group">
                <motion.img
                  src={mockupImage}
                  alt="Dashboard on Tablet"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Floating Status Card - Top */}
                <motion.div 
                  {...floatUp}
                  className="absolute -top-6 -left-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/60 min-w-[260px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-50 animate-pulse"></div>
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
                        <ShieldCheck className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                        Fleet Status
                      </p>
                      <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        All Systems Online
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Efficiency Card - Bottom Right */}
                <motion.div 
                  {...floatDown}
                  className="absolute -bottom-8 -right-6 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/60 min-w-[220px]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Efficiency
                    </p>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        98.4%
                      </p>
                      <p className="text-xs text-green-600 font-semibold mt-1">
                        ↑ 12% this month
                      </p>
                    </div>
                  </div>
                  {/* Animated progress bar */}
                  <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "98%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </motion.div>

                {/* Small floating badge - Top right */}
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-white/60 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-slate-700">LIVE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/*  CTA SECTION  */}
        <div className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
            <motion.div 
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 py-20 px-8 md:px-20 text-center shadow-2xl"
              variants={scaleIn}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
            >
              {/* Background Image */}
              <img
                src="https://camo.githubusercontent.com/5e45bc648dba68520ce949a53690af6bcef2880f84a1d46cbb1636649afd6d84/68747470733a2f2f796176757a63656c696b65722e6769746875622e696f2f73616d706c652d696d616765732f696d6167652d313032312e6a7067"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />

              {/* Decorative Blobs */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

              {/* Content with stagger */}
              <motion.div 
                className="relative z-10 max-w-2xl mx-auto"
                initial="initial"
                whileInView="animate"
                viewport={viewportConfig}
                variants={staggerContainer}
              >
                {/* Badge */}
                <motion.div 
                  variants={fadeInUp}
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span className="text-sm font-semibold text-cyan-100 uppercase tracking-wider">
                    Start Today
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h2 
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl font-bold text-white mb-6"
                >
                  Ready to Take{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-teal-200 bg-clip-text text-transparent">
                    Command?
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p 
                  variants={fadeInUp}
                  className="text-blue-100 mb-10 text-lg"
                >
                  Join hundreds of fleet owners who have modernized their maritime
                  operations with Deewaraya's industry-leading technology.
                </motion.p>

                {/* Buttons */}
                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <motion.button 
                    {...hoverScale}
                    className="group bg-white text-blue-950 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-50 flex items-center gap-2 shadow-lg"
                  >
                    <Link to="/register">
                      Get Started Now
                    </Link>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <motion.button 
                    {...hoverScale}
                    className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20"
                  >
                    Contact Sales
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      
      </main>
      <HomeFooter />
    </div>
  );
}


// Reusable Animated Components

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    variants={fadeInUp}
    {...hoverLift}
    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-2xl cursor-pointer"
  >
    <motion.div 
      {...hoverRotate}
      className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-6 text-blue-600"
    >
      {icon}
    </motion.div>
    <h3 className="text-[18px] font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 text-[14px] leading-relaxed">{desc}</p>
  </motion.div>
);
  
const StepItem = ({ num, title, desc }) => (
  <div className="flex gap-6">
    <div className="text-5xl font-bold text-blue-300 -mt-1">{num}</div>
    <div>
      <h3 className="text-[18px] font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-600 text-[12px] leading-relaxed">{desc}</p>
    </div>
  </div>
);

const EnhancedStepItem = ({ num, title, desc }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      whileHover={{ x: 10 }}
      className="group flex gap-6 items-start p-4 rounded-2xl hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Number Circle */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
        <motion.div 
          whileHover={{ scale: 1.15, rotate: 5 }}
          className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
        >
          <span className="text-2xl font-bold text-white">{num}</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-2">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

export default HomePage;
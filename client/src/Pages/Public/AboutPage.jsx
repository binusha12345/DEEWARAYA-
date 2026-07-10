import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Ship,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Users,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Anchor,
  Waves,
} from "lucide-react";
import HomeNavBar from "../../components/HomeNavBar";
import HomeFooter from "../../components/HomeFooter";

// Import animations from central file
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  hoverScale,
  hoverLift,
  floatUp,
  viewportConfig,
} from "../../animations";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-[#f4f7fb] to-cyan-50 text-slate-800">
      {/* Top Navbar */}
      <HomeNavBar />

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16 overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-10 -left-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Text - slides in from left with stagger */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-100 rounded-full border border-blue-200"
            >
              <Sparkles className="w-4 h-4 text-blue-700" />
              <p className="text-xs tracking-[0.3em] uppercase text-blue-900 font-semibold">
                Precision Maritime Systems
              </p>
            </motion.div>

            {/* Big Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-6xl lg:text-7xl font-extrabold leading-none text-[#0f2a4a]"
            >
              ABOUT
              <br />
              <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                US
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="mt-8 text-slate-600 text-lg leading-relaxed max-w-xl"
            >
              DEEWARAYA delivers an advanced Fishing Boat Management System designed to modernize
              maritime operations through intelligent automation, real-time monitoring, and
              comprehensive fleet oversight.
            </motion.p>

            {/* Button */}
            <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-4">
              <Link to="/features">
                <motion.button
                  {...hoverScale}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-950 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/30"
                >
                  Learn More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image - slides in from right */}
          <motion.div
            className="relative"
            variants={fadeInRight}
            initial="initial"
            animate="animate"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 rounded-2xl blur-2xl"></div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white bg-white group">
              <motion.img
                src="src/assets/Aboutpagehero.png"
                alt="Hero Boat"
                className="w-full h-[520px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 to-transparent"></div>
            </div>

            {/* Floating card - Live Tracking */}
            <motion.div
              {...floatUp}
              className="absolute -bottom-6 left-8 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white px-5 py-4 flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-950 to-blue-700 text-white flex items-center justify-center shadow-lg">
                <Ship size={22} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                  Live Tracking
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </p>
                <p className="text-lg font-bold text-slate-900">24.5 KNOTS</p>
              </div>
            </motion.div>

            {/* Floating badge - Top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-full shadow-xl px-4 py-2 flex items-center gap-2 border border-white"
            >
              <Anchor className="w-4 h-4 text-blue-700" />
              <span className="text-sm font-bold text-slate-900">Trusted</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ OPERATIONAL EXCELLENCE ═══════════ */}
      <section className="bg-white/60 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          {/* Section Header */}
          <motion.div
            className="mb-10 text-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-blue-100 rounded-full">
              <Waves className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                Our Capabilities
              </span>
            </div>
            <h2 className="text-4xl font-bold text-[#0f2a4a]">
              Operational{" "}
              <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <div className="mt-3 w-20 h-1 bg-gradient-to-r from-blue-700 to-cyan-500 rounded-full mx-auto"></div>
          </motion.div>

          {/* Cards Grid with stagger */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            
            {/* Monitor Boats */}
            <motion.div
              variants={fadeInUp}
              {...hoverLift}
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 p-8 min-h-[320px] relative overflow-hidden group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-8">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center"
                >
                  <BarChart3 className="text-blue-900" size={26} />
                </motion.div>
                <span className="text-5xl font-extrabold text-slate-200">01</span>
              </div>

              <div className="absolute right-0 bottom-0 w-50 h-44 opacity-50">
                <img
                  src="src/assets/aboutmoni.jpeg"
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute left-0 right-0 bottom-0 h-44 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

              <div className="relative z-10 max-w-xl mt-20">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Monitor Boats</h3>
                <p className="text-slate-600 leading-relaxed max-w-2xl">
                  Real-time health diagnostics for every vessel in your fleet. Monitor engine
                  performance, fuel efficiency, and structural integrity from a single command
                  center.
                </p>
              </div>
            </motion.div>

            {/* Track Locations */}
            <motion.div
              variants={fadeInUp}
              {...hoverLift}
              className="bg-gradient-to-br from-[#61aef5] to-blue-600 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 p-8 text-white relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4"
              >
                <MapPin size={22} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Track Locations</h3>
              <p className="text-white/90 leading-relaxed text-sm">
                Precise GPS positioning and historical route analysis to optimize fishing lanes and
                ensure territorial compliance.
              </p>

              <div className="mt-8 rounded-xl overflow-hidden bg-white/20 p-2 backdrop-blur-md">
                <img
                  src="src/assets/Aboutpagetracking.png"
                  alt="Tracking"
                  className="w-full h-28 object-cover rounded-lg opacity-90"
                />
              </div>
            </motion.div>

            {/* Manage Crew */}
            <motion.div
              variants={fadeInUp}
              {...hoverLift}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 p-8 min-h-[220px] group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
              >
                <Users className="text-[#0f2a4a]" size={24} />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Manage Crew</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Streamlined shift scheduling, certification tracking, and communication tools to
                keep your teams synchronized at sea.
              </p>
            </motion.div>

            {/* Safety & Compliance */}
            <motion.div
              variants={fadeInUp}
              {...hoverLift}
              className="lg:col-span-2 bg-gradient-to-br from-[#0f2a4a] to-blue-900 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-white min-h-[220px] flex flex-col justify-between relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center"
                  >
                    <ShieldCheck size={24} className="text-cyan-300" />
                  </motion.div>
                  <h3 className="text-2xl font-bold">Safety & Compliance</h3>
                </div>

                <p className="text-white/85 leading-relaxed max-w-3xl">
                  Integrated emergency protocols and automatic compliance reporting to meet
                  international maritime safety standards effortlessly.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6 relative">
                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-center min-w-[90px] border border-white/10 hover:bg-white/20 transition-colors"
                >
                  <p className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                    Safety
                  </p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                    100%
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-center min-w-[90px] border border-white/10 hover:bg-white/20 transition-colors"
                >
                  <p className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                    Rating
                  </p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                    A+
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ MODERNIZING THE HIGH SEAS ═══════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left collage - slides from left with stagger */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {/* Image 1 - Engine */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl group"
            >
              <motion.img
                src="src/assets/Aboutpageengine.jpeg"
                alt="Engine"
                className="w-full h-56 object-cover"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            {/* 24/7 Global Support */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-[#0f2a4a] to-blue-800 rounded-xl p-5 text-white flex flex-col justify-between shadow-lg hover:shadow-2xl"
            >
              <div>
                <p className="text-sm text-cyan-300 font-semibold">24/7</p>
                <p className="text-lg font-bold">Global Support</p>
              </div>

              <div className="rounded-xl overflow-hidden mt-4 h-36">
                <img
                  src="src/assets/aboutglobalsupport.jpeg"
                  alt="Sailor"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Efficiency Gained 98% - with counter animation */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-[#0f2a4a] to-blue-800 rounded-xl p-5 text-white flex items-end shadow-lg hover:shadow-2xl"
            >
              <div>
                <p className="text-sm text-white/70">Efficiency Gained</p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent"
                >
                  98%
                </motion.p>
              </div>
            </motion.div>

            {/* Image 2 - Crew */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl group"
            >
              <motion.img
                src="src/assets/aboutefficiency.jpeg"
                alt="Crew"
                className="w-full h-56 object-cover"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </motion.div>

          {/* Right text - slides from right with stagger */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInRight}
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-blue-100 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                Innovation at Sea
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInRight}
              className="text-4xl lg:text-5xl font-extrabold text-[#0f2a4a] leading-tight"
            >
              Modernizing the{" "}
              <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                High Seas
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInRight}
              className="mt-6 text-slate-600 leading-relaxed text-lg max-w-2xl"
            >
              The traditional fishing industry is evolving. We bridge the gap between legacy
              operations and future-proof digital infrastructure. Our system doesn't just track
              data—it provides actionable intelligence that reduces costs and maximizes yield.
            </motion.p>

            <motion.div
              className="mt-8 space-y-4"
              variants={staggerContainer}
            >
              <FeatureItem text="Intelligent AI-driven predictive maintenance" />
              <FeatureItem text="Unified dashboard for multi-fleet management" />
              <FeatureItem text="Encrypted simulated-GPS-linked communication" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

// ═══════════ Reusable Animated Component ═══════════
const FeatureItem = ({ text }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ x: 15 }}
    className="flex items-start gap-3 group cursor-pointer"
  >
    <motion.div
      whileHover={{ rotate: 360, scale: 1.2 }}
      transition={{ duration: 0.5 }}
      className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-200 transition-colors"
    >
      <CheckCircle2 className="text-blue-700" size={16} />
    </motion.div>
    <span className="text-slate-700 font-medium">{text}</span>
  </motion.div>
);

export default AboutPage;
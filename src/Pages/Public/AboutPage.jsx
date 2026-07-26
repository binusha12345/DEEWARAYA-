import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <div className="about-page-root min-h-screen bg-gradient-to-br from-blue-50 via-[#f4f7fb] to-cyan-50 text-slate-800">
      <style>{responsiveStyles}</style>

      <HomeNavBar />

      {/* HERO SECTION */}
      <section className="about-hero-section relative max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16 overflow-hidden">
        <div className="absolute top-10 -left-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"></div>

        <div className="about-hero-wrapper relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Text */}
          <motion.div
            className="about-hero-text"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-100 rounded-full border border-blue-200"
            >
              <Sparkles className="w-4 h-4 text-blue-700" />
              <p className="text-xs tracking-[0.3em] uppercase text-blue-900 font-semibold">
                {t('about.hero.badge')}
              </p>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="about-hero-title text-6xl lg:text-7xl font-extrabold leading-none text-[#0f2a4a]"
            >
              {t('about.hero.title1')}
              <br />
              <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                {t('about.hero.title2')}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-8 text-slate-600 text-lg leading-relaxed max-w-xl"
            >
              {t('about.hero.description')}
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-4">
              <Link to="/features">
                <motion.button
                  {...hoverScale}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-950 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/30"
                >
                  {t('about.hero.learnMoreBtn')}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="about-hero-image-container relative"
            variants={fadeInRight}
            initial="initial"
            animate="animate"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 rounded-2xl blur-2xl"></div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white bg-white group">
              <motion.img
                src="src/assets/Aboutpagehero.png"
                alt="Hero Boat"
                className="about-hero-img w-full h-[520px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 to-transparent"></div>
            </div>

            {/* Floating Live Tracking Card */}
            <motion.div
              {...floatUp}
              className="about-hero-floating-card absolute -bottom-6 left-8 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white px-5 py-4 flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-950 to-blue-700 text-white flex items-center justify-center shadow-lg">
                <Ship size={22} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                  {t('about.hero.liveTracking')}
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </p>
                <p className="text-lg font-bold text-slate-900">24.5 {t('about.hero.knots')}</p>
              </div>
            </motion.div>

            {/* Floating Trusted Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="about-hero-floating-badge absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-full shadow-xl px-4 py-2 flex items-center gap-2 border border-white"
            >
              <Anchor className="w-4 h-4 text-blue-700" />
              <span className="text-sm font-bold text-slate-900">{t('about.hero.trusted')}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* OPERATIONAL EXCELLENCE */}
      <section className="excellence-section bg-white/60 border-y border-slate-200 py-16">
        <div className="excellence-container max-w-7xl mx-auto px-6 lg:px-10">
          
          <motion.div
            className="excellence-header mb-10 text-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-blue-100 rounded-full">
              <Waves className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                {t('about.excellence.badge')}
              </span>
            </div>
            <h2 className="excellence-title text-4xl font-bold text-[#0f2a4a]">
              {t('about.excellence.titlePart1')}{" "}
              <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                {t('about.excellence.titlePart2')}
              </span>
            </h2>
            <div className="mt-3 w-20 h-1 bg-gradient-to-r from-blue-700 to-cyan-500 rounded-full mx-auto"></div>
          </motion.div>

          <motion.div
            className="excellence-grid grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            
            {/* Monitor Boats */}
            <motion.div
              variants={fadeInUp}
              {...hoverLift}
              className="card-monitor lg:col-span-2 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 p-8 min-h-[320px] relative overflow-hidden group cursor-pointer"
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
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {t('about.excellence.monitor.title')}
                </h3>
                <p className="text-slate-600 leading-relaxed max-w-2xl">
                  {t('about.excellence.monitor.desc')}
                </p>
              </div>
            </motion.div>

            {/* Track Locations */}
            <motion.div
              variants={fadeInUp}
              {...hoverLift}
              className="card-track bg-gradient-to-br from-[#61aef5] to-blue-600 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 p-8 text-white relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4"
              >
                <MapPin size={22} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">{t('about.excellence.track.title')}</h3>
              <p className="text-white/90 leading-relaxed text-sm">
                {t('about.excellence.track.desc')}
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
              className="card-crew bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 p-8 min-h-[220px] group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
              >
                <Users className="text-[#0f2a4a]" size={24} />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {t('about.excellence.crew.title')}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {t('about.excellence.crew.desc')}
              </p>
            </motion.div>

            {/* Safety & Compliance */}
            <motion.div
              variants={fadeInUp}
              {...hoverLift}
              className="card-safety lg:col-span-2 bg-gradient-to-br from-[#0f2a4a] to-blue-900 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-white min-h-[220px] flex flex-col justify-between relative overflow-hidden cursor-pointer"
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
                  <h3 className="text-2xl font-bold">{t('about.excellence.safety.title')}</h3>
                </div>

                <p className="text-white/85 leading-relaxed max-w-3xl">
                  {t('about.excellence.safety.desc')}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6 relative">
                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-center min-w-[90px] border border-white/10 hover:bg-white/20 transition-colors"
                >
                  <p className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                    {t('about.excellence.safety.safetyLabel')}
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
                    {t('about.excellence.safety.ratingLabel')}
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

      {/* MODERNIZING THE HIGH SEAS */}
      <section className="highseas-section max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="highseas-container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <motion.div
            className="highseas-collage-grid grid grid-cols-2 gap-4"
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
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

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-[#0f2a4a] to-blue-800 rounded-xl p-5 text-white flex flex-col justify-between shadow-lg hover:shadow-2xl"
            >
              <div>
                <p className="text-sm text-cyan-300 font-semibold">24/7</p>
                <p className="text-lg font-bold">{t('about.highseas.globalSupport')}</p>
              </div>

              <div className="rounded-xl overflow-hidden mt-4 h-36">
                <img
                  src="src/assets/aboutglobalsupport.jpeg"
                  alt="Sailor"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-[#0f2a4a] to-blue-800 rounded-xl p-5 text-white flex items-end shadow-lg hover:shadow-2xl"
            >
              <div>
                <p className="text-sm text-white/70">{t('about.highseas.efficiencyGained')}</p>
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

          <motion.div
            className="highseas-content"
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
                {t('about.highseas.badge')}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInRight}
              className="highseas-title text-4xl lg:text-5xl font-extrabold text-[#0f2a4a] leading-tight"
            >
              {t('about.highseas.titlePart1')}{" "}
              <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                {t('about.highseas.titlePart2')}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInRight}
              className="mt-6 text-slate-600 leading-relaxed text-lg max-w-2xl"
            >
              {t('about.highseas.description')}
            </motion.p>

            <motion.div className="mt-8 space-y-4" variants={staggerContainer}>
              <FeatureItem text={t('about.highseas.feature1')} />
              <FeatureItem text={t('about.highseas.feature2')} />
              <FeatureItem text={t('about.highseas.feature3')} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

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

const responsiveStyles = `
  @media (max-width: 1280px) {
    .about-hero-section { padding-left: 3rem !important; padding-right: 3rem !important; }
    .about-hero-title { font-size: 3.5rem !important; }
    .about-hero-img { height: 440px !important; }
    .excellence-container { padding-left: 3rem !important; padding-right: 3rem !important; }
    .highseas-section { padding-left: 3rem !important; padding-right: 3rem !important; }
  }
  @media (max-width: 1024px) {
    .about-hero-wrapper { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .about-hero-text { text-align: center !important; display: flex !important; flex-direction: column !important; align-items: center !important; }
    .about-hero-title { font-size: 3rem !important; }
    .about-hero-image-container { max-width: 640px !important; margin: 0 auto !important; width: 100% !important; }
    .about-hero-img { height: 400px !important; }
    .excellence-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.5rem !important; }
    .card-monitor { grid-column: span 2 !important; min-height: auto !important; }
    .card-safety { grid-column: span 2 !important; min-height: auto !important; }
    .highseas-container { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .highseas-collage-grid { max-width: 600px !important; margin: 0 auto !important; width: 100% !important; }
    .highseas-content { text-align: center !important; display: flex !important; flex-direction: column !important; align-items: center !important; }
  }
  @media (max-width: 768px) {
    .about-hero-section { padding-left: 1.5rem !important; padding-right: 1.5rem !important; padding-top: 5rem !important; padding-bottom: 2rem !important; }
    .about-hero-title { font-size: 2.5rem !important; }
    .about-hero-img { height: 320px !important; }
    .about-hero-floating-card, .about-hero-floating-badge { display: none !important; }
    .excellence-section { padding-top: 3rem !important; padding-bottom: 3rem !important; }
    .excellence-container { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
    .excellence-header { margin-bottom: 2rem !important; }
    .excellence-title { font-size: 2rem !important; }
    .excellence-grid { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
    .card-monitor, .card-safety { grid-column: span 1 !important; }
    .card-monitor { padding: 1.5rem !important; }
    .card-monitor .relative.z-10 { margin-top: 4rem !important; }
    .highseas-section { padding-top: 3rem !important; padding-bottom: 3rem !important; padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
    .highseas-title { font-size: 2rem !important; }
    .highseas-collage-grid img { height: 140px !important; }
    .highseas-collage-grid > div { padding: 1rem !important; }
    .highseas-collage-grid .h-36 { height: 100px !important; margin-top: 0.5rem !important; }
  }
  @media (max-width: 640px) {
    .about-hero-section { padding-top: 4.5rem !important; }
    .about-hero-title { font-size: 2rem !important; }
    .about-hero-img { height: 260px !important; }
    .excellence-title, .highseas-title { font-size: 1.75rem !important; }
    .highseas-collage-grid img { height: 120px !important; }
    .highseas-collage-grid .text-4xl { font-size: 1.875rem !important; }
  }
  @media (max-width: 480px) {
    .about-hero-section { padding-left: 1rem !important; padding-right: 1rem !important; padding-top: 4rem !important; }
    .about-hero-title { font-size: 1.75rem !important; }
    .about-hero-img { height: 220px !important; }
    .excellence-container { padding-left: 1rem !important; padding-right: 1rem !important; }
    .excellence-title, .highseas-title { font-size: 1.5rem !important; }
    .card-monitor, .card-track, .card-crew, .card-safety { padding: 1.25rem !important; border-radius: 1rem !important; }
    .highseas-collage-grid { gap: 0.5rem !important; }
    .highseas-collage-grid img { height: 100px !important; }
    .highseas-collage-grid .h-36 { height: 70px !important; }
    .highseas-collage-grid .text-4xl { font-size: 1.5rem !important; }
  }
  @media (max-width: 360px) {
    .about-hero-title { font-size: 1.5rem !important; }
    .about-hero-img { height: 180px !important; }
    .excellence-title, .highseas-title { font-size: 1.35rem !important; }
  }
`;

export default AboutPage;
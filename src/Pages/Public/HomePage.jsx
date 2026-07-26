import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Ship, MapPin, Wrench,
  PieChart, CloudRain, QrCode, ShieldCheck,
  TrendingUp, Sparkles, ArrowRight
} from 'lucide-react';
import HomeNavBar from '../../components/HomeNavBar';
import { Link } from 'react-router-dom';
import homeImage from '../../assets/home.png';
import mockupImage from '../../assets/mockup.png';
import HomeFooter from '../../components/HomeFooter';
import { motion } from "framer-motion";

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
import { useTour } from '../../context/TourContext';

const HomePage = () => {
  const { t } = useTranslation();
  const { startTour } = useTour();

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-white">
      <style>{responsiveStyles}</style>

      <main>

        {/*  HERO SECTION  */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">

          <motion.div className="absolute inset-0 z-0" {...zoomOut}>
            <img
              src={homeImage}
              alt="Fishing Fleet"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/25 via-blue-900/20 to-blue-950/30"></div>
          </motion.div>

          <div className="absolute top-0 left-0 w-full z-20">
            <HomeNavBar />
          </div>

          <motion.div
            className="hero-content container mx-auto px-20 relative z-10 text-white pt-60"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-2 py-1 mb-6 bg-white/30 backdrop-blur-md border border-white/60 rounded-full"
            >
              <span className="w-1 h-1 bg-cyan-800 rounded-full animate-pulse"></span>
              <span className="text-[12px] font-bold text-slate-600 tracking-[0.2em] uppercase font-modern">
                🌊 {t('home.hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="hero-heading text-2xl md:text-5xl font-bold leading-tight mb-10 mt-[-20px]"
            >
              <div className="inline-block">
                {t('home.hero.title1')} <br />
                {t('home.hero.title2')} <br />
                <span className="text-blue-900 mt-[50px]">
                  {t('home.hero.title3')} <br /> {t('home.hero.title4')}
                </span>
              </div>
            </motion.h1>

            <motion.div
              variants={fadeInLeft}
              className="hero-desc relative pl-5 border-l-2 border-cyan-400 mb-10 max-w-xl mt-[-6px]"
            >
              <p className="text-base text-white/90 leading-relaxed font-modern font-light drop-shadow-lg">
                {t('home.hero.desc1')}
                <span className="text-cyan-300 font-medium"> {t('home.hero.descHighlight1')}</span>
                {t('home.hero.desc2')}
                <span className="text-cyan-300 font-medium"> {t('home.hero.descHighlight2')}</span>.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="hero-buttons flex items-center gap-4 flex-wrap font-body mt-[-6px]"
            >
              <Link to="/register">
                <motion.button
                  {...hoverScale}
                  className="group bg-gradient-to-r from-blue-700 to-cyan-600 rounded-full text-white px-6 py-1.5 rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/40 flex items-center gap-2 cursor-pointer"
                >
                  {t('home.hero.getStarted')}
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </motion.button>
              </Link>

              <motion.button
                {...hoverScale}
                data-tour="register-btn"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-1.5 rounded-lg font-semibold hover:bg-white/20 flex items-center gap-2"
                onClick={startTour}
              >
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[20px]">▶</span>
                {t('home.hero.viewDemo')}
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/*  FEATURES SECTION  */}
        <div className="features relative py-24 bg-gradient-to-br from-slate-100 via-blue-300/20 to-slate-100 overflow-hidden">

          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>

          <div className="features-inner relative container mx-auto px-8">

            <motion.div
              className="features-header text-center mb-20 mt-[-20px]"
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-100 border border-blue-200 rounded-full">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest text-blue-700 uppercase font-modern">
                  ⚡ {t('home.features.badge')}
                </span>
              </div>

              <h2 className="features-title text-4xl md:text-6xl font-bold mb-6 font-modern">
                <span className="text-slate-900">{t('home.features.titlePart1')} </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradientMove">
                  {t('home.features.titlePart2')}
                </span>
              </h2>

              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-900"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-500"></span>
              </div>

              <p className="features-subtitle text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed font-modern font-light">
                {t('home.features.subtitle1')}
                <span className="text-blue-600 font-semibold"> {t('home.features.subtitleHighlight')}</span>.
              </p>
            </motion.div>

            <motion.div
              className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[-30px]"
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              variants={staggerContainer}
            >
              <FeatureCard
                icon={<Ship className="w-7 h-7" />}
                title={t('home.features.cards.boat.title')}
                desc={t('home.features.cards.boat.desc')}
              />
              <FeatureCard
                icon={<MapPin className="w-7 h-7" />}
                title={t('home.features.cards.gps.title')}
                desc={t('home.features.cards.gps.desc')}
              />
              <FeatureCard
                icon={<Wrench className="w-7 h-7" />}
                title={t('home.features.cards.maintenance.title')}
                desc={t('home.features.cards.maintenance.desc')}
              />
              <FeatureCard
                icon={<PieChart className="w-7 h-7" />}
                title={t('home.features.cards.finance.title')}
                desc={t('home.features.cards.finance.desc')}
              />
              <FeatureCard
                icon={<CloudRain className="w-7 h-7" />}
                title={t('home.features.cards.weather.title')}
                desc={t('home.features.cards.weather.desc')}
              />
              <FeatureCard
                icon={<QrCode className="w-7 h-7" />}
                title={t('home.features.cards.qr.title')}
                desc={t('home.features.cards.qr.desc')}
              />
            </motion.div>
          </div>
        </div>

        {/*  STEPS SECTION  */}
        <div className="steps-section relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">

          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-100/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

          <div className="steps-wrapper relative container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-16 max-w-7xl">

            <motion.div
              className="flex-1 relative z-10"
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-100/80 backdrop-blur-sm rounded-full border border-blue-200">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                  {t('home.steps.badge')}
                </span>
              </div>

              <h2 className="steps-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
                {t('home.steps.titlePart1')}{" "}
                <span className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                  {t('home.steps.titlePart2')}
                </span>
              </h2>

              <p className="steps-subtext text-lg text-slate-600 mb-12 max-w-lg">
                {t('home.steps.subtitle')}
              </p>

              <motion.div
                className="space-y-6 relative"
                initial="initial"
                whileInView="animate"
                viewport={viewportConfig}
                variants={staggerContainer}
              >
                <div className="absolute left-[38px] top-16 bottom-16 w-[2px] bg-gradient-to-b from-blue-400 via-cyan-400 to-transparent"></div>

                <EnhancedStepItem
                  num="01"
                  title={t('home.steps.step1.title')}
                  desc={t('home.steps.step1.desc')}
                />
                <EnhancedStepItem
                  num="02"
                  title={t('home.steps.step2.title')}
                  desc={t('home.steps.step2.desc')}
                />
                <EnhancedStepItem
                  num="03"
                  title={t('home.steps.step3.title')}
                  desc={t('home.steps.step3.desc')}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="steps-image flex-1 relative"
              variants={fadeInRight}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl scale-95"></div>

              <div className="relative group">
                <motion.img
                  src={mockupImage}
                  alt="Dashboard on Tablet"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                />

                <motion.div
                  {...floatUp}
                  className="floating-status-card absolute -top-6 -left-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/60 min-w-[260px]"
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
                        {t('home.steps.floating.statusLabel')}
                      </p>
                      <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        {t('home.steps.floating.statusValue')}
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  {...floatDown}
                  className="floating-efficiency-card absolute -bottom-8 -right-6 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/60 min-w-[220px]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      {t('home.steps.floating.efficiencyLabel')}
                    </p>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        98.4%
                      </p>
                      <p className="text-xs text-green-600 font-semibold mt-1">
                        ↑ {t('home.steps.floating.efficiencyChange')}
                      </p>
                    </div>
                  </div>
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

                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-white/60 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-slate-700">{t('home.steps.floating.live')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/*  CTA SECTION  */}
        <div className="cta-section py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-10 max-w-7xl">

            <motion.div
              className="cta-box relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 py-20 px-8 md:px-20 text-center shadow-2xl"
              variants={scaleIn}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
            >
              <img
                src="https://camo.githubusercontent.com/5e45bc648dba68520ce949a53690af6bcef2880f84a1d46cbb1636649afd6d84/68747470733a2f2f796176757a63656c696b65722e6769746875622e696f2f73616d706c652d696d616765732f696d6167652d313032312e6a7067"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />

              <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

              <motion.div
                className="relative z-10 max-w-2xl mx-auto"
                initial="initial"
                whileInView="animate"
                viewport={viewportConfig}
                variants={staggerContainer}
              >
                <motion.div
                  variants={fadeInUp}
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span className="text-sm font-semibold text-cyan-100 uppercase tracking-wider">
                    {t('home.cta.badge')}
                  </span>
                </motion.div>

                <motion.h2
                  variants={fadeInUp}
                  className="cta-heading text-4xl md:text-5xl font-bold text-white mb-6"
                >
                  {t('home.cta.titlePart1')}{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-teal-200 bg-clip-text text-transparent">
                    {t('home.cta.titlePart2')}
                  </span>
                </motion.h2>

                <motion.p
                  variants={fadeInUp}
                  className="cta-desc text-blue-100 mb-10 text-lg"
                >
                  {t('home.cta.desc')}
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <motion.button
                    {...hoverScale}
                    className="cta-btn-primary group bg-white text-blue-950 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-50 flex items-center gap-2 shadow-lg"
                  >
                    <Link to="/register">
                      {t('home.cta.getStartedBtn')}
                    </Link>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    {...hoverScale}
                    className="cta-btn-secondary bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20"
                  >
                    {t('home.cta.contactBtn')}
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

// ============ Reusable Animated Components ============
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

const EnhancedStepItem = ({ num, title, desc }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ x: 10 }}
      className="group flex gap-6 items-start p-4 rounded-2xl hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
        >
          <span className="text-2xl font-bold text-white">{num}</span>
        </motion.div>
      </div>

      <div className="flex-1 pt-2">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

const responsiveStyles = `
  /* ==============================
     LAPTOP (max-width: 1280px)
     ============================== */
  @media (max-width: 1280px) {
    .hero-content { padding-left: 4rem !important; padding-right: 4rem !important; padding-top: 14rem !important; }
    .hero-heading { font-size: 2.5rem !important; }
    .steps-wrapper { padding-left: 3rem !important; padding-right: 3rem !important; gap: 3rem !important; }
    .cta-box { padding-top: 4rem !important; padding-bottom: 4rem !important; padding-left: 4rem !important; padding-right: 4rem !important; }
  }

  /* ==============================
     TABLET LANDSCAPE (max-width: 1024px)
     ============================== */
  @media (max-width: 1024px) {
    .hero-content { padding-left: 2.5rem !important; padding-right: 2.5rem !important; padding-top: 11rem !important; }
    .hero-heading { font-size: 2rem !important; margin-top: 0 !important; margin-bottom: 1.5rem !important; }
    .hero-desc { margin-top: 0 !important; margin-bottom: 1.5rem !important; }
    .hero-buttons { margin-top: 0 !important; }
    .features { padding-top: 4rem !important; padding-bottom: 4rem !important; }
    .features-inner { padding-left: 2rem !important; padding-right: 2rem !important; }
    .features-header { margin-bottom: 3rem !important; margin-top: 0 !important; }
    .features-title { font-size: 2.5rem !important; }
    .features-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.25rem !important; margin-top: 0 !important; }
    .steps-section { padding-top: 4rem !important; padding-bottom: 4rem !important; }
    .steps-wrapper { flex-direction: column !important; padding-left: 2rem !important; padding-right: 2rem !important; gap: 3rem !important; }
    .steps-heading { font-size: 2rem !important; }
    .steps-subtext { margin-bottom: 2rem !important; }
    .steps-image { width: 100% !important; }
    .floating-status-card, .floating-efficiency-card { display: none !important; }
    .cta-section { padding-top: 4rem !important; padding-bottom: 4rem !important; }
    .cta-box { padding-top: 3.5rem !important; padding-bottom: 3.5rem !important; padding-left: 3rem !important; padding-right: 3rem !important; }
    .cta-heading { font-size: 2rem !important; }
  }

  /* ==============================
     TABLET PORTRAIT (max-width: 768px)
     ============================== */
  @media (max-width: 768px) {
    .hero-content { padding-left: 1.5rem !important; padding-right: 1.5rem !important; padding-top: 9rem !important; }
    .hero-heading { font-size: 1.75rem !important; margin-bottom: 1.25rem !important; line-height: 1.3 !important; }
    .hero-desc { margin-bottom: 1.25rem !important; font-size: 0.875rem !important; max-width: 100% !important; }
    .hero-buttons { gap: 0.75rem !important; }
    .hero-buttons button { font-size: 0.875rem !important; padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
    .features { padding-top: 3rem !important; padding-bottom: 3rem !important; }
    .features-inner { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
    .features-header { margin-bottom: 2rem !important; }
    .features-title { font-size: 1.875rem !important; }
    .features-subtitle { font-size: 0.9rem !important; }
    .features-grid { grid-template-columns: 1fr !important; gap: 1rem !important; margin-top: 0 !important; }
    .steps-section { padding-top: 3rem !important; padding-bottom: 3rem !important; }
    .steps-wrapper { padding-left: 1.25rem !important; padding-right: 1.25rem !important; gap: 2.5rem !important; }
    .steps-heading { font-size: 1.75rem !important; margin-bottom: 0.75rem !important; }
    .steps-subtext { font-size: 0.9rem !important; margin-bottom: 1.5rem !important; }
    .cta-section { padding-top: 3rem !important; padding-bottom: 3rem !important; }
    .cta-box { padding-top: 3rem !important; padding-bottom: 3rem !important; padding-left: 1.5rem !important; padding-right: 1.5rem !important; border-radius: 1.25rem !important; }
    .cta-heading { font-size: 1.75rem !important; margin-bottom: 0.75rem !important; }
    .cta-desc { font-size: 0.9rem !important; margin-bottom: 1.5rem !important; }
    .cta-buttons { flex-direction: column !important; width: 100% !important; gap: 0.75rem !important; }
    .cta-btn-primary, .cta-btn-secondary { width: 100% !important; justify-content: center !important; }
  }

  /* ==============================
     MOBILE (max-width: 640px)
     ============================== */
  @media (max-width: 640px) {
    .hero-content { padding-left: 1.25rem !important; padding-right: 1.25rem !important; padding-top: 8rem !important; }
    .hero-heading { font-size: 1.5rem !important; }
    .hero-desc { font-size: 0.8rem !important; }
    .hero-buttons button { font-size: 0.8rem !important; padding-left: 1rem !important; padding-right: 1rem !important; padding-top: 0.375rem !important; padding-bottom: 0.375rem !important; }
    .features-title { font-size: 1.625rem !important; }
    .features-subtitle { font-size: 0.85rem !important; }
    .steps-heading { font-size: 1.5rem !important; }
    .steps-subtext { font-size: 0.85rem !important; }
    .cta-heading { font-size: 1.5rem !important; }
    .cta-desc { font-size: 0.85rem !important; }
  }

  /* ==============================
     SMALL MOBILE (max-width: 480px)
     ============================== */
  @media (max-width: 480px) {
    .hero-content { padding-left: 1rem !important; padding-right: 1rem !important; padding-top: 7rem !important; }
    .hero-heading { font-size: 1.35rem !important; line-height: 1.4 !important; }
    .features-inner { padding-left: 1rem !important; padding-right: 1rem !important; }
    .features-title { font-size: 1.5rem !important; }
    .steps-wrapper { padding-left: 1rem !important; padding-right: 1rem !important; }
    .steps-heading { font-size: 1.35rem !important; }
    .cta-box { padding-left: 1.25rem !important; padding-right: 1.25rem !important; padding-top: 2.5rem !important; padding-bottom: 2.5rem !important; }
    .cta-heading { font-size: 1.35rem !important; }
  }
`;

export default HomePage;
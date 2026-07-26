import { Anchor, Shield, Sparkles, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import CoreFeatureAccordion from "../../components/features/CoreFeatureAccordion";
import SpecialFeatureCard from "../../components/features/SpecialFeatureCard";
import UpcomingFeatureCard from "../../components/features/UpcomingFeatureCard";
import MissionVision from "../../components/features/MissionVission";
import { coreFeatures, specialFeatures, upcomingFeatures }
  from "../../data/featuresData";
import HomeNavBar from "../../components/HomeNavBar";

const Features = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageToggle = () => {
    const newLang = i18n.language === "en" ? "si" : "en";
    i18n.changeLanguage(newLang);
  };

  const heroStats = [
    ["🚤", t("features.hero.stats.features.count"), t("features.hero.stats.features.label")],
    ["🛡️", t("features.hero.stats.safety.count"),   t("features.hero.stats.safety.label")],
    ["🔮", t("features.hero.stats.coming.count"),   t("features.hero.stats.coming.label")],
    ["⏰", t("features.hero.stats.live.count"),     t("features.hero.stats.live.label")],
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavBar />
      {/* ---------- HERO ---------- */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900
                          to-cyan-800 text-white py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/10
                        rounded-full blur-3xl anim-float" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 border
                          border-white/20 flex items-center justify-center mb-5 anim-float">
            <Anchor className="text-cyan-400" size={30} />
          </div>
          <h1 className="text-4xl font-black mb-2 anim-fade-up">DEEWARAYA</h1>
          <p className="anim-shimmer text-xl font-bold mb-6">
            {t("features.hero.subtitle")}
          </p>
          <p className="text-blue-200 mb-8">
            {t("features.hero.tagline")}
          </p>

          {/* Icon stats */}
          <div className="flex justify-center gap-3 flex-wrap">
            {heroStats.map(([i, n, l], k) => (
              <div
                key={k}
                className="bg-white/10 border border-white/15 rounded-xl
                           px-4 py-3 min-w-[80px] anim-pop"
                style={{ animationDelay: `${k * 0.1}s` }}
              >
                <div className="text-2xl">{i}</div>
                <div className="text-lg font-bold">{n}</div>
                <div className="text-[10px] text-blue-300">{l}</div>
              </div>
            ))}
          </div>
          <ChevronDown
            className="mx-auto mt-8 animate-bounce text-blue-300"
            size={26}
          />
        </div>
      </section>

      {/* ---------- CORE ---------- */}
      <section className="max-w-3xl mx-auto px-5 py-16">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700
                           px-3 py-1.5 rounded-full text-xs font-bold mb-3">
            <Anchor size={13} /> {t("features.core.badge")}
          </span>
          <h2 className="text-2xl font-bold text-gray-900">
            {t("features.core.title")}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {t("features.core.hint")}
          </p>
        </div>

        <div className="space-y-3">
          {coreFeatures.map((f, i) => (
            <CoreFeatureAccordion key={f.id} feature={f} index={i} />
          ))}
        </div>
      </section>

      {/* ---------- SPECIAL ---------- */}
      <section className="bg-blue-800 py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 bg-red-500/20
                             text-red-400 border border-red-500/30
                             px-3 py-1.5 rounded-full text-xs font-bold mb-3 anim-glow">
              <Shield size={13} /> {t("features.special.badge")}
            </span>
            <h2 className="text-2xl font-bold text-white">
              {t("features.special.title")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {specialFeatures.map((f, i) => (
              <SpecialFeatureCard key={f.id} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MISSION ---------- */}
      <MissionVision />

      {/* ---------- UPCOMING ---------- */}
      <section className="bg-gradient-to-b from-gray-50 to-purple-50 py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 bg-purple-100
                             text-purple-700 px-3 py-1.5 rounded-full
                             text-xs font-bold mb-3">
              <Sparkles size={13} /> {t("features.upcoming.badge")}
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              {t("features.upcoming.title")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {upcomingFeatures.map((f, i) => (
              <UpcomingFeatureCard key={f.id} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-gradient-to-r from-blue-900 to-cyan-800
                          text-white text-center py-16 px-6">
        <Anchor className="mx-auto mb-3 text-cyan-300 anim-float" size={36} />
        <h2 className="text-2xl font-bold mb-6">
          {t("features.cta.title")}
        </h2>
        <button className="bg-white text-blue-900 px-8 py-3.5 rounded-full
                           font-bold hover:scale-105 transition shadow-lg">
          {t("features.cta.button")}
        </button>
      </section>

    </div>
  );
};

export default Features;
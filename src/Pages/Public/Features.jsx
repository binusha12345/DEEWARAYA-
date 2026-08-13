// src/pages/features/Features.jsx

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Anchor,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Plus,
  Radio,
  MapPin,
  Bell,
  Users,
  Waves,
  Navigation,
  LifeBuoy,
  Signal,
  Cloud,
  BarChart3,
  Target,
  Eye,
  PlayCircle,
} from "lucide-react";

import HomeNavBar from "../../components/HomeNavBar";
import HomeFooter from "../../components/HomeFooter";

/* ─────────────────────────────────────────────
   FEATURE DATA
   ───────────────────────────────────────────── */

const coreFeatures = [
  {
    id: "tracking",
    icon: Navigation,
    title: "Real-time vessel tracking",
    description:
      "Monitor the exact location, speed, and heading of every boat in your fleet, updated live from the sea.",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1200&auto=format&fit=crop&q=80",
    points: [
      "GPS position refresh every 30 seconds",
      "Historical route playback for the last 90 days",
      "Speed, heading, and idle time analytics",
      "Multi-vessel view on a single dashboard",
    ],
  },
  {
    id: "coverage",
    icon: Signal,
    title: "Network coverage map",
    description:
      "Plan every trip with confidence using our detailed offshore network coverage overlays.",
    points: [
      "Live cellular and satellite coverage layers",
      "Signal strength indicators along common fishing routes",
      "Offline-ready map tiles for low-connectivity zones",
    ],
  },
  {
    id: "fleet",
    icon: Anchor,
    title: "Fleet management dashboard",
    description:
      "Manage vessels, crew, and equipment records from a single unified interface.",
    points: [
      "Vessel registration and document management",
      "Crew assignment and shift scheduling",
      "Maintenance logs and service reminders",
    ],
  },
  {
    id: "weather",
    icon: Cloud,
    title: "Weather & sea conditions",
    description:
      "Access accurate marine forecasts and receive alerts before conditions change.",
    points: [
      "Wind, wave, and swell forecasts up to 7 days ahead",
      "Storm and rough-sea advisories",
      "Sunrise, sunset, and tide information",
    ],
  },
];

const specialFeatures = [
  {
    id: "sms-alerts",
    icon: Bell,
    title: "SMS safety alerts",
    description:
      "Critical danger warnings delivered by SMS — no internet required on the vessel.",
    points: [
      "Wind, visibility, and wave-height warnings",
      "Storm and cyclone advisories",
      "Delivered even in offline coverage zones",
    ],
    badge: "Life saving",
  },
  {
    id: "navy-zones",
    icon: MapPin,
    title: "Navy barrier zones",
    description:
      "Restricted maritime zones mapped clearly with proximity alerts before crossing.",
    points: [
      "All official restricted zones pre-mapped",
      "Alert triggered 2 km before boundary",
      "SMS backup for offline devices",
    ],
    badge: "Compliance",
  },
  {
    id: "signal-lights",
    icon: Radio,
    title: "Signal strength indicators",
    description:
      "A simple traffic-light system that shows network signal reliability at sea.",
    points: [
      "Green, yellow, and red status indicators",
      "Historical signal patterns per route",
      "Helps plan check-in timing with shore",
    ],
    badge: "Smart",
  },
  {
    id: "anchor",
    icon: LifeBuoy,
    title: "Anchor detection",
    description:
      "Automatically detect when a vessel drops anchor and notify the fleet owner.",
    points: [
      "Precise anchor location logged on the map",
      "Distance-from-shore calculation",
      "Drift alert if vessel moves unexpectedly",
    ],
    badge: "Tracking",
  },
];

const upcomingFeatures = [
  {
    id: "analytics",
    icon: BarChart3,
    title: "Advanced fleet analytics",
    description:
      "In-depth reports on fuel efficiency, catch performance, and vessel utilization.",
    eta: "Q2 2025",
  },
  {
    id: "crew-app",
    icon: Users,
    title: "Dedicated crew mobile app",
    description:
      "A companion app for crew members with schedules, check-ins, and emergency tools.",
    eta: "Q3 2025",
  },
  {
    id: "weather-ai",
    icon: Waves,
    title: "AI weather predictions",
    description:
      "Machine-learning models trained on local sea conditions for hyperlocal forecasts.",
    eta: "Q4 2025",
  },
];

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */

const Features = () => {
  const { t } = useTranslation();

  const sections = [
    {
      href: "#core-features",
      icon: Anchor,
      label: "Core features",
      count: coreFeatures.length,
    },
    {
      href: "#safety-features",
      icon: ShieldCheck,
      label: "Safety features",
      count: specialFeatures.length,
    },
    {
      href: "#upcoming-features",
      icon: Sparkles,
      label: "Coming soon",
      count: upcomingFeatures.length,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HomeNavBar />

      {/* ═════════════════ HERO WITH IMAGE ═════════════════ */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="absolute inset-x-0 top-0 bg-blue-600" />
        <div className="absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full bg-blue-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Hero copy */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-blue-200 bg-white px-3 py-2">
                <Anchor size={15} className="text-blue-700" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                  Deewaraya Platform
                </span>
              </div>

              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 md:text-5xl lg:text-[52px]">
                Everything your fleet needs,
                <span className="text-blue-700"> in one platform.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                {t(
                  "features.hero.tagline",
                  "Real-time tracking, safety alerts, and fleet analytics — purpose-built for fishing operations."
                )}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#core-features"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
                >
                  Explore features
                  <ArrowRight size={16} />
                </a>

               {/*} <a
                  href="#cta"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
                >
                  <PlayCircle size={16} />
                  Watch demo
                </a>*/}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80"
                  alt="Fishing fleet at sea"
                  className="h-[360px] w-full object-cover md:h-[420px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                {/* Live indicator overlay */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-white/95 px-3 py-1.5 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-600 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                  </span>
                  <span className="text-xs font-semibold text-slate-800">
                    Live tracking active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick section navigation */}
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.href}
                  href={s.href}
                  className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-blue-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                      <Icon size={15} />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {s.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                      {s.count}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════ FEATURED IMAGE BAND ═════════════════ */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <div className="relative order-2 overflow-hidden rounded-xl border border-slate-200 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1587380541190-4ce2723d508e?w=1200&auto=format&fit=crop&q=80"
                alt="Marine operations dashboard"
                className="h-[380px] w-full object-cover"
              />
            </div>

            <div className="order-1 md:order-2">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-px w-8 bg-blue-700" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                  Why Deewaraya
                </span>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Purpose-built for Sri Lankan fishing operations.
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Every feature is designed with input from fleet operators in
                Ambalangoda and beyond. From offline SMS alerts to navy zone
                warnings, we build what fishing communities actually need.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Works offline with SMS fallback",
                  "Available in Sinhala, Tamil, and English",
                  "Designed for daily use at sea",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <div className="h-2 w-2 rounded-full bg-blue-700" />
                    </div>
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════ SECTION 01: CORE ═════════════════ */}
      <section id="core-features" className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-5 py-20 md:px-8">
          <SectionHeader
            number="01"
            icon={Anchor}
            eyebrow="Core features"
            title="Built for daily fleet operations."
            description="Every capability designed around the workflows fishing operators use every day — from tracking vessels at sea to managing crews on shore."
          />

          <div className="mt-14 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="divide-y divide-slate-200">
              {coreFeatures.map((feature, index) => (
                <FeatureRow
                  key={feature.id}
                  number={index + 1}
                  feature={feature}
                  variant="framed"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════ SECTION 02: SAFETY ═════════════════ */}
      <section id="safety-features" className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            {/* Sticky header with image */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <SectionHeader
                number="02"
                icon={ShieldCheck}
                eyebrow="Safety features"
                title="Keep every crew member safe."
                description="Dedicated safety capabilities to help operators monitor conditions, respond to emergencies, and stay compliant."
              />

              <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&auto=format&fit=crop&q=80"
                  alt="Fishing boat with safety equipment"
                  className="h-[280px] w-full object-cover"
                />
              </div>
            </div>

            {/* Feature list */}
            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              {specialFeatures.map((feature, index) => (
                <FeatureRow
                  key={feature.id}
                  number={index + 1}
                  feature={feature}
                  variant="framed"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════ MISSION & VISION ═════════════════ */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-5 py-20 md:px-8">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-8 bg-blue-700" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                Our purpose
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Building for the future of fishing.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <MissionCard
              icon={Target}
              eyebrow="Our mission"
              title="Empower fishing communities with reliable technology."
              description="We build tools that improve safety, efficiency, and daily decision-making for fishing operators across Sri Lanka."
            />
            <MissionCard
              icon={Eye}
              eyebrow="Our vision"
              title="Set the standard for marine fleet operations."
              description="To become the trusted platform that fishing fleets rely on — from small operators to large commercial fleets."
            />
          </div>
        </div>
      </section>

      {/* ═════════════════ SECTION 03: UPCOMING ═════════════════ */}
      <section id="upcoming-features" className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20 md:px-8">
          <SectionHeader
            number="03"
            icon={Sparkles}
            eyebrow="Coming soon"
            title="What we're building next."
            description="A preview of features currently in development, prioritized based on feedback from active fleet operators."
          />

          <div className="mt-14 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="divide-y divide-slate-200">
              {upcomingFeatures.map((feature, index) => (
                <FeatureRow
                  key={feature.id}
                  number={index + 1}
                  feature={feature}
                  variant="framed"
                  comingSoon
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════ CTA WITH IMAGE ═════════════════ */}
      <section id="cta" className="relative overflow-hidden bg-blue-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1600&auto=format&fit=crop&q=80"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/95 to-blue-900/70" />
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

/* ─────────────────────────────────────────────
   STAT ITEM (used in hero overlay)
   ───────────────────────────────────────────── */

const StatItem = ({ value, label }) => (
  <div className="text-center">
    <div className="text-lg font-bold text-slate-900">{value}</div>
    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
      {label}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   SECTION HEADER
   ───────────────────────────────────────────── */

const SectionHeader = ({ number, icon: Icon, eyebrow, title, description }) => {
  return (
    <div>
      {number && (
        <div className="mb-6 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400">
            SECTION {number}
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
      )}

      <div className="max-w-2xl">
        <div className="mb-3 flex items-center gap-2">
          <Icon size={15} className="text-blue-700" />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
            {eyebrow}
          </span>
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          {title}
        </h2>

        {description && (
          <p className="mt-4 text-base leading-7 text-slate-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   FEATURE ROW (expandable)
   ───────────────────────────────────────────── */

const FeatureRow = ({
  number,
  feature,
  comingSoon = false,
  variant = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = feature.icon;

  const hasExpandableContent =
    (feature.points && feature.points.length > 0) || feature.eta;

  const containerPadding = variant === "framed" ? "px-6" : "";

  return (
    <div className={`transition-colors hover:bg-slate-50/60 ${containerPadding}`}>
      <button
        onClick={() => hasExpandableContent && setIsOpen(!isOpen)}
        disabled={!hasExpandableContent}
        className="w-full text-left"
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-start gap-4 py-7 md:gap-6 md:py-8">
          {/* Number */}
          <div className="pt-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-sm font-bold text-blue-700">
              {String(number).padStart(2, "0")}
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                <Icon size={17} />
              </div>

              <h3 className="text-base font-semibold tracking-tight text-slate-900 md:text-lg">
                {feature.title}
              </h3>

              {feature.badge && !comingSoon && (
                <span className="inline-flex rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  {feature.badge}
                </span>
              )}

              {comingSoon && (
                <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                  <Sparkles size={10} />
                  Coming soon
                </span>
              )}
            </div>

            <p className="pl-12 text-sm leading-6 text-slate-600 md:text-[15px]">
              {feature.description}
            </p>
          </div>

          {/* Expand icon */}
          {hasExpandableContent && (
            <div className="pt-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-md border transition-all ${
                  isOpen
                    ? "rotate-45 border-blue-300 bg-blue-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <Plus
                  size={14}
                  className={isOpen ? "text-blue-700" : "text-slate-500"}
                />
              </div>
            </div>
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isOpen && hasExpandableContent && (
        <div className="pb-8 pl-[3.5rem] pr-4 md:pl-[4rem]">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            {feature.image && (
              <div className="mb-4 overflow-hidden rounded-md border border-slate-200">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-40 w-full object-cover md:h-48"
                />
              </div>
            )}

            {feature.points && feature.points.length > 0 && (
              <>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Key capabilities
                </p>
                <ul className="space-y-2.5">
                  {feature.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-6 text-slate-700"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {feature.eta && (
              <div
                className={`${
                  feature.points ? "mt-4 border-t border-slate-200 pt-4" : ""
                } flex items-center gap-2 text-xs`}
              >
                <span className="font-semibold uppercase tracking-wider text-slate-500">
                  Expected release
                </span>
                <span className="rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 font-semibold text-blue-800">
                  {feature.eta}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   MISSION CARD
   ───────────────────────────────────────────── */

const MissionCard = ({ icon: Icon, eyebrow, title, description }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 transition-all hover:border-blue-300 hover:shadow-sm">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
        <Icon size={20} />
      </div>

      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
        {eyebrow}
      </div>

      <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">
        {title}
      </h3>

      <p className="text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
};

export default Features;
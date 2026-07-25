import { useState } from "react";
import { ChevronDown, Zap } from "lucide-react";

const colorMap = {
  cyan:   "from-cyan-400 to-blue-500",
  blue:   "from-blue-400 to-indigo-500",
  orange: "from-orange-400 to-red-500",
  sky:    "from-sky-400 to-cyan-500",
  green:  "from-emerald-400 to-green-600",
  pink:   "from-pink-400 to-rose-500",
  violet: "from-violet-400 to-purple-600",
};

const CoreFeatureAccordion = ({ feature, index }) => {
  const [open, setOpen] = useState(false);
  const grad = colorMap[feature.color] || colorMap.blue;

  return (
    <div
      className={`group rounded-2xl border bg-white transition-all duration-300
        ${open ? "border-transparent shadow-xl scale-[1.01]"
               : "border-gray-200 hover:shadow-md hover:-translate-y-0.5"}`}
      style={{ animation: `fadeUp .4s ease ${index * 0.06}s both` }}
    >
      {/* ---- HEADER (short text only) ---- */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4"
      >
        {/* Animated gradient icon tile */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${grad}
            flex items-center justify-center text-2xl shrink-0
            shadow-lg transition-transform duration-300
            ${open ? "scale-110 rotate-6" : "group-hover:scale-105"}`}
        >
          <span className={open ? "anim-float" : ""}>{feature.icon}</span>
        </div>

        {/* Title + one-line tagline */}
        <div className="flex-1 text-left">
          <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
          <p className="text-sm text-gray-500">{feature.tagline}</p>
        </div>

        {/* Mini stat pill */}
        <span className="hidden sm:inline-block text-[11px] font-semibold
                         px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
          {feature.stat}
        </span>

        {/* Arrow */}
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform duration-300
            ${open ? "rotate-180 text-blue-500" : ""}`}
        />
      </button>

      {/* ---- EXPANDED CONTENT ---- */}
      <div
        className={`overflow-hidden transition-all duration-500
          ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-5">
          {/* WHY — single sentence, highlighted */}
          <div className={`flex items-start gap-2 rounded-xl p-3 mb-4
                           bg-gradient-to-r ${grad} bg-opacity-10`}>
            <div className="rounded-lg bg-white/25 p-1.5">
              <Zap size={16} className="text-white" />
            </div>
            <p className="text-white text-sm font-medium leading-snug">
              {feature.why}
            </p>
          </div>

          {/* FACILITIES — icon chips, no paragraphs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {feature.facilities.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-xl bg-gray-50
                           px-3 py-2.5 border border-gray-100
                           hover:bg-white hover:border-gray-300
                           hover:shadow-sm hover:scale-[1.03]
                           transition-all cursor-default"
                style={{ animation: open ? `popIn .3s ease ${i * 0.05}s both` : "none" }}
              >
                <span className="text-lg">{f.i}</span>
                <span className="text-xs font-medium text-gray-700">{f.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreFeatureAccordion;
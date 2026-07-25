import { Heart, Target, Shield, Anchor, Users, Zap } from "lucide-react";

const values = [
  { icon: <Shield size={22} />, t: "Safety First" },
  { icon: <Users size={22} />,  t: "Community" },
  { icon: <Zap size={22} />,    t: "Efficiency" },
  { icon: <Anchor size={22} />, t: "Reliability" },
];

const MissionVision = () => (
  <section className="relative bg-gradient-to-b from-blue-950 to-cyan-900 py-20 px-6">
    <div className="max-w-5xl mx-auto text-center">

      {/* Icon */}
      <div className="w-16 h-16 mx-auto rounded-full bg-white/10 border
                      border-white/20 flex items-center justify-center mb-6 anim-float">
        <Anchor className="text-cyan-400" size={30} />
      </div>

      <h2 className="text-3xl font-bold text-white mb-10">Mission & Vision</h2>

      {/* Two short cards */}
      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        {/* Mission */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6
                        hover:bg-white/10 transition anim-fade-up">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center
                          justify-center mx-auto mb-4">
            <Heart className="text-red-400" size={22} />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Mission</h3>
          <p className="text-blue-200 text-base leading-relaxed">
            Protect every boat driver's life at sea. 🛟
          </p>
        </div>

        {/* Vision */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6
                        hover:bg-white/10 transition anim-fade-up"
             style={{ animationDelay: ".1s" }}>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center
                          justify-center mx-auto mb-4">
            <Target className="text-cyan-400" size={22} />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Vision</h3>
          <p className="text-blue-200 text-base leading-relaxed">
            Sri Lanka's most trusted fleet platform. 🇱🇰
          </p>
        </div>
      </div>

      {/* Values — icons only + 1 word */}
      <div className="grid grid-cols-4 gap-3">
        {values.map((v, i) => (
          <div key={i}
            className="rounded-xl bg-white/5 border border-white/10 p-4
                       hover:scale-105 hover:bg-white/10 transition"
            style={{ animation: `popIn .4s ease ${i * 0.08}s both` }}>
            <div className="text-cyan-400 flex justify-center mb-2">{v.icon}</div>
            <p className="text-white text-xs font-semibold">{v.t}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default MissionVision;
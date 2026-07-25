const SpecialFeatureCard = ({ feature, index }) => {
  const hero = feature.isHero;

  return (
    <div
      className={`relative rounded-2xl p-5 overflow-hidden group cursor-default
        border transition-all duration-300 hover:-translate-y-1
        ${hero
          ? "bg-gradient-to-br from-red-600 to-orange-600 border-red-400 sm:col-span-2"
          : "bg-white/5 border-white/10 hover:border-orange-400/40 backdrop-blur"}`}
      style={{ animation: `fadeUp .5s ease ${index * 0.08}s both` }}
    >
      {/* Badge */}
      <span
        className={`absolute top-4 right-4 text-[10px] font-black tracking-wider
          px-2 py-1 rounded-full
          ${hero ? "bg-white text-red-600 anim-glow"
                 : "bg-orange-500/20 text-orange-300"}`}
      >
        {feature.badge}
      </span>

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center
          text-3xl mb-3 transition-transform duration-300
          group-hover:scale-110 group-hover:-rotate-6
          ${hero ? "bg-white/20" : "bg-white/10"}`}
      >
        <span className="anim-float">{feature.icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>

      {/* ONE LINE only */}
      <p className={`text-sm mb-4 ${hero ? "text-orange-100" : "text-gray-400"}`}>
        {feature.line}
      </p>

      {/* Icon chips instead of bullet paragraphs */}
      <div className="flex flex-wrap gap-2">
        {feature.chips.map((c, i) => (
          <span
            key={i}
            className={`flex items-center gap-1.5 text-xs font-medium
              px-2.5 py-1.5 rounded-lg transition-transform hover:scale-105
              ${hero ? "bg-white/20 text-white"
                     : "bg-white/5 text-gray-300 border border-white/10"}`}
            style={{ animation: `popIn .3s ease ${0.2 + i * 0.06}s both` }}
          >
            <span>{c.i}</span>{c.t}
          </span>
        ))}
      </div>

      {/* Glow blob */}
      <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full
                      bg-orange-500/20 blur-3xl opacity-0
                      group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default SpecialFeatureCard;
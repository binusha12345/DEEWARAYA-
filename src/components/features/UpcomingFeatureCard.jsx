const UpcomingFeatureCard = ({ feature, index }) => (
  <div
    className="relative rounded-2xl border border-purple-200 bg-white p-5
               overflow-hidden group hover:-translate-y-1 hover:shadow-lg
               transition-all duration-300"
    style={{ animation: `fadeUp .5s ease ${index * 0.08}s both` }}
  >
    {/* Date chip */}
    <span className="absolute top-4 right-4 text-[10px] font-bold
                     text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
      {feature.date}
    </span>

    {/* Icon */}
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500
                    to-indigo-600 flex items-center justify-center text-3xl mb-3
                    group-hover:scale-110 group-hover:rotate-6 transition-transform">
      <span className="anim-float">{feature.icon}</span>
    </div>

    <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
    <p className="text-sm text-gray-500 mb-4">{feature.line}</p>

    {/* Chips */}
    <div className="flex flex-wrap gap-2 mb-4">
      {feature.chips.map((c, i) => (
        <span key={i}
          className="flex items-center gap-1.5 text-xs font-medium
                     bg-purple-50 text-purple-700 px-2.5 py-1.5 rounded-lg">
          <span>{c.i}</span>{c.t}
        </span>
      ))}
    </div>

    {/* Progress bar (visual instead of text) */}
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500
                     transition-all duration-1000"
          style={{ width: `${feature.progress}%` }}
        />
      </div>
      <span className="text-[10px] font-bold text-gray-400">
        {feature.progress}%
      </span>
    </div>
  </div>
);

export default UpcomingFeatureCard;
const interests = [
  { label: "AI", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  { label: "Startups", color: "bg-white/5 text-gray-300 border-white/10" },
  { label: "Robotics", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { label: "Programming", color: "bg-green-500/20 text-green-300 border-green-500/30" },
  { label: "Future Tech", color: "bg-white/5 text-gray-300 border-white/10" },
]

export default function TopInterests() {
  return (
    <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold">YOUR TOP INTERESTS</h3>
        <button className="text-[11px] text-cyan-400">View all →</button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {interests.map((i) => (
          <span
            key={i.label}
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${i.color}`}
          >
            {i.label}
          </span>
        ))}
      </div>
    </div>
  )
}

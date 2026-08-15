import { Code2, Sparkles, Bot } from "lucide-react"

const suggestions = [
  { icon: Code2, iconBg: "bg-purple-500/10", iconColor: "text-purple-400", title: "AI Coding Tools", meta: "12 new tools discovered", link: "Explore", linkColor: "text-purple-400" },
  { icon: Sparkles, iconBg: "bg-green-500/10", iconColor: "text-green-400", title: "AI Agents", meta: "8 new updates", link: "Explore", linkColor: "text-green-400" },
  { icon: Bot, iconBg: "bg-orange-500/10", iconColor: "text-orange-400", title: "Robotics", meta: "5 new discoveries", link: "Explore", linkColor: "text-orange-400" },
]

export default function SuggestionCards() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-bold tracking-wide">CUSTOMER SUGGESTIONS</h2>
          <span className="text-xs text-gray-500">Based on your recent activity</span>
        </div>
        <button className="text-xs text-cyan-400">View all →</button>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-3">
        {suggestions.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.title} className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.iconBg} ${s.iconColor}`}>
                <Icon size={18} />
              </div>
              <p className="text-sm font-semibold mt-3">{s.title}</p>
              <p className="text-xs text-gray-500">{s.meta}</p>
              <button className={`text-xs font-medium mt-2 ${s.linkColor}`}>{s.link} →</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

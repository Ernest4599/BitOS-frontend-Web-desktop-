import { Bookmark } from "lucide-react"

const recommended = [
  {
    gradient: "from-blue-600 to-cyan-400",
    title: "The next generation of AI software",
    meta: "4 min read",
    category: "AI",
    tag: "Recommended",
    tagColor: "text-purple-400",
  },
  {
    gradient: "from-orange-600 to-red-500",
    title: "How startups are building with AI",
    meta: "6 min read",
    category: "Startups",
    tag: "Popular with builders",
    tagColor: "text-green-400",
  },
  {
    gradient: "from-gray-600 to-gray-400",
    title: "Humanoid robots enter a new era",
    meta: "5 min read",
    category: "Robotics",
    tag: "Trending now",
    tagColor: "text-orange-400",
  },
]

export default function RecommendedCards() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-bold tracking-wide">RECOMMENDED</h2>
          <span className="text-xs text-gray-500">For you</span>
        </div>
        <button className="text-xs text-cyan-400">View all →</button>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-3">
        {recommended.map((r) => (
          <div key={r.title} className="bg-[#0f141c] border border-[#1c2432] rounded-xl overflow-hidden">
            <div className={`h-24 bg-gradient-to-br ${r.gradient}`} />
            <div className="p-3">
              <p className="text-sm font-semibold leading-snug">{r.title}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">{r.meta} · {r.category}</span>
                <Bookmark size={14} className="text-gray-500" />
              </div>
              <p className={`text-xs font-medium mt-1 ${r.tagColor}`}>{r.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

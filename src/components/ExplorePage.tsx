import { Search, ArrowRight, Play, ChevronRight, Star, TrendingUp, Calendar, BookOpen, Layers } from "lucide-react"
import { useState } from "react"

const topics = [
  { title: "AI", desc: "Intelligence, models, agents and the future.", bits: "128K bits", gradient: "from-blue-600 to-cyan-500" },
  { title: "Technology", desc: "What's next in tech and innovation.", bits: "96.5K bits", gradient: "from-purple-600 to-indigo-600" },
  { title: "Robotics", desc: "Machines, automation and humanoids.", bits: "42.1K bits", gradient: "from-green-700 to-teal-600" },
  { title: "Developer Teachings", desc: "Learn, build and level up.", bits: "78.3K bits", gradient: "from-cyan-700 to-blue-800" },
  { title: "AI Tools", desc: "Discover the best AI tools and apps.", bits: "65.2K bits", gradient: "from-teal-700 to-cyan-600" },
  { title: "Startups", desc: "Startups, funding and founders.", bits: "53.7K bits", gradient: "from-orange-600 to-yellow-600" },
]

const courses = [
  { level: "Beginner", levelColor: "bg-green-500/20 text-green-400", title: "Build an AI Agent from Scratch", desc: "Learn to build a powerful AI agent step by step.", lessons: "12 lessons", duration: "48 min", progress: 35, barColor: "bg-green-400" },
  { level: "Intermediate", levelColor: "bg-purple-500/20 text-purple-400", title: "Mastering Python for Developers", desc: "Level up your Python skills for real world projects.", lessons: "16 lessons", duration: "1h 12m", progress: 60, barColor: "bg-purple-400" },
  { level: "Advanced", levelColor: "bg-blue-500/20 text-blue-400", title: "System Design Deep Dive", desc: "Design scalable systems like a senior engineer.", lessons: "18 lessons", duration: "2h 05m", progress: 20, barColor: "bg-blue-400" },
]

const toolCategories = ["All", "Coding", "Research", "Design", "Automation", "Writing", "Productivity"]

const aiTools = [
  { name: "Cursor", desc: "AI Code Editor", rating: "4.8", iconColor: "text-gray-300" },
  { name: "Perplexity", desc: "AI Search Engine", rating: "4.7", iconColor: "text-cyan-400" },
  { name: "Midjourney", desc: "AI Image Generator", rating: "4.9", iconColor: "text-gray-300" },
  { name: "Zapier", desc: "Automation Platform", rating: "4.6", iconColor: "text-orange-400" },
  { name: "Vercel", desc: "Deploy Platform", rating: "4.7", iconColor: "text-white" },
]

const trendingTopics = [
  { rank: 1, title: "AI Agents", bits: "24.5K bits this week" },
  { rank: 2, title: "Humanoid Robots", bits: "18.2K bits this week" },
  { rank: 3, title: "Open Source AI", bits: "15.8K bits this week" },
  { rank: 4, title: "AI Coding Assistants", bits: "13.6K bits this week" },
  { rank: 5, title: "Neural Interfaces", bits: "9.3K bits this week" },
]

const recommendedPeople = [
  { name: "Sarah Chen", role: "AI Researcher", avatarColor: "bg-pink-500" },
  { name: "Alex Morgan", role: "Tech Journalist", avatarColor: "bg-blue-500" },
  { name: "TechFlow", role: "Tech Media", avatarColor: "bg-cyan-600" },
]

const popularBits = [
  { text: "Google's new AI model just changed the game.", author: "Alex Morgan", likes: "1.2K", comments: "342", gradient: "from-purple-700 to-indigo-800" },
  { text: "How I built a $0 → $10K micro SaaS with AI.", author: "Builder Labs", likes: "892", comments: "201", gradient: "from-orange-700 to-red-800" },
  { text: "Humanoid robots are closer than you think.", author: "Sarah Chen", likes: "1.1K", comments: "278", gradient: "from-gray-700 to-gray-900" },
]

const exploreMore = [
  { icon: Calendar, title: "Events", desc: "Discover tech events" },
  { icon: BookOpen, title: "Learning Paths", desc: "Structured learning" },
  { icon: Layers, title: "Collections", desc: "Curated by the community" },
]

export default function ExplorePage() {
  const [toolFilter, setToolFilter] = useState("All")

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold">Explore</h1>
        <p className="text-sm text-gray-500 mt-1">Discover what's happening across technology.</p>

        <div className="relative mt-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search topics, people, tools..."
            className="w-full bg-[#0f141c] border border-[#1c2432] focus:border-cyan-400/50 rounded-xl py-3 pl-11 pr-4 text-sm placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between mt-8">
          <h2 className="text-sm font-bold tracking-wide">EXPLORE TOPICS</h2>
          <button className="text-xs text-cyan-400">View all</button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3">
          {topics.map((t) => (
            <div key={t.title} className="bg-[#0f141c] border border-[#1c2432] rounded-xl overflow-hidden">
              <div className={`h-20 bg-gradient-to-br ${t.gradient}`} />
              <div className="p-3">
                <p className="text-sm font-semibold">{t.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{t.desc}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-gray-500">{t.bits}</span>
                  <ArrowRight size={13} className="text-cyan-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8">
          <h2 className="text-sm font-bold tracking-wide">DEVELOPER TEACHINGS</h2>
          <button className="text-xs text-cyan-400">View all</button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3">
          {courses.map((c) => (
            <div key={c.title} className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-3">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${c.levelColor}`}>
                {c.level}
              </span>
              <p className="text-sm font-semibold mt-2 leading-snug">{c.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-snug">{c.desc}</p>

              <div className="flex items-center justify-between mt-3">
                <span className="text-[11px] text-gray-500">{c.lessons} · {c.duration}</span>
                <button className="w-7 h-7 rounded-full border border-[#1c2432] flex items-center justify-center text-gray-300">
                  <Play size={11} />
                </button>
              </div>

              <div className="mt-2">
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${c.barColor}`} style={{ width: `${c.progress}%` }} />
                </div>
                <span className="text-[10px] text-gray-500 mt-1 block">{c.progress}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8">
          <h2 className="text-sm font-bold tracking-wide">AI TOOLS</h2>
          <button className="text-xs text-cyan-400">View all</button>
        </div>

        <div className="flex items-center gap-2 mt-3 overflow-x-auto">
          {toolCategories.map((c) => (
            <button
              key={c}
              onClick={() => setToolFilter(c)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                toolFilter === c ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-3 mt-3">
          {aiTools.map((t) => (
            <div key={t.name} className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-3">
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3 ${t.iconColor}`}>
                <Layers size={16} />
              </div>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
              <div className="flex items-center gap-1 mt-2">
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                <span className="text-[11px] text-gray-400">{t.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="w-52 flex-shrink-0 flex flex-col gap-3">
        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-wide">TRENDING TOPICS</h3>
            <button className="text-xs text-cyan-400">View all</button>
          </div>
          <div className="flex flex-col gap-3 mt-3">
            {trendingTopics.map((t) => (
              <div key={t.rank} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-gray-400 flex-shrink-0">
                  {t.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">{t.title}</p>
                  <p className="text-[10px] text-gray-500">{t.bits}</p>
                </div>
                <TrendingUp size={14} className="text-green-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-wide">RECOMMENDED PEOPLE</h3>
            <button className="text-xs text-cyan-400">View all</button>
          </div>
          <div className="flex flex-col gap-3 mt-3">
            {recommendedPeople.map((p) => (
              <div key={p.name} className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-full ${p.avatarColor} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">{p.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{p.role}</p>
                </div>
                <button className="text-[11px] font-medium border border-cyan-400/40 text-cyan-400 px-2.5 py-1 rounded-md flex-shrink-0 hover:bg-cyan-400/10">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-wide">POPULAR BITS</h3>
            <button className="text-xs text-cyan-400">View all</button>
          </div>
          <div className="flex flex-col gap-3 mt-3">
            {popularBits.map((b, i) => (
              <div key={i} className="flex gap-2.5">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${b.gradient} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-snug">{b.text}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                    <span>{b.author}</span>
                    <span>♥ {b.likes}</span>
                    <span>💬 {b.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-3">
          <h3 className="text-sm font-bold tracking-wide">EXPLORE MORE</h3>
          <div className="flex flex-col gap-3 mt-3">
            {exploreMore.map((e) => {
              const Icon = e.icon
              return (
                <button key={e.title} className="flex items-center gap-3 hover:bg-white/5 -mx-1 px-1 py-1 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-cyan-400">
                    <Icon size={15} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-semibold">{e.title}</p>
                    <p className="text-[10px] text-gray-500">{e.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-500" />
                </button>
              )
            })}
          </div>
        </div>
      </aside>
    </div>
  )
}

import { Home, FileText, Sparkles, MessageCircle, Compass, User, Settings, Crown, Moon, Sun, ChevronLeft } from "lucide-react"
import { useState } from "react"

const navItems = [
  { label: "Home", icon: Home },
  { label: "Feed", icon: FileText },
  { label: "AI", icon: Sparkles },
  { label: "Messages", icon: MessageCircle },
  { label: "Explore", icon: Compass },
]

const bottomItems = [
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
]

type SidebarProps = {
  active: string
  onSelect: (label: string) => void
}

export default function Sidebar({ active, onSelect }: SidebarProps) {
  const [isDark, setIsDark] = useState(true)

  return (
    <aside className="w-44 h-screen bg-[#0f141c] border-r border-[#1c2432] flex flex-col justify-between px-3 py-5 flex-shrink-0">
      <div>
        <div className="text-lg font-bold mb-6 px-1">
          bit<span className="text-cyan-400">OS</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.label
            return (
              <button
                key={item.label}
                onClick={() => onSelect(item.label)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-[#1c2432] my-3" />

        <nav className="flex flex-col gap-1">
          {bottomItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.label
            return (
              <button
                key={item.label}
                onClick={() => onSelect(item.label)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div>
        <div className="bg-white/5 rounded-lg p-3 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold">bitOS Pro</span>
            <Crown size={14} className="text-yellow-400" />
          </div>
          <p className="text-gray-400 text-[10px] mb-2">
            Your workspace. Upgraded.
          </p>
          <button className="w-full bg-white/10 hover:bg-white/20 rounded-md py-1.5 text-[10px] font-medium transition-colors">
            View Benefits →
          </button>
        </div>

        <div className="flex items-center justify-between mt-3 px-1">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-400"
          >
            {isDark ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-400">
            <ChevronLeft size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}

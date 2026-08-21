import { Search, Bell, TrendingUp, ChevronDown, Menu } from "lucide-react"

type HeaderProps = {
  onProfileClick?: () => void
  showMenuToggle?: boolean
  onMenuToggle?: () => void
}

export default function Header({ onProfileClick, showMenuToggle, onMenuToggle }: HeaderProps) {
  return (
    <header className="flex items-center gap-4 px-6 py-4 border-b border-[#1c2432]">
      {showMenuToggle && (
        <button
          onClick={(e) => { e.stopPropagation(); onMenuToggle?.() }}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <Menu size={20} className="text-gray-300" />
          <span className="text-lg font-bold">
            bit<span className="text-cyan-400">OS</span>
          </span>
        </button>
      )}

      <div className="flex-1 relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search anything on bitOS..."
          className="w-full bg-white/5 border border-[#1c2432] rounded-xl py-2.5 pl-10 pr-16 text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
          ⌘K
        </span>
      </div>

      <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-300">
        <Bell size={18} />
        <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center text-white">
          3
        </span>
      </button>

      <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-300">
        <TrendingUp size={18} />
      </button>

      <button onClick={onProfileClick} className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-white/5">
        <div className="w-7 h-7 rounded-full bg-gray-600" />
        <span className="text-sm font-medium">Youngest</span>
        <ChevronDown size={14} className="text-gray-500" />
      </button>
    </header>
  )
}

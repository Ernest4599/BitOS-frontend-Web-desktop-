import { Edit3, BarChart2, Share2, FileText, Repeat2, MessageCircle, Image as ImageIcon, Plus, BadgeCheck } from "lucide-react"
import { useState } from "react"

const tabs = ["Bits", "Rebits", "Replies", "Media"] as const
type Tab = typeof tabs[number]

const tabIcons: Record<Tab, any> = {
  Bits: FileText,
  Rebits: Repeat2,
  Replies: MessageCircle,
  Media: ImageIcon,
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Bits")

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-black h-64">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 flex items-end justify-between">
          <div className="w-28 h-28 rounded-full border-4 border-cyan-400/60 bg-gray-700 flex-shrink-0" />

          <div className="flex items-center gap-6 pb-2">
            <div className="text-sm">
              <span className="text-gray-300">Followers </span>
              <span className="font-bold">0</span>
            </div>
            <div className="w-px h-5 bg-white/20" />
            <div className="text-sm">
              <span className="text-gray-300">BR </span>
              <span className="font-bold">0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-1 mt-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Youngest Kingston</h1>
          <BadgeCheck size={18} className="text-cyan-400" />
        </div>
        <p className="text-sm text-gray-500">@youngestkingston</p>
        <p className="text-sm mt-2">Building software that solves real problems.</p>

        <div className="flex items-center gap-3 mt-4">
          <button className="flex items-center gap-2 border border-cyan-400/40 text-cyan-400 text-sm font-medium px-4 py-2 rounded-lg hover:bg-cyan-400/10">
            <Edit3 size={15} />
            Edit Profile
          </button>
          <button className="flex items-center gap-2 border border-[#1c2432] text-gray-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5">
            <BarChart2 size={15} />
            Dashboard
          </button>
          <button className="flex items-center gap-2 border border-[#1c2432] text-gray-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5">
            <Share2 size={15} />
            Share
          </button>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-6 border-b border-[#1c2432]">
        {tabs.map((t) => {
          const Icon = tabIcons[t]
          return (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === t ? "text-cyan-400 border-cyan-400" : "text-gray-500 border-transparent hover:text-gray-300"
              }`}
            >
              <Icon size={15} />
              {t}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col items-center text-center py-20">
        <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
          <FileText size={26} className="text-cyan-400" />
        </div>
        <h3 className="text-lg font-semibold">No {activeTab.toLowerCase()} yet</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xs">
          You haven't posted any bits yet. Share your thoughts, ideas and knowledge with the bitOS community.
        </p>
        <button className="flex items-center gap-2 border border-cyan-400/40 text-cyan-400 text-sm font-medium px-4 py-2.5 rounded-lg mt-5 hover:bg-cyan-400/10">
          <Plus size={15} />
          Create your first bit
        </button>
      </div>
    </div>
  )
}

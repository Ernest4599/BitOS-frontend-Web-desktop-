import { Bookmark, Share2 } from "lucide-react"

export default function TopStoryCard() {
  return (
    <div className="mt-6 bg-[#0f141c] border border-[#1c2432] rounded-2xl p-5 flex gap-5">
      <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 flex-shrink-0" />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md">
            TOP STORY
          </span>
          <div className="flex items-center gap-3 text-gray-500 text-xs">
            <span>2h ago</span>
            <Bookmark size={15} />
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-2">
          AI agents are moving beyond chatbots
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          A new generation of AI systems can now plan, reason, and execute complex tasks autonomously.
        </p>

        <div className="mt-3 text-xs text-gray-500">
          <span className="font-medium">ⓘ Why this matters to you</span>
          <p className="mt-0.5">You frequently interact with AI + software content.</p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <button className="text-cyan-400 text-sm font-medium">Read Analysis →</button>
          <div className="flex items-center gap-2 text-gray-500">
            <Bookmark size={16} />
            <Share2 size={16} />
          </div>
        </div>
      </div>
    </div>
  )
}

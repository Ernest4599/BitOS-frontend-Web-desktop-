import { Sparkles, ArrowRight } from "lucide-react"

export default function SummarizeBar() {
  return (
    <div className="mt-8 mb-8">
      <div className="flex items-baseline gap-2">
        <h2 className="text-sm font-bold tracking-wide">SUMMARIZE</h2>
        <span className="text-xs text-gray-500">Get the key points in seconds</span>
      </div>

      <div className="mt-3 bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <Sparkles size={18} className="text-white" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold">Summarize today's technology developments</p>
          <p className="text-xs text-gray-500">AI, Tech, Startups, Science and more</p>
        </div>

        <button className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium px-4 py-2 rounded-lg">
          Summarize
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}

const analysis = [
  {
    label: "WHAT CHANGED?",
    labelColor: "text-purple-400",
    text: "AI agents are becoming more autonomous and capable.",
  },
  {
    label: "WHY IT MATTERS",
    labelColor: "text-green-400",
    text: "This could change how software is built and businesses operate.",
  },
  {
    label: "WHAT'S NEXT?",
    labelColor: "text-cyan-400",
    text: "Expect rapid adoption across industries in the next 12-24 months.",
  },
]

export default function AnalysisCards() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-bold tracking-wide">ANALYSIS</h2>
          <span className="text-xs text-gray-500">What's changing and why it matters</span>
        </div>
        <button className="text-xs text-cyan-400">View all →</button>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-3">
        {analysis.map((a) => (
          <div key={a.label} className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 h-32 flex flex-col justify-between">
            <div>
              <p className={`text-xs font-semibold ${a.labelColor}`}>{a.label}</p>
              <p className="text-sm mt-2 leading-snug">{a.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

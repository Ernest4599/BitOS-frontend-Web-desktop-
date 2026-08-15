const updates = [
  { text: "OpenAI announces new models for developers", time: "5m ago" },
  { text: "Tesla unveils next-gen humanoid robot", time: "15m ago" },
  { text: "Apple reportedly working on AI-powered search", time: "22m ago" },
]

export default function LiveUpdatesWidget() {
  return (
    <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-3">
      <h3 className="text-xs font-bold">WHAT'S HAPPENING NOW</h3>
      <p className="text-[11px] text-gray-500 mt-0.5">Live updates from around the world</p>

      <div className="mt-3 flex flex-col gap-3">
        {updates.map((u, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs leading-snug">{u.text}</p>
            </div>
            <span className="text-[10px] text-gray-500 flex-shrink-0">{u.time}</span>
          </div>
        ))}
      </div>

      <button className="text-[11px] text-cyan-400 mt-3">View all live updates →</button>
    </div>
  )
}

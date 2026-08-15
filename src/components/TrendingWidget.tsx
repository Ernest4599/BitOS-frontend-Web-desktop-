const trending = [
  { rank: 1, tag: "#AI", posts: "24.6K posts" },
  { rank: 2, tag: "#Robotics", posts: "18.7K posts" },
  { rank: 3, tag: "#OpenAI", posts: "15.2K posts" },
  { rank: 4, tag: "#Startups", posts: "12.9K posts" },
  { rank: 5, tag: "#AIAgents", posts: "9.8K posts" },
]

export default function TrendingWidget() {
  return (
    <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold">TRENDING</h3>
        <button className="text-[11px] text-cyan-400">View all →</button>
      </div>

      <div className="mt-2 flex flex-col gap-2.5">
        {trending.map((t) => (
          <div key={t.rank} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-500 w-3">{t.rank}</span>
              <div>
                <p className="text-xs font-medium">{t.tag}</p>
                <p className="text-[10px] text-gray-500">{t.posts}</p>
              </div>
            </div>
            <div className="w-10 h-5 bg-gradient-to-r from-cyan-500/10 to-cyan-400/30 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

const markets = [
  { symbol: "BTC", price: "$66,523", change: "+2.35%", up: true },
  { symbol: "ETH", price: "$3,142", change: "+1.18%", up: true },
  { symbol: "NVDA", price: "$949.50", change: "+3.21%", up: true },
  { symbol: "AAPL", price: "$189.98", change: "+0.71%", up: true },
]

export default function MarketSnapshot() {
  return (
    <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold">MARKET SNAPSHOT</h3>
        <button className="text-[11px] text-cyan-400">View all →</button>
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        {markets.map((m) => (
          <div key={m.symbol} className="flex items-center justify-between">
            <span className="text-xs font-medium">{m.symbol}</span>
            <span className="text-xs">{m.price}</span>
            <span className="text-xs text-green-400">{m.change}</span>
            <div className="w-10 h-5 bg-gradient-to-r from-green-500/10 to-green-400/30 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

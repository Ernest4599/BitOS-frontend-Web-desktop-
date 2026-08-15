import { Sparkles, TrendingUp, Eye, MessageSquare, User, HelpCircle, Shield, Send, Paperclip, ThumbsUp, ThumbsDown, Copy } from "lucide-react"
import { useState } from "react"

type ChatMessage = {
  role: "user" | "ai"
  text: string
  bullets?: string[]
  time: string
}

const suggestedPrompts = [
  { icon: TrendingUp, label: "What's happening now" },
  { icon: Eye, label: "Why am I seeing this?" },
  { icon: MessageSquare, label: "Top discussions" },
  { icon: User, label: "My activity summary" },
  { icon: HelpCircle, label: "Explain a feature" },
  { icon: Shield, label: "Settings & privacy" },
]

export default function AIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "user",
      text: "Why am I seeing so much AI agents content?",
      time: "10:32 AM",
    },
    {
      role: "ai",
      text: "You're seeing more AI agents content because:",
      bullets: [
        "You've liked 24 bits about AI agents in the last 7 days",
        "You follow 7 accounts that post about AI agents",
        "You've spent 38% more time reading AI agents content",
        "You saved 5 AI agents related bits",
      ],
      time: "10:32 AM",
    },
  ])
  const [input, setInput] = useState("")

  function handleSend() {
    if (!input.trim()) return
    const userMsg: ChatMessage = { role: "user", text: input, time: "now" }
    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        role: "ai",
        text: "I'm still learning how to answer that — but I'm on it.",
        time: "now",
      },
    ])
    setInput("")
  }

  function handlePromptClick(label: string) {
    setInput(label)
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles size={28} className="text-cyan-400" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">bitOS AI</h1>
              <span className="flex items-center gap-1 text-xs text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                ONLINE
              </span>
            </div>
            <p className="text-sm text-gray-500">Your intelligence layer inside bitOS</p>
          </div>
        </div>
        <button className="flex items-center gap-2 border border-cyan-400/30 text-cyan-400 text-xs font-medium px-3 py-2 rounded-lg hover:bg-cyan-400/10">
          <Sparkles size={14} />
          AI Capabilities
        </button>
      </div>

      <div className="mt-4 bg-[#0f141c] border border-[#1c2432] rounded-2xl p-5 flex gap-5">
        <div className="w-20 h-20 rounded-full border-2 border-cyan-400/40 flex items-center justify-center flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-cyan-400 shadow-[0_0_20px_4px_rgba(34,211,238,0.5)]" />
        </div>

        <div className="flex-1">
          <p className="text-sm leading-relaxed">
            I only know everything about bitOS.
            <br />
            Every user. Every bit. Every interaction.
            <br />
            How can I help you today?
          </p>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {suggestedPrompts.map((p) => {
              const Icon = p.icon
              return (
                <button
                  key={p.label}
                  onClick={() => handlePromptClick(p.label)}
                  className="flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 border border-[#1c2432] rounded-lg px-3 py-2 transition-colors text-left"
                >
                  <Icon size={14} className="text-cyan-400 flex-shrink-0" />
                  {p.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 pr-1">
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex items-end justify-end gap-2">
              <div className="max-w-md bg-cyan-500/10 border border-cyan-400/20 rounded-2xl rounded-br-sm px-4 py-2.5">
                <p className="text-sm">{m.text}</p>
                <p className="text-[10px] text-gray-500 mt-1 text-right">{m.time} ✓✓</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0" />
            </div>
          ) : (
            <div key={i} className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full border border-cyan-400/40 flex items-center justify-center flex-shrink-0">
                <Sparkles size={14} className="text-cyan-400" />
              </div>
              <div className="max-w-md bg-[#0f141c] border border-[#1c2432] rounded-2xl rounded-bl-sm px-4 py-3">
                <p className="text-sm">{m.text}</p>
                {m.bullets && (
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {m.bullets.map((b, bi) => (
                      <li key={bi} className="text-xs text-gray-300 flex gap-2">
                        <span className="text-gray-500">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-[10px] text-gray-500 mt-2">{m.time}</p>
                <div className="flex items-center gap-3 mt-2 text-gray-500">
                  <button className="hover:text-white">
                    <Copy size={13} />
                  </button>
                  <button className="hover:text-green-400">
                    <ThumbsUp size={13} />
                  </button>
                  <button className="hover:text-red-400">
                    <ThumbsDown size={13} />
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 bg-[#0f141c] border border-[#1c2432] rounded-2xl px-3 py-2">
        <button className="text-gray-500 hover:text-white flex-shrink-0">
          <Paperclip size={18} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything about bitOS..."
          className="flex-1 bg-transparent text-sm placeholder-gray-500 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex-shrink-0"
        >
          <Send size={15} />
        </button>
      </div>

      <p className="text-center text-[11px] text-gray-500 mt-3">
        bitOS AI only knows about bitOS. For anything outside, I may not be able to help.
      </p>
    </div>
  )
}

import { Search, Filter, Edit, Phone, Video, Info, MoreHorizontal, Plus, Smile, Image as ImageIcon, Send, BellOff, CheckCheck, ArrowLeft } from "lucide-react"
import { useState } from "react"

type ChatMessage = {
  fromMe: boolean
  text: string
  time: string
  link?: { title: string; desc: string; source: string; image: string }
}

type Chat = {
  id: string
  name: string
  verified: boolean
  avatarColor: string
  initials?: string
  lastMessage: string
  time: string
  unread: number
  muted?: boolean
  online?: boolean
  about?: string
  messages: ChatMessage[]
}

const chats: Chat[] = [
  {
    id: "alex",
    name: "Alex Morgan",
    verified: true,
    avatarColor: "bg-blue-500",
    lastMessage: "Let's discuss the AI agents trend...",
    time: "10:32 AM",
    unread: 2,
    online: true,
    about: "Tech enthusiast | AI researcher. Building the future.",
    messages: [
      { fromMe: false, text: "Have you seen the latest AI agent discussion?", time: "10:28 AM" },
      { fromMe: true, text: "Yeah. The interesting part is how they're moving beyond simple chat interfaces.", time: "10:29 AM" },
      { fromMe: false, text: "Exactly. That's where things get interesting.", time: "10:30 AM" },
      {
        fromMe: false,
        text: "",
        time: "10:31 AM",
        link: {
          title: "The Rise of Autonomous AI Agents",
          desc: "A deep dive into how AI agents are being built to plan, execute and adapt in real-world...",
          source: "bitos.com",
          image: "purple",
        },
      },
      { fromMe: true, text: "Great read! Thanks for sharing.", time: "10:32 AM" },
    ],
  },
  {
    id: "sarah",
    name: "Sarah Chen",
    verified: true,
    avatarColor: "bg-pink-500",
    lastMessage: "You: Sounds good. I'll send it over.",
    time: "9:15 AM",
    unread: 1,
    online: true,
    messages: [{ fromMe: true, text: "Sounds good. I'll send it over.", time: "9:15 AM" }],
  },
  {
    id: "techflow",
    name: "TechFlow",
    verified: false,
    avatarColor: "bg-cyan-600",
    initials: "TF",
    lastMessage: "New Bit posted in #AI",
    time: "Yesterday",
    unread: 3,
    muted: true,
    messages: [{ fromMe: false, text: "New Bit posted in #AI", time: "Yesterday" }],
  },
  {
    id: "builder",
    name: "Builder Labs",
    verified: false,
    avatarColor: "bg-orange-600",
    initials: "BL",
    lastMessage: "Robert: Check this out",
    time: "Yesterday",
    unread: 0,
    online: true,
    messages: [{ fromMe: false, text: "Robert: Check this out", time: "Yesterday" }],
  },
  {
    id: "elon",
    name: "Elon Musk",
    verified: true,
    avatarColor: "bg-gray-600",
    lastMessage: "You: Exactly!",
    time: "Mon",
    unread: 0,
    messages: [{ fromMe: true, text: "Exactly!", time: "Mon" }],
  },
]

type GroupItem = {
  id: string
  name: string
  members: number
  avatarColor: string
  lastMessage: string
  time: string
  unread: number
}

const groups: GroupItem[] = [
  { id: "ai-innovators", name: "AI Innovators", members: 248, avatarColor: "bg-purple-600", lastMessage: "Maya: Shared a Bit", time: "Mon", unread: 0 },
  { id: "builders", name: "Builder Labs Team", members: 34, avatarColor: "bg-orange-600", lastMessage: "Robert: Check this out", time: "Yesterday", unread: 3 },
  { id: "startup-founders", name: "Startup Founders", members: 512, avatarColor: "bg-green-600", lastMessage: "New pinned message", time: "2d", unread: 0 },
]

type RequestItem = {
  id: string
  name: string
  avatarColor: string
  mutualInfo: string
}

const requests: RequestItem[] = [
  { id: "jordan", name: "Jordan Lee", avatarColor: "bg-red-500", mutualInfo: "3 mutual connections" },
  { id: "mia", name: "Mia Torres", avatarColor: "bg-indigo-500", mutualInfo: "Follows you" },
]

export default function MessagesPage() {
  const [tab, setTab] = useState<"Chats" | "Groups" | "Requests">("Chats")
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [input, setInput] = useState("")

  const active = chats.find((c) => c.id === selectedChat)

  function ChatListPanel() {
    return (
      <div className="w-72 flex-shrink-0 border-r border-[#1c2432] flex flex-col">
        <div className="flex items-center justify-between p-4 pb-2">
          <h1 className="text-2xl font-bold">Messages</h1>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-500 text-black">
            <Edit size={14} />
          </button>
        </div>

        <div className="flex items-center gap-5 px-4 border-b border-[#1c2432]">
          {(["Chats", "Groups", "Requests"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t ? "text-cyan-400 border-cyan-400" : "text-gray-500 border-transparent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full bg-white/5 border border-[#1c2432] rounded-lg py-1.5 pl-8 pr-2 text-xs placeholder-gray-500 focus:outline-none"
            />
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#1c2432] text-gray-400">
            <Filter size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {tab === "Chats" && chats.map((c) => (
            <button
              key={c.id}
              onClick={() => { setSelectedChat(c.id); setShowInfo(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${
                selectedChat === c.id ? "bg-white/5" : ""
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-11 h-11 rounded-full ${c.avatarColor} flex items-center justify-center text-xs font-bold`}>
                  {c.initials}
                </div>
                {c.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0a0e14]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold truncate">{c.name}</span>
                  <span className="text-[10px] text-gray-500 flex-shrink-0 ml-1">{c.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-gray-500 truncate">{c.lastMessage}</span>
                  {c.muted ? (
                    <BellOff size={12} className="text-gray-600 flex-shrink-0 ml-1" />
                  ) : c.unread > 0 ? (
                    <span className="bg-cyan-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ml-1">
                      {c.unread}
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          ))}

          {tab === "Groups" && groups.map((g) => (
            <button
              key={g.id}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
            >
              <div className={`w-11 h-11 rounded-full ${g.avatarColor} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                {g.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold truncate">{g.name}</span>
                  <span className="text-[10px] text-gray-500 flex-shrink-0 ml-1">{g.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-gray-500 truncate">{g.lastMessage}</span>
                  {g.unread > 0 && (
                    <span className="bg-cyan-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ml-1">
                      {g.unread}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-gray-600 mt-0.5">{g.members} members</p>
              </div>
            </button>
          ))}

          {tab === "Requests" && (
            requests.length === 0 ? (
              <p className="text-center text-xs text-gray-500 mt-8">No pending requests</p>
            ) : (
              requests.map((r) => (
                <div key={r.id} className="flex items-center gap-3 px-4 py-3">
                  <div className={`w-11 h-11 rounded-full ${r.avatarColor} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{r.name}</p>
                    <p className="text-xs text-gray-500 truncate">{r.mutualInfo}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button className="bg-cyan-500 hover:bg-cyan-400 text-black text-[11px] font-semibold px-3 py-1 rounded-md">
                        Accept
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-[11px] font-medium px-3 py-1 rounded-md">
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    )
  }

  if (!active) {
    return (
      <div className="flex h-full">
        <ChatListPanel />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
          <div className="relative w-20 h-16 mb-6">
            <div className="absolute left-0 top-0 w-14 h-11 bg-gray-700 rounded-2xl rounded-bl-sm flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
            <div className="absolute right-0 bottom-0 w-10 h-8 bg-teal-600 rounded-2xl rounded-br-sm" />
          </div>
          <h2 className="text-lg font-semibold">Your conversations, all in one place</h2>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            Start a new conversation or select a chat to continue messaging.
          </p>
          <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold px-4 py-2.5 rounded-xl mt-5">
            <Edit size={15} />
            New Message
          </button>
        </div>
      </div>
    )
  }

  if (showInfo) {
    return (
      <div className="flex h-full">
        <ChatListPanel />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1c2432]">
            <button onClick={() => setShowInfo(false)} className="text-gray-400 hover:text-white">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-sm font-semibold">Contact Info</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center text-center">
            <div className={`w-20 h-20 rounded-full ${active.avatarColor} flex-shrink-0`} />
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-base font-semibold">{active.name}</span>
              {active.verified && <CheckCheck size={14} className="text-cyan-400" />}
            </div>
            <span className="text-xs text-gray-500">@{active.id}</span>
            {active.online && (
              <span className="flex items-center gap-1 text-xs text-green-400 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Online
              </span>
            )}

            {active.about && (
              <div className="mt-6 w-full max-w-sm text-left">
                <p className="text-xs font-semibold text-gray-400">About</p>
                <p className="text-sm text-gray-300 mt-1">{active.about}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      <ChatListPanel />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1c2432]">
          <button onClick={() => setShowInfo(true)} className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${active.avatarColor} flex-shrink-0`} />
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold">{active.name}</span>
                {active.verified && <CheckCheck size={12} className="text-cyan-400" />}
              </div>
              {active.online && (
                <span className="flex items-center gap-1 text-[11px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Online
                </span>
              )}
            </div>
          </button>
          <div className="flex items-center gap-3 text-gray-400">
            <Phone size={17} />
            <Video size={17} />
            <button onClick={() => setShowInfo(true)}>
              <Info size={17} />
            </button>
            <MoreHorizontal size={17} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          <p className="text-center text-[11px] text-gray-500">Today</p>
          {active.messages.map((m, i) =>
            m.fromMe ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-xs bg-cyan-500/10 border border-cyan-400/20 rounded-2xl rounded-br-sm px-3 py-2">
                  <p className="text-sm">{m.text}</p>
                  <p className="text-[10px] text-gray-500 mt-1 text-right">{m.time} ✓✓</p>
                </div>
              </div>
            ) : (
              <div key={i} className="flex items-end gap-2">
                <div className={`w-7 h-7 rounded-full ${active.avatarColor} flex-shrink-0`} />
                <div className="max-w-xs">
                  {m.link ? (
                    <div className="bg-[#0f141c] border border-[#1c2432] rounded-2xl overflow-hidden">
                      <div className="h-24 bg-gradient-to-br from-purple-600 to-indigo-800" />
                      <div className="p-3">
                        <p className="text-sm font-semibold">{m.link.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{m.link.desc}</p>
                        <p className="text-[10px] text-cyan-400 mt-2">🔗 {m.link.source}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#0f141c] border border-[#1c2432] rounded-2xl rounded-bl-sm px-3 py-2">
                      <p className="text-sm">{m.text}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-gray-500 mt-1">{m.time}</p>
                </div>
              </div>
            )
          )}
        </div>

        <div className="flex items-center gap-2 p-3 border-t border-[#1c2432]">
          <button className="text-gray-400 flex-shrink-0">
            <Plus size={20} />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-white/5 rounded-full px-3 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 bg-transparent text-sm placeholder-gray-500 focus:outline-none"
            />
            <Smile size={16} className="text-gray-500 flex-shrink-0" />
            <ImageIcon size={16} className="text-gray-500 flex-shrink-0" />
            <span className="text-[10px] font-bold text-gray-500 flex-shrink-0">GIF</span>
          </div>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex-shrink-0">
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

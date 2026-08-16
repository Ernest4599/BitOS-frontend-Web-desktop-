import { UserPlus, MessageCircle, Share2, MoreHorizontal, FileText, Repeat2, MessageSquare, Image as ImageIcon, MapPin, Link2, Calendar, Heart, Repeat, Bookmark, BadgeCheck, Award, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { users } from "../data/users"

const tabs = ["Bits", "Rebits", "Replies", "Media"] as const
type Tab = typeof tabs[number]

const tabIcons: Record<Tab, any> = {
  Bits: FileText,
  Rebits: Repeat2,
  Replies: MessageSquare,
  Media: ImageIcon,
}

type UserProfilePageProps = {
  userId: string
  onBack: () => void
}

export default function UserProfilePage({ userId, onBack }: UserProfilePageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Bits")
  const [following, setFollowing] = useState(false)

  const user = users[userId]
  if (!user) return null

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs mb-3">
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-black h-64">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 flex items-end justify-between">
            <div className={`w-28 h-28 rounded-full border-4 border-cyan-400/60 ${user.avatarColor} flex-shrink-0`} />

            <div className="flex items-center gap-6 pb-2">
              <div className="text-sm">
                <span className="text-gray-300">Followers </span>
                <span className="font-bold">{user.followers}</span>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <div className="text-sm">
                <span className="text-gray-300">BR </span>
                <span className="font-bold">{user.br}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-1 mt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            {user.verified && <BadgeCheck size={18} className="text-cyan-400" />}
          </div>
          <p className="text-sm text-gray-500">{user.handle}</p>
          {user.bio && <p className="text-sm mt-2 leading-relaxed">{user.bio}</p>}

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setFollowing(!following)}
              className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                following
                  ? "border border-[#1c2432] text-gray-300 hover:bg-white/5"
                  : "border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10"
              }`}
            >
              <UserPlus size={15} />
              {following ? "Following" : "Follow"}
            </button>
            <button className="flex items-center gap-2 border border-[#1c2432] text-gray-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5">
              <MessageCircle size={15} />
              Message
            </button>
            <button className="flex items-center gap-2 border border-[#1c2432] text-gray-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5">
              <Share2 size={15} />
              Share
            </button>
            <button className="w-9 h-9 flex items-center justify-center border border-[#1c2432] rounded-lg text-gray-300 hover:bg-white/5">
              <MoreHorizontal size={15} />
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

        {user.posts.length === 0 ? (
          <div className="flex flex-col items-center text-center py-20">
            <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
              <FileText size={26} className="text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold">No bits yet</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-xs">
              {user.name} hasn't posted any bits yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-4">
            {user.posts.map((p, i) => (
              <div key={i} className="bg-[#0f141c] border border-[#1c2432] rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-full ${user.avatarColor} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold">{user.name}</span>
                        {user.verified && <BadgeCheck size={13} className="text-cyan-400" />}
                        <span className="text-xs text-gray-500">{user.handle} · {p.time}</span>
                      </div>
                      <MoreHorizontal size={15} className="text-gray-500" />
                    </div>
                    <p className="text-sm mt-2 leading-relaxed">{p.text}</p>

                    <div className="flex items-center gap-6 mt-3 text-gray-500">
                      <span className="flex items-center gap-1.5 text-xs">
                        <MessageSquare size={14} />
                        {p.comments}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs">
                        <Heart size={14} />
                        {p.likes}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs">
                        <Repeat size={14} />
                        {p.reposts}
                      </span>
                      <Bookmark size={14} className="ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <aside className="w-72 flex-shrink-0 flex flex-col gap-4">
        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4">
          <h3 className="text-sm font-bold">About</h3>
          {user.bio && <p className="text-xs text-gray-300 mt-2 leading-relaxed">{user.bio}</p>}
          {user.location && (
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-3">
              <MapPin size={13} />
              {user.location}
            </div>
          )}
          {user.website && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 mt-2">
              <Link2 size={13} />
              {user.website}
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
            <Calendar size={13} />
            Joined {user.joined}
          </div>
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4 grid grid-cols-3 text-center">
          <div>
            <p className="text-lg font-bold">{user.following}</p>
            <p className="text-[10px] text-gray-500">Following</p>
          </div>
          <div>
            <p className="text-lg font-bold">{user.followers}</p>
            <p className="text-[10px] text-gray-500">Followers</p>
          </div>
          <div>
            <p className="text-lg font-bold">{user.totalViews}</p>
            <p className="text-[10px] text-gray-500">Total Views</p>
          </div>
        </div>

        {user.topTopics.length > 0 && (
          <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Top Topics</h3>
              <button className="text-xs text-cyan-400">View all</button>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              {user.topTopics.map((t) => (
                <div key={t.tag} className="flex items-center justify-between">
                  <span className="text-xs bg-white/5 px-2 py-1 rounded-md">#{t.tag}</span>
                  <span className="text-[11px] text-gray-500">{t.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {user.achievements.length > 0 && (
          <div className="bg-[#0f141c] border border-[#1c2432] rounded-xl p-4">
            <h3 className="text-sm font-bold">Recent Achievements</h3>
            <div className="flex flex-col gap-3 mt-3">
              {user.achievements.map((a) => (
                <div key={a.title} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ${a.color}`}>
                    <Award size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">{a.title}</p>
                    <p className="text-[10px] text-gray-500">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}

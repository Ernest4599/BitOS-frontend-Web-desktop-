import { MessageCircle, Heart, Repeat2, Bookmark, Image as ImageIcon, ListOrdered, Smile, X, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef } from "react"

type MediaItem = {
  type: "image" | "video"
  url: string
}

type Reply = {
  id: string
  name: string
  avatarColor: string
  text: string
  likes: number
  liked: boolean
  reposts: number
  reposted: boolean
  replies: Reply[]
}

type Post = {
  name: string
  handle: string
  time: string
  category: string
  text: string
  likes: number
  reposts: number
  avatarColor: string
  badge?: string
  media?: MediaItem[]
  liked: boolean
  reposted: boolean
  bookmarked: boolean
  replies: Reply[]
}

function countReplies(replies: Reply[]): number {
  return replies.reduce((sum, r) => sum + 1 + countReplies(r.replies), 0)
}

function getNodeAtPath(replies: Reply[], path: string[]): Reply | null {
  if (path.length === 0) return null
  const [head, ...rest] = path
  const node = replies.find((r) => r.id === head)
  if (!node) return null
  if (rest.length === 0) return node
  return getNodeAtPath(node.replies, rest)
}

function addReplyAtPath(replies: Reply[], path: string[], newReply: Reply): Reply[] {
  if (path.length === 0) return [...replies, newReply]
  const [head, ...rest] = path
  return replies.map((r) =>
    r.id === head ? { ...r, replies: addReplyAtPath(r.replies, rest, newReply) } : r
  )
}

function toggleLikeAtPath(replies: Reply[], path: string[]): Reply[] {
  if (path.length === 1) {
    return replies.map((r) =>
      r.id === path[0] ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r
    )
  }
  const [head, ...rest] = path
  return replies.map((r) => (r.id === head ? { ...r, replies: toggleLikeAtPath(r.replies, rest) } : r))
}

function toggleRepostAtPath(replies: Reply[], path: string[]): Reply[] {
  if (path.length === 1) {
    return replies.map((r) =>
      r.id === path[0]
        ? { ...r, reposted: !r.reposted, reposts: r.reposted ? r.reposts - 1 : r.reposts + 1 }
        : r
    )
  }
  const [head, ...rest] = path
  return replies.map((r) => (r.id === head ? { ...r, replies: toggleRepostAtPath(r.replies, rest) } : r))
}

function Carousel({ media, maxHeight }: { media: MediaItem[]; maxHeight: string }) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  if (media.length === 0) return null

  function goTo(i: number) {
    setIndex(Math.max(0, Math.min(media.length - 1, i)))
  }

  function prev(e: React.MouseEvent) {
    e.stopPropagation()
    setIndex((i) => (i === 0 ? media.length - 1 : i - 1))
  }

  function next(e: React.MouseEvent) {
    e.stopPropagation()
    setIndex((i) => (i === media.length - 1 ? 0 : i + 1))
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    e.stopPropagation()
    const delta = touchStartX.current - touchEndX.current
    if (Math.abs(delta) > 40) {
      if (delta > 0) setIndex((i) => Math.min(media.length - 1, i + 1))
      else setIndex((i) => Math.max(0, i - 1))
    }
  }

  const current = media[index]

  return (
    <div
      className="relative mt-3 rounded-xl overflow-hidden bg-black/20 touch-pan-y"
      onClick={(e) => e.stopPropagation()}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {current.type === "image" ? (
        <img src={current.url} className={`w-full h-auto ${maxHeight} object-contain select-none`} draggable={false} />
      ) : (
        <video src={current.url} controls className={`w-full h-auto ${maxHeight} object-contain`} />
      )}

      {media.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1.5"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1.5"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i) }}
                className={`w-1.5 h-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>

          <span className="absolute top-2 right-2 bg-black/60 text-[10px] px-1.5 py-0.5 rounded-full">
            {index + 1}/{media.length}
          </span>
        </>
      )}
    </div>
  )
}

const initialPosts: Post[] = [
  {
    name: "Alex Morgan",
    handle: "@alexmorgan",
    time: "2h",
    category: "AI",
    text: "AI agents are changing how software gets built. The interesting part isn't the chatbot. It's what happens when the AI can actually execute the work.",
    likes: 318,
    reposts: 67,
    avatarColor: "bg-blue-500",
    liked: false,
    reposted: false,
    bookmarked: false,
    replies: [
      {
        id: "r1",
        name: "Priya S",
        avatarColor: "bg-purple-500",
        text: "This matches what we're seeing internally too.",
        likes: 4,
        liked: false,
        reposts: 0,
        reposted: false,
        replies: [
          {
            id: "r1-1",
            name: "Alex Morgan",
            avatarColor: "bg-blue-500",
            text: "Good to hear it's not just us!",
            likes: 2,
            liked: false,
            reposts: 0,
            reposted: false,
            replies: [],
          },
        ],
      },
      {
        id: "r2",
        name: "Dev Patel",
        avatarColor: "bg-orange-500",
        text: "Curious how this affects QA workflows.",
        likes: 1,
        liked: false,
        reposts: 0,
        reposted: false,
        replies: [],
      },
    ],
  },
  {
    name: "Youngest Kingston",
    handle: "@youngestkingston",
    time: "4h",
    category: "Technology",
    text: "We're building software differently now. What's one piece of software you think AI will completely change?",
    likes: 104,
    reposts: 21,
    avatarColor: "bg-yellow-500",
    badge: "PRO",
    liked: false,
    reposted: false,
    bookmarked: false,
    replies: [
      {
        id: "r3",
        name: "Marcus L",
        avatarColor: "bg-blue-400",
        text: "Probably project management tools.",
        likes: 0,
        liked: false,
        reposts: 0,
        reposted: false,
        replies: [],
      },
    ],
  },
  {
    name: "Sarah Chen",
    handle: "@sarahchen",
    time: "6h",
    category: "Startups",
    text: "Just shipped my first AI-powered product. 6 months of building, learning and iterating.",
    likes: 247,
    reposts: 48,
    avatarColor: "bg-pink-500",
    liked: false,
    reposted: false,
    bookmarked: false,
    replies: [],
  },
  {
    name: "TechFlow",
    handle: "@techflow",
    time: "7h",
    category: "News",
    text: "OpenAI announces new model that can reason across multiple modalities in real time.",
    likes: 412,
    reposts: 93,
    avatarColor: "bg-cyan-500",
    liked: false,
    reposted: false,
    bookmarked: false,
    replies: [],
  },
]

export default function Feed() {
  const [tab, setTab] = useState<"For You" | "Following">("For You")
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [text, setText] = useState("")
  const [mediaPreviews, setMediaPreviews] = useState<MediaItem[]>([])
  const [previewIndex, setPreviewIndex] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const [replyPath, setReplyPath] = useState<string[]>([])
  const [replyText, setReplyText] = useState("")

  function handleMediaPick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return
    const remaining = 10 - mediaPreviews.length
    const selected = Array.from(files).slice(0, remaining)

    selected.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const type = file.type.startsWith("video") ? "video" : "image"
        setMediaPreviews((prev) => [...prev, { type, url: reader.result as string }])
      }
      reader.readAsDataURL(file)
    })

    e.target.value = ""
  }

  function removeMedia(index: number) {
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index))
    setPreviewIndex((prev) => (prev >= index ? Math.max(0, prev - 1) : prev))
  }

  function handlePublish() {
    if (!text.trim() && mediaPreviews.length === 0) return
    const newPost: Post = {
      name: "Youngest",
      handle: "@youngest",
      time: "now",
      category: "General",
      text,
      likes: 0,
      reposts: 0,
      avatarColor: "bg-gray-600",
      media: mediaPreviews.length > 0 ? mediaPreviews : undefined,
      liked: false,
      reposted: false,
      bookmarked: false,
      replies: [],
    }
    setPosts([newPost, ...posts])
    setText("")
    setMediaPreviews([])
    setPreviewIndex(0)
  }

  function toggleLike(index: number) {
    setPosts((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    )
  }

  function toggleRepost(index: number) {
    setPosts((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, reposted: !p.reposted, reposts: p.reposted ? p.reposts - 1 : p.reposts + 1 } : p
      )
    )
  }

  function toggleBookmark(index: number) {
    setPosts((prev) => prev.map((p, i) => (i === index ? { ...p, bookmarked: !p.bookmarked } : p)))
  }

  function openPost(index: number) {
    setSelectedPost(index)
    setReplyPath([])
  }

  function openReply(path: string[]) {
    setReplyPath(path)
  }

  function goBack() {
    if (replyPath.length > 0) {
      setReplyPath(replyPath.slice(0, -1))
    } else {
      setSelectedPost(null)
    }
  }

  function submitReplyHere() {
    if (!replyText.trim() || selectedPost === null) return
    const newReply: Reply = {
      id: `r${Date.now()}`,
      name: "Youngest",
      avatarColor: "bg-gray-600",
      text: replyText,
      likes: 0,
      liked: false,
      reposts: 0,
      reposted: false,
      replies: [],
    }
    setPosts((prev) =>
      prev.map((p, i) =>
        i === selectedPost ? { ...p, replies: addReplyAtPath(p.replies, replyPath, newReply) } : p
      )
    )
    setReplyText("")
  }

  function handleReplyLike(path: string[]) {
    if (selectedPost === null) return
    setPosts((prev) =>
      prev.map((p, i) => (i === selectedPost ? { ...p, replies: toggleLikeAtPath(p.replies, path) } : p))
    )
  }

  function handleReplyRepost(path: string[]) {
    if (selectedPost === null) return
    setPosts((prev) =>
      prev.map((p, i) => (i === selectedPost ? { ...p, replies: toggleRepostAtPath(p.replies, path) } : p))
    )
  }

  if (selectedPost !== null && replyPath.length > 0) {
    const p = posts[selectedPost]
    const node = getNodeAtPath(p.replies, replyPath)
    if (!node) return null

    return (
      <div>
        <div className="flex items-center gap-4 mb-4">
          <button onClick={goBack} className="text-gray-400 hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Reply</h1>
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${node.avatarColor} flex-shrink-0`} />
            <span className="text-sm font-semibold">{node.name}</span>
          </div>
          <p className="text-base mt-3 leading-relaxed">{node.text}</p>

          <div className="flex items-center gap-6 mt-4 pt-3 border-t border-[#1c2432]">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MessageCircle size={15} />
              {node.replies.length}
            </div>
            <button
              onClick={() => handleReplyLike(replyPath)}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                node.liked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"
              }`}
            >
              <Heart size={15} fill={node.liked ? "currentColor" : "none"} />
              {node.likes}
            </button>
            <button
              onClick={() => handleReplyRepost(replyPath)}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                node.reposted ? "text-green-400" : "text-gray-500 hover:text-green-400"
              }`}
            >
              <Repeat2 size={15} />
              {node.reposts}
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0" />
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Post your reply"
            className="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={submitReplyHere}
            className="bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Reply
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {node.replies.map((r) => (
            <div
              key={r.id}
              onClick={() => openReply([...replyPath, r.id])}
              className="bg-[#0f141c] border border-[#1c2432] rounded-2xl p-4 cursor-pointer hover:bg-white/[0.02] transition-colors flex items-start gap-3"
            >
              <div className={`w-9 h-9 rounded-full ${r.avatarColor} flex-shrink-0`} />
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-sm text-gray-200 mt-0.5">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (selectedPost !== null) {
    const p = posts[selectedPost]
    return (
      <div>
        <div className="flex items-center gap-4 mb-4">
          <button onClick={goBack} className="text-gray-400 hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Post</h1>
        </div>

        <div className="bg-[#0f141c] border border-[#1c2432] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${p.avatarColor} flex-shrink-0`} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold">{p.name}</span>
                {p.badge && (
                  <span className="text-[9px] font-bold border border-cyan-400 text-cyan-400 px-1 rounded">
                    {p.badge}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">{p.handle} · {p.time}</span>
            </div>
          </div>

          <p className="text-xs text-cyan-400 mt-2">{p.category}</p>
          {p.text && <p className="text-base mt-3 leading-relaxed">{p.text}</p>}

          {p.media && <Carousel media={p.media} maxHeight="max-h-[500px]" />}

          <div className="flex items-center gap-6 mt-4 pt-3 border-t border-[#1c2432]">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MessageCircle size={15} />
              {countReplies(p.replies)}
            </div>
            <button
              onClick={() => toggleLike(selectedPost)}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                p.liked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"
              }`}
            >
              <Heart size={15} fill={p.liked ? "currentColor" : "none"} />
              {p.likes}
            </button>
            <button
              onClick={() => toggleRepost(selectedPost)}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                p.reposted ? "text-green-400" : "text-gray-500 hover:text-green-400"
              }`}
            >
              <Repeat2 size={15} />
              {p.reposts}
            </button>
            <button
              onClick={() => toggleBookmark(selectedPost)}
              className={`ml-auto transition-colors ${
                p.bookmarked ? "text-cyan-400" : "text-gray-500 hover:text-cyan-400"
              }`}
            >
              <Bookmark size={15} fill={p.bookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0" />
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Post your reply"
            className="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={submitReplyHere}
            className="bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Reply
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {p.replies.map((r) => (
            <div
              key={r.id}
              onClick={() => openReply([r.id])}
              className="bg-[#0f141c] border border-[#1c2432] rounded-2xl p-4 cursor-pointer hover:bg-white/[0.02] transition-colors flex items-start gap-3"
            >
              <div className={`w-9 h-9 rounded-full ${r.avatarColor} flex-shrink-0`} />
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-sm text-gray-200 mt-0.5">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Feed</h1>

      <div className="flex items-center gap-6 mt-4 border-b border-[#1c2432]">
        {(["For You", "Following"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? "text-cyan-400 border-cyan-400" : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 bg-[#0f141c] border border-[#1c2432] rounded-2xl p-4">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-600 flex-shrink-0" />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 bg-transparent text-sm placeholder-gray-500 focus:outline-none"
          />
        </div>

        {mediaPreviews.length > 0 && (
          <div className="mt-3">
            <div className="relative rounded-xl overflow-hidden bg-black/20">
              {mediaPreviews[previewIndex].type === "image" ? (
                <img src={mediaPreviews[previewIndex].url} className="w-full h-auto max-h-80 object-contain" />
              ) : (
                <video src={mediaPreviews[previewIndex].url} controls className="w-full h-auto max-h-80 object-contain" />
              )}
              <button
                onClick={() => removeMedia(previewIndex)}
                className="absolute top-2 right-2 bg-black/70 rounded-full p-1"
              >
                <X size={14} />
              </button>
              {mediaPreviews.length > 1 && (
                <span className="absolute bottom-2 right-2 bg-black/60 text-[10px] px-1.5 py-0.5 rounded-full">
                  {previewIndex + 1}/{mediaPreviews.length}
                </span>
              )}
            </div>

            {mediaPreviews.length > 1 && (
              <div className="flex items-center gap-2 mt-2 overflow-x-auto">
                {mediaPreviews.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setPreviewIndex(i)}
                    className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden ${i === previewIndex ? "ring-2 ring-cyan-400" : "opacity-60"}`}
                  >
                    {m.type === "image" ? (
                      <img src={m.url} className="w-full h-full object-cover" />
                    ) : (
                      <video src={m.url} className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <input
          type="file"
          accept="image/*,video/*"
          multiple
          ref={fileInputRef}
          onChange={handleMediaPick}
          className="hidden"
        />

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 text-gray-500">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={mediaPreviews.length >= 10}
              className="disabled:opacity-30"
            >
              <ImageIcon size={16} />
            </button>
            <span className="text-xs font-semibold">GIF</span>
            <MessageCircle size={16} />
            <ListOrdered size={16} />
            <Smile size={16} />
          </div>
          <button
            onClick={handlePublish}
            className="bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            Publish Bit
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {posts.map((p, i) => (
          <div
            key={i}
            onClick={() => openPost(i)}
            className="bg-[#0f141c] border border-[#1c2432] rounded-2xl p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-full ${p.avatarColor} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold">{p.name}</span>
                  {p.badge && (
                    <span className="text-[9px] font-bold border border-cyan-400 text-cyan-400 px-1 rounded">
                      {p.badge}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">{p.handle} · {p.time}</span>
                </div>
                <p className="text-xs text-cyan-400 mt-0.5">{p.category}</p>
                {p.text && <p className="text-sm mt-2 leading-relaxed">{p.text}</p>}

                {p.media && <Carousel media={p.media} maxHeight="max-h-[500px]" />}

                <div className="flex items-center gap-6 mt-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => openPost(i)}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    <MessageCircle size={15} />
                    {countReplies(p.replies)}
                  </button>

                  <button
                    onClick={() => toggleLike(i)}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      p.liked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"
                    }`}
                  >
                    <Heart size={15} fill={p.liked ? "currentColor" : "none"} />
                    {p.likes}
                  </button>

                  <button
                    onClick={() => toggleRepost(i)}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      p.reposted ? "text-green-400" : "text-gray-500 hover:text-green-400"
                    }`}
                  >
                    <Repeat2 size={15} />
                    {p.reposts}
                  </button>

                  <button
                    onClick={() => toggleBookmark(i)}
                    className={`ml-auto transition-colors ${
                      p.bookmarked ? "text-cyan-400" : "text-gray-500 hover:text-cyan-400"
                    }`}
                  >
                    <Bookmark size={15} fill={p.bookmarked ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

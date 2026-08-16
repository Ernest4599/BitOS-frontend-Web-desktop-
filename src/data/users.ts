export type UserProfile = {
  id: string
  name: string
  handle: string
  verified: boolean
  avatarColor: string
  bio: string
  location: string
  website: string
  joined: string
  followers: string
  br: string
  following: string
  totalViews: string
  topTopics: { tag: string; count: string }[]
  achievements: { title: string; time: string; color: string }[]
  posts: { text: string; time: string; comments: number; likes: number; reposts: number }[]
}

export const users: Record<string, UserProfile> = {
  alex: {
    id: "alex",
    name: "Alex Morgan",
    handle: "@alexmorgan",
    verified: true,
    avatarColor: "bg-blue-500",
    bio: "AI researcher. Robotics enthusiast. Tech builder. Sharing insights on AI, robotics, and the future of technology.",
    location: "San Francisco, CA",
    website: "alexmorgan.dev",
    joined: "March 2023",
    followers: "12.4K",
    br: "8,421",
    following: "238",
    totalViews: "1.2M",
    topTopics: [
      { tag: "AI", count: "2.1K bits" },
      { tag: "Robotics", count: "1.6K bits" },
      { tag: "Automation", count: "842 bits" },
      { tag: "FutureTech", count: "721 bits" },
    ],
    achievements: [
      { title: "Top Contributor", time: "Received 3 days ago", color: "text-yellow-400" },
      { title: "AI Pioneer", time: "Received 2 weeks ago", color: "text-blue-400" },
      { title: "Building the Future", time: "Received 1 month ago", color: "text-pink-400" },
    ],
    posts: [
      {
        text: "AI agents are going to change the way we build software. The future is autonomous. Let's build it right.",
        time: "2h",
        comments: 42,
        likes: 318,
        reposts: 67,
      },
      {
        text: "Humanoid robots will not just work with us. They will live with us. The next decade is going to be wild.",
        time: "1d",
        comments: 91,
        likes: 726,
        reposts: 142,
      },
    ],
  },
  sarah: {
    id: "sarah",
    name: "Sarah Chen",
    handle: "@sarahchen",
    verified: true,
    avatarColor: "bg-pink-500",
    bio: "Founder building AI-powered products. Sharing the journey.",
    location: "Austin, TX",
    website: "sarahchen.io",
    joined: "January 2024",
    followers: "4.2K",
    br: "2,103",
    following: "156",
    totalViews: "380K",
    topTopics: [
      { tag: "Startups", count: "612 bits" },
      { tag: "AI", count: "410 bits" },
    ],
    achievements: [
      { title: "Rising Star", time: "Received 1 week ago", color: "text-purple-400" },
    ],
    posts: [
      {
        text: "Just shipped my first AI-powered product. 6 months of building, learning and iterating.",
        time: "6h",
        comments: 31,
        likes: 247,
        reposts: 48,
      },
    ],
  },
  youngest: {
    id: "youngest",
    name: "Youngest Kingston",
    handle: "@youngestkingston",
    verified: true,
    avatarColor: "bg-yellow-500",
    bio: "Building software that solves real problems.",
    location: "",
    website: "",
    joined: "May 2024",
    followers: "0",
    br: "0",
    following: "0",
    totalViews: "0",
    topTopics: [],
    achievements: [],
    posts: [],
  },
}

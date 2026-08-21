import { useState } from "react"
import { Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import DailyBrief from "./components/DailyBrief"
import TopStoryCard from "./components/TopStoryCard"
import SuggestionCards from "./components/SuggestionCards"
import RecommendedCards from "./components/RecommendedCards"
import AnalysisCards from "./components/AnalysisCards"
import SummarizeBar from "./components/SummarizeBar"
import TrendingWidget from "./components/TrendingWidget"
import LiveUpdatesWidget from "./components/LiveUpdatesWidget"
import MarketSnapshot from "./components/MarketSnapshot"
import TopInterests from "./components/TopInterests"
import Feed from "./components/Feed"
import AIPage from "./components/AIPage"
import MessagesPage from "./components/MessagesPage"
import ProfilePage from "./components/ProfilePage"
import UserProfilePage from "./components/UserProfilePage"
import ExplorePage from "./components/ExplorePage"
import SettingsPage from "./components/SettingsPage"

const pathToLabel: Record<string, string> = {
  "/": "Home",
  "/feed": "Feed",
  "/ai": "AI",
  "/messages": "Messages",
  "/profile": "Profile",
  "/explore": "Explore",
  "/settings": "Settings",
}

const labelToPath: Record<string, string> = {
  Home: "/",
  Feed: "/feed",
  AI: "/ai",
  Messages: "/messages",
  Profile: "/profile",
  Explore: "/explore",
  Settings: "/settings",
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const active = pathToLabel[location.pathname] || (location.pathname.startsWith("/profile/") ? "Profile" : "Home")
  const isCollapsible = active === "Home" || active === "Feed"
  const showSidebar = !isCollapsible

  function handleSelect(label: string) {
    navigate(labelToPath[label] || "/")
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-[#0a0e14] text-white overflow-hidden relative">
      {showSidebar && <Sidebar active={active} onSelect={handleSelect} />}
      {isCollapsible && sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <Sidebar active={active} onSelect={handleSelect} />
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Header
          onProfileClick={() => navigate("/profile")}
          showMenuToggle={isCollapsible}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        {children}
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div className="flex flex-1 min-h-0">
      <main className="flex-1 min-w-0 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          <DailyBrief />
          <TopStoryCard />
          <SuggestionCards />
          <RecommendedCards />
          <AnalysisCards />
          <SummarizeBar />
        </div>
      </main>
      <aside className="w-64 flex-shrink-0 overflow-y-auto p-4 border-l border-[#1c2432] flex flex-col gap-4">
        <TrendingWidget />
        <LiveUpdatesWidget />
        <MarketSnapshot />
        <TopInterests />
      </aside>
    </div>
  )
}

function FeedPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-1 min-h-0">
      <main className="flex-1 min-w-0 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          <Feed
            onUserClick={(uid) => {
              if (uid === "youngest") navigate("/profile")
              else navigate(`/profile/${uid}`)
            }}
          />
        </div>
      </main>
      <aside className="w-64 flex-shrink-0 overflow-y-auto p-4 border-l border-[#1c2432] flex flex-col gap-4">
        <TrendingWidget />
        <LiveUpdatesWidget />
        <MarketSnapshot />
        <TopInterests />
      </aside>
    </div>
  )
}

function AIRoute() {
  return (
    <div className="flex flex-1 min-h-0">
      <main className="flex-1 min-w-0 flex flex-col p-8 overflow-hidden">
        <AIPage />
      </main>
    </div>
  )
}

function MessagesRoute() {
  return (
    <div className="flex flex-1 min-h-0">
      <MessagesPage />
    </div>
  )
}

function ProfileRoute() {
  return (
    <div className="flex flex-1 min-h-0">
      <main className="flex-1 min-w-0 overflow-y-auto p-8">
        <ProfilePage />
      </main>
    </div>
  )
}

function UserProfileRoute() {
  const { userId } = useParams()
  const navigate = useNavigate()
  return (
    <div className="flex flex-1 min-h-0">
      <main className="flex-1 min-w-0 overflow-y-auto p-8">
        <UserProfilePage userId={userId || ""} onBack={() => navigate(-1)} />
      </main>
    </div>
  )
}

function ExploreRoute() {
  return (
    <div className="flex flex-1 min-h-0">
      <main className="flex-1 min-w-0 overflow-y-auto p-8">
        <ExplorePage />
      </main>
    </div>
  )
}

function SettingsRoute() {
  return (
    <div className="flex flex-1 min-h-0">
      <main className="flex-1 min-w-0 overflow-y-auto p-8">
        <SettingsPage />
      </main>
    </div>
  )
}

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/ai" element={<AIRoute />} />
        <Route path="/messages" element={<MessagesRoute />} />
        <Route path="/profile" element={<ProfileRoute />} />
        <Route path="/profile/:userId" element={<UserProfileRoute />} />
        <Route path="/explore" element={<ExploreRoute />} />
        <Route path="/settings" element={<SettingsRoute />} />
      </Routes>
    </AppLayout>
  )
}

export default App

import { useState } from "react"
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

function App() {
  const [active, setActive] = useState("Home")
  const [viewingUser, setViewingUser] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isCollapsible = active === "Home" || active === "Feed"
  const showSidebar = !isCollapsible || sidebarOpen

  function handleSelect(s: string) {
    setActive(s)
    setSidebarOpen(false)
  }

  function handleMainClick() {
    if (isCollapsible && sidebarOpen) setSidebarOpen(false)
  }

  if (viewingUser) {
    return (
      <div className="flex h-screen bg-[#0a0e14] text-white overflow-hidden">
        <Sidebar active={active} onSelect={(s) => { handleSelect(s); setViewingUser(null) }} />
        <div className="flex-1 flex flex-col min-w-0 h-screen">
          <Header onProfileClick={() => { setActive("Profile"); setViewingUser(null) }} />
          <main className="flex-1 min-w-0 overflow-y-auto p-8">
            <UserProfilePage userId={viewingUser} onBack={() => setViewingUser(null)} />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#0a0e14] text-white overflow-hidden relative">
      {!isCollapsible && showSidebar && <Sidebar active={active} onSelect={handleSelect} />}
      {isCollapsible && sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <Sidebar active={active} onSelect={handleSelect} />
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Header
          onProfileClick={() => setActive("Profile")}
          showMenuToggle={isCollapsible}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="flex flex-1 min-h-0">
          {active === "AI" || active === "Messages" ? (
            <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
              {active === "AI" && (
                <div className="flex-1 flex flex-col p-8 overflow-hidden">
                  <AIPage />
                </div>
              )}
              {active === "Messages" && <MessagesPage />}
            </main>
          ) : (
            <main className="flex-1 min-w-0 overflow-y-auto p-8">
              <div className="max-w-3xl mx-auto">
              {active === "Home" && (
                <>
                  <DailyBrief />
                  <TopStoryCard />
                  <SuggestionCards />
                  <RecommendedCards />
                  <AnalysisCards />
                  <SummarizeBar />
                </>
              )}
              {active === "Feed" && <Feed onUserClick={(uid) => {
                if (uid === "youngest") {
                  setActive("Profile")
                } else {
                  setViewingUser(uid)
                }
              }} />}
              {active === "Profile" && <ProfilePage />}
              {active === "Explore" && <ExplorePage />}
              {active === "Settings" && <SettingsPage />}
              {active !== "Home" && active !== "Feed" && active !== "Profile" && active !== "Explore" && active !== "Settings" && (
                <div className="flex items-center justify-center h-96 text-gray-500 text-sm">
                  {active} page coming soon
                </div>
              )}
              </div>
            </main>
          )}

          {active !== "Messages" && active !== "Explore" && active !== "Settings" && (
            <aside className="w-64 flex-shrink-0 overflow-y-auto p-4 border-l border-[#1c2432] flex flex-col gap-4">
              <TrendingWidget />
              <LiveUpdatesWidget />
              <MarketSnapshot />
              <TopInterests />
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

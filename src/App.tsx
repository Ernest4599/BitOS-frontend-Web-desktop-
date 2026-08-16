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

function App() {
  const [active, setActive] = useState("Home")
  const [viewingUser, setViewingUser] = useState<string | null>(null)

  if (viewingUser) {
    return (
      <div className="flex h-screen bg-[#0a0e14] text-white overflow-hidden">
        <Sidebar active={active} onSelect={(s) => { setActive(s); setViewingUser(null) }} />
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
    <div className="flex h-screen bg-[#0a0e14] text-white overflow-hidden">
      <Sidebar active={active} onSelect={setActive} />

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Header onProfileClick={() => setActive("Profile")} />

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
              {active !== "Home" && active !== "Feed" && active !== "Profile" && active !== "Explore" && (
                <div className="flex items-center justify-center h-96 text-gray-500 text-sm">
                  {active} page coming soon
                </div>
              )}
            </main>
          )}

          {active !== "Messages" && active !== "Explore" && (
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

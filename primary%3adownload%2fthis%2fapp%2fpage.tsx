"use client"

import { useState, useEffect } from "react"
import { LoginScreen } from "@/components/screens/login-screen"
import { VideoFeed } from "@/components/screens/video-feed"
import { ChatList } from "@/components/screens/chat-list"
import { ShopGrid } from "@/components/screens/shop-grid"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { cn } from "@/lib/utils"

type Screen = "video" | "chat" | "shop" | "profile"

export default function FlowApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<Screen>("video")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayScreen, setDisplayScreen] = useState<Screen>("video")

  const handleNavigate = (screen: Screen) => {
    if (screen === currentScreen) return
    setIsTransitioning(true)
    
    setTimeout(() => {
      setDisplayScreen(screen)
      setCurrentScreen(screen)
      setIsTransitioning(false)
    }, 150)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Main Content Area */}
      <main 
        className={cn(
          "h-full pb-24 transition-all duration-300 ease-out",
          isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
        )}
      >
        {displayScreen === "video" && <VideoFeed />}
        {displayScreen === "chat" && <ChatList />}
        {displayScreen === "shop" && <ShopGrid />}
        {displayScreen === "profile" && <ProfileScreen />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  )
}

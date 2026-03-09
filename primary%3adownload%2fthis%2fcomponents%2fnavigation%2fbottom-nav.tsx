"use client"

import { Play, MessageCircle, ShoppingBag, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Screen = "video" | "chat" | "shop" | "profile"

interface BottomNavProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav 
      className="fixed bottom-4 left-4 right-4 z-50 safe-area-bottom animate-fade-in-up"
      style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
      aria-label="Main navigation"
    >
      <div className="glass rounded-3xl px-2 py-2 flex items-center justify-around shadow-lg shadow-black/20">
        {/* Video */}
        <NavButton
          isActive={currentScreen === "video"}
          onClick={() => onNavigate("video")}
          icon={<Play className="w-6 h-6" />}
          label="Watch"
        />

        {/* Chat */}
        <NavButton
          isActive={currentScreen === "chat"}
          onClick={() => onNavigate("chat")}
          icon={<MessageCircle className="w-6 h-6" />}
          label="Chat"
          badge={5}
        />

        {/* Center Flow Button */}
        <button
          onClick={() => onNavigate("video")}
          className={cn(
            "relative -mt-8 w-16 h-16 rounded-full bg-gold flex items-center justify-center",
            "shadow-lg shadow-gold/40 transition-all duration-300",
            "hover:scale-110 hover:shadow-gold/60 hover:shadow-xl",
            "active:scale-95 active:shadow-gold/30",
            "animate-float"
          )}
          style={{ animationDuration: "4s" }}
          aria-label="Flow - Home"
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-2 rounded-full bg-gold/20 animate-ping" style={{ animationDuration: "2s" }} />
          
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-light to-gold opacity-100" />
          
          <svg 
            viewBox="0 0 24 24" 
            className="w-8 h-8 text-black relative z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <path d="M8 12l3 3 5-6" />
          </svg>
          <span className="sr-only">FLOW Home</span>
        </button>

        {/* Shop */}
        <NavButton
          isActive={currentScreen === "shop"}
          onClick={() => onNavigate("shop")}
          icon={<ShoppingBag className="w-6 h-6" />}
          label="Shop"
        />

        {/* Profile */}
        <NavButton
          isActive={currentScreen === "profile"}
          onClick={() => onNavigate("profile")}
          icon={<User className="w-6 h-6" />}
          label="Me"
        />
      </div>
    </nav>
  )
}

function NavButton({
  isActive,
  onClick,
  icon,
  label,
  badge,
}: {
  isActive: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  badge?: number
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl",
        "min-w-[64px] min-h-[56px]",
        "transition-all duration-300 ease-out",
        "active:scale-90",
        isActive 
          ? "text-gold" 
          : "text-muted-foreground hover:text-foreground"
      )}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
    >
      <div className={cn(
        "relative transition-transform duration-300",
        isActive && "scale-110"
      )}>
        {icon}
        {badge && badge > 0 && (
          <span className={cn(
            "absolute -top-1 -right-2 w-5 h-5 bg-gold text-black text-[10px] font-bold rounded-full",
            "flex items-center justify-center",
            "animate-scale-bounce"
          )}
          style={{ animationDuration: "2s" }}
          >
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </div>
      <span className={cn(
        "text-[10px] font-semibold mt-1 transition-all duration-300",
        isActive ? "text-gold opacity-100" : "text-muted-foreground opacity-70"
      )}>
        {label}
      </span>
      
      {/* Active indicator */}
      <span className={cn(
        "absolute bottom-1 w-1 h-1 bg-gold rounded-full",
        "transition-all duration-300",
        isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )} />
      
      {/* Hover/Active background */}
      <span className={cn(
        "absolute inset-0 rounded-2xl bg-gold/10 transition-opacity duration-300",
        isActive ? "opacity-100" : "opacity-0"
      )} />
    </button>
  )
}

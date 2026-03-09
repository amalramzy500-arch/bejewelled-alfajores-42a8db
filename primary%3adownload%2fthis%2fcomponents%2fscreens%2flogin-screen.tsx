"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleLogin = (provider: string) => {
    setLoadingProvider(provider)
    setIsLoading(true)
    setTimeout(() => {
      onLogin()
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 safe-area-top safe-area-bottom overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Logo & Branding */}
      <div className="flex flex-col items-center mb-16 relative z-10">
        {/* Logo Mark */}
        <div className="relative mb-6 opacity-0 animate-fade-in-scale" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
          <div className="w-24 h-24 rounded-3xl glass-gold flex items-center justify-center animate-glow-pulse">
            <svg 
              viewBox="0 0 24 24" 
              className="w-14 h-14 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l3 3 5-6" />
            </svg>
          </div>
          <div className="absolute -inset-4 rounded-[2rem] border border-gold/30 animate-border-glow" />
          <div className="absolute -inset-8 rounded-[2.5rem] border border-gold/10 animate-border-glow" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl font-bold tracking-tight text-foreground mb-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          FLOW
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-xs leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
          Watch. Chat. Shop. All in one seamless experience.
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="w-full max-w-sm space-y-4 relative z-10">
        {/* Google */}
        <Button
          onClick={() => handleLogin("google")}
          disabled={isLoading}
          variant="outline"
          className={cn(
            "w-full h-14 text-base font-semibold rounded-2xl bg-white hover:bg-white/90 text-black border-0",
            "opacity-0 animate-fade-in-up hover-lift active-scale",
            "transition-all duration-300",
            loadingProvider === "google" && "animate-pulse"
          )}
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {loadingProvider === "google" ? "Signing in..." : "Continue with Google"}
        </Button>

        {/* Apple */}
        <Button
          onClick={() => handleLogin("apple")}
          disabled={isLoading}
          variant="outline"
          className={cn(
            "w-full h-14 text-base font-semibold rounded-2xl bg-white hover:bg-white/90 text-black border-0",
            "opacity-0 animate-fade-in-up hover-lift active-scale",
            "transition-all duration-300",
            loadingProvider === "apple" && "animate-pulse"
          )}
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          {loadingProvider === "apple" ? "Signing in..." : "Continue with Apple"}
        </Button>

        {/* Microsoft */}
        <Button
          onClick={() => handleLogin("microsoft")}
          disabled={isLoading}
          variant="outline"
          className={cn(
            "w-full h-14 text-base font-semibold rounded-2xl bg-white hover:bg-white/90 text-black border-0",
            "opacity-0 animate-fade-in-up hover-lift active-scale",
            "transition-all duration-300",
            loadingProvider === "microsoft" && "animate-pulse"
          )}
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
            <path fill="#F25022" d="M1 1h10v10H1z" />
            <path fill="#00A4EF" d="M1 13h10v10H1z" />
            <path fill="#7FBA00" d="M13 1h10v10H13z" />
            <path fill="#FFB900" d="M13 13h10v10H13z" />
          </svg>
          {loadingProvider === "microsoft" ? "Signing in..." : "Continue with Microsoft"}
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8 w-full max-w-sm opacity-0 animate-fade-in" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="text-sm text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Continue as Guest */}
      <Button
        onClick={() => handleLogin("guest")}
        disabled={isLoading}
        variant="ghost"
        className={cn(
          "w-full max-w-sm h-14 text-base font-semibold rounded-2xl glass hover:bg-white/10 text-foreground",
          "opacity-0 animate-fade-in-up hover-lift active-scale",
          "transition-all duration-300",
          loadingProvider === "guest" && "animate-pulse"
        )}
        style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
      >
        {loadingProvider === "guest" ? "Entering FLOW..." : "Continue as Guest"}
      </Button>

      {/* Terms */}
      <p className="text-xs text-muted-foreground text-center mt-8 max-w-xs leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
        By continuing, you agree to our{" "}
        <button className="text-gold hover:underline transition-colors">Terms of Service</button>
        {" "}and{" "}
        <button className="text-gold hover:underline transition-colors">Privacy Policy</button>
      </p>

      {/* Version */}
      <p className="text-xs text-muted-foreground/50 mt-6 opacity-0 animate-fade-in" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
        FLOW v1.0.0
      </p>
    </div>
  )
}

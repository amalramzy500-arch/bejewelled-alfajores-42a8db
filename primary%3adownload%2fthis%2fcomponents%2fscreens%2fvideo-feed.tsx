"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Bookmark, Play, Pause, Volume2, VolumeX, Film, Tv } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface VideoItem {
  id: string
  username: string
  avatar: string
  description: string
  likes: number
  comments: number
  shares: number
  thumbnail: string
  isLiked: boolean
  isSaved: boolean
}

const mockVideos: VideoItem[] = [
  {
    id: "1",
    username: "creativemind",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    description: "The future of design is here. Creating seamless experiences that connect people.",
    likes: 45200,
    comments: 1289,
    shares: 892,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=700&fit=crop",
    isLiked: false,
    isSaved: false,
  },
  {
    id: "2",
    username: "techvisionary",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Behind the scenes of our latest innovation. Stay tuned for the big reveal!",
    likes: 89100,
    comments: 3421,
    shares: 2103,
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=700&fit=crop",
    isLiked: true,
    isSaved: true,
  },
  {
    id: "3",
    username: "artexplorer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    description: "Finding beauty in the everyday moments. Life is art when you look closely.",
    likes: 23400,
    comments: 567,
    shares: 234,
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=700&fit=crop",
    isLiked: false,
    isSaved: false,
  },
]

function formatCount(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

export function VideoFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cinemaMode, setCinemaMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [videos, setVideos] = useState(mockVideos)

  const currentVideo = videos[currentIndex]

  const handleLike = () => {
    setVideos(prev => prev.map((v, i) => 
      i === currentIndex ? { ...v, isLiked: !v.isLiked, likes: v.isLiked ? v.likes - 1 : v.likes + 1 } : v
    ))
  }

  const handleSave = () => {
    setVideos(prev => prev.map((v, i) => 
      i === currentIndex ? { ...v, isSaved: !v.isSaved } : v
    ))
  }

  const handleScroll = (direction: "up" | "down") => {
    if (direction === "up" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (direction === "down" && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      {/* Cinema Mode Toggle */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 glass px-4 py-2 rounded-full">
        <Tv className={cn("w-5 h-5 transition-colors", !cinemaMode ? "text-gold" : "text-muted-foreground")} />
        <Switch 
          checked={cinemaMode} 
          onCheckedChange={setCinemaMode}
          className="data-[state=checked]:bg-gold"
        />
        <Film className={cn("w-5 h-5 transition-colors", cinemaMode ? "text-gold" : "text-muted-foreground")} />
        <span className="text-xs font-medium text-muted-foreground ml-1">
          {cinemaMode ? "Cinema" : "Shorts"}
        </span>
      </div>

      {/* Video Container */}
      <div 
        className={cn(
          "relative w-full h-full transition-all duration-500",
          cinemaMode ? "aspect-video max-h-[60%] top-1/2 -translate-y-1/2" : ""
        )}
      >
        {/* Video Thumbnail/Preview */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentVideo.thumbnail})` }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Play/Pause Overlay */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 flex items-center justify-center z-10"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {!isPlaying && (
            <div className="w-20 h-20 rounded-full glass-gold flex items-center justify-center">
              <Play className="w-10 h-10 text-gold ml-1" fill="currentColor" />
            </div>
          )}
        </button>

        {/* Video Progress Bar */}
        <div className={cn(
          "absolute left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden z-10",
          cinemaMode ? "bottom-4" : "bottom-28"
        )}>
          <div className="h-full w-[45%] bg-gold rounded-full" />
        </div>

        {/* Sound Control */}
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-16 right-4 z-20 p-3 glass rounded-full min-w-[48px] min-h-[48px] flex items-center justify-center"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Action Buttons (Right Side) */}
      <div className={cn(
        "absolute right-4 flex flex-col gap-5 z-10",
        cinemaMode ? "bottom-[25%]" : "bottom-36"
      )}>
        {/* Profile */}
        <div className="flex flex-col items-center gap-1">
          <Avatar className="w-12 h-12 border-2 border-gold">
            <AvatarImage src={currentVideo.avatar} alt={currentVideo.username} />
            <AvatarFallback className="bg-secondary text-foreground">
              {currentVideo.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <button 
            className="w-6 h-6 -mt-3 rounded-full bg-gold text-black flex items-center justify-center text-lg font-bold"
            aria-label="Follow user"
          >
            +
          </button>
        </div>

        {/* Like */}
        <button 
          onClick={handleLike}
          className="flex flex-col items-center gap-1 min-w-[48px] min-h-[48px]"
          aria-label={currentVideo.isLiked ? "Unlike" : "Like"}
        >
          <div className="p-3 rounded-full glass">
            <Heart 
              className={cn(
                "w-7 h-7 transition-colors",
                currentVideo.isLiked ? "text-gold fill-gold" : "text-white"
              )} 
            />
          </div>
          <span className="text-xs font-semibold text-white">{formatCount(currentVideo.likes)}</span>
        </button>

        {/* Comment */}
        <button 
          className="flex flex-col items-center gap-1 min-w-[48px] min-h-[48px]"
          aria-label="View comments"
        >
          <div className="p-3 rounded-full glass">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs font-semibold text-white">{formatCount(currentVideo.comments)}</span>
        </button>

        {/* Share */}
        <button 
          className="flex flex-col items-center gap-1 min-w-[48px] min-h-[48px]"
          aria-label="Share video"
        >
          <div className="p-3 rounded-full glass">
            <Share2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs font-semibold text-white">{formatCount(currentVideo.shares)}</span>
        </button>

        {/* Save */}
        <button 
          onClick={handleSave}
          className="flex flex-col items-center gap-1 min-w-[48px] min-h-[48px]"
          aria-label={currentVideo.isSaved ? "Unsave" : "Save"}
        >
          <div className="p-3 rounded-full glass">
            <Bookmark 
              className={cn(
                "w-7 h-7 transition-colors",
                currentVideo.isSaved ? "text-gold fill-gold" : "text-white"
              )} 
            />
          </div>
        </button>
      </div>

      {/* Video Info (Bottom) */}
      <div className={cn(
        "absolute left-4 right-20 z-10",
        cinemaMode ? "bottom-[22%]" : "bottom-28"
      )}>
        <h3 className="text-lg font-bold text-white mb-1">@{currentVideo.username}</h3>
        <p className="text-sm text-white/90 leading-relaxed line-clamp-2">{currentVideo.description}</p>
      </div>

      {/* Scroll Indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-2 z-10">
        {videos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            )}
            aria-label={`Go to video ${idx + 1}`}
          >
            <span className={cn(
              "w-2 h-2 rounded-full transition-all",
              idx === currentIndex ? "bg-gold w-6" : "bg-white/40"
            )} />
          </button>
        ))}
      </div>

      {/* Navigation Hint */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleScroll("up")}
          disabled={currentIndex === 0}
          className="w-12 h-12 rounded-full glass disabled:opacity-30"
          aria-label="Previous video"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleScroll("down")}
          disabled={currentIndex === videos.length - 1}
          className="w-12 h-12 rounded-full glass disabled:opacity-30"
          aria-label="Next video"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </div>
    </div>
  )
}

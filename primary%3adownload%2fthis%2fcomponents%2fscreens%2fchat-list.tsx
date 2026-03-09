"use client"

import { useState } from "react"
import { Search, Shield, Check, CheckCheck, Pin, Bell, BellOff, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface ChatItem {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  isOnline: boolean
  isPinned: boolean
  isMuted: boolean
  isRead: boolean
  isGroup: boolean
  members?: number
}

const mockChats: ChatItem[] = [
  {
    id: "1",
    name: "Design Team",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
    lastMessage: "The new mockups are ready for review!",
    time: "2m",
    unread: 5,
    isOnline: true,
    isPinned: true,
    isMuted: false,
    isRead: false,
    isGroup: true,
    members: 12,
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "Thanks for the update! See you tomorrow.",
    time: "15m",
    unread: 0,
    isOnline: true,
    isPinned: true,
    isMuted: false,
    isRead: true,
    isGroup: false,
  },
  {
    id: "3",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    lastMessage: "Let me check the documents and get back...",
    time: "1h",
    unread: 2,
    isOnline: false,
    isPinned: false,
    isMuted: false,
    isRead: false,
    isGroup: false,
  },
  {
    id: "4",
    name: "Project Alpha",
    avatar: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop",
    lastMessage: "Meeting scheduled for Friday at 3 PM",
    time: "3h",
    unread: 0,
    isOnline: true,
    isPinned: false,
    isMuted: true,
    isRead: true,
    isGroup: true,
    members: 8,
  },
  {
    id: "5",
    name: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    lastMessage: "That sounds great! Count me in.",
    time: "5h",
    unread: 0,
    isOnline: false,
    isPinned: false,
    isMuted: false,
    isRead: true,
    isGroup: false,
  },
  {
    id: "6",
    name: "Marketing Hub",
    avatar: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop",
    lastMessage: "Campaign results are looking promising!",
    time: "1d",
    unread: 12,
    isOnline: true,
    isPinned: false,
    isMuted: false,
    isRead: false,
    isGroup: true,
    members: 24,
  },
  {
    id: "7",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    lastMessage: "Voice message",
    time: "2d",
    unread: 0,
    isOnline: false,
    isPinned: false,
    isMuted: false,
    isRead: true,
    isGroup: false,
  },
]

export function ChatList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [chats] = useState(mockChats)

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const pinnedChats = filteredChats.filter(chat => chat.isPinned)
  const regularChats = filteredChats.filter(chat => !chat.isPinned)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-gold">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold text-gold">E2E Encrypted</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-secondary/50 border-0 rounded-2xl text-base placeholder:text-muted-foreground focus-visible:ring-gold/50"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2">
        {/* Pinned Section */}
        {pinnedChats.length > 0 && (
          <div className="mb-2">
            <div className="flex items-center gap-2 px-3 py-2">
              <Pin className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pinned</span>
            </div>
            {pinnedChats.map((chat) => (
              <ChatRow key={chat.id} chat={chat} />
            ))}
          </div>
        )}

        {/* All Messages */}
        {regularChats.length > 0 && (
          <div>
            {pinnedChats.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">All Messages</span>
              </div>
            )}
            {regularChats.map((chat) => (
              <ChatRow key={chat.id} chat={chat} />
            ))}
          </div>
        )}

        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground text-lg">No conversations found</p>
            <p className="text-muted-foreground/60 text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ChatRow({ chat }: { chat: ChatItem }) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-4 px-3 py-4 rounded-2xl transition-all min-h-[80px]",
        "hover:bg-secondary/50 active:scale-[0.98]",
        chat.unread > 0 && "glass"
      )}
      aria-label={`Chat with ${chat.name}, ${chat.unread > 0 ? `${chat.unread} unread messages` : 'no unread messages'}`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <Avatar className="w-14 h-14 border-2 border-transparent">
          <AvatarImage src={chat.avatar} alt={chat.name} />
          <AvatarFallback className="bg-secondary text-foreground text-lg">
            {chat.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {chat.isOnline && (
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-background rounded-full" />
        )}
        {chat.isGroup && (
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold bg-gold text-black rounded-full">
            {chat.members}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between mb-1">
          <h3 className={cn(
            "text-base font-semibold truncate",
            chat.unread > 0 ? "text-foreground" : "text-foreground/80"
          )}>
            {chat.name}
          </h3>
          <span className={cn(
            "text-xs flex-shrink-0 ml-2",
            chat.unread > 0 ? "text-gold font-semibold" : "text-muted-foreground"
          )}>
            {chat.time}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className={cn(
            "text-sm truncate pr-2",
            chat.unread > 0 ? "text-foreground/90 font-medium" : "text-muted-foreground"
          )}>
            {!chat.isGroup && (
              <span className="inline-flex mr-1">
                {chat.isRead ? (
                  <CheckCheck className="w-4 h-4 text-gold inline" />
                ) : (
                  <Check className="w-4 h-4 text-muted-foreground inline" />
                )}
              </span>
            )}
            {chat.lastMessage}
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            {chat.isMuted && (
              <BellOff className="w-4 h-4 text-muted-foreground" />
            )}
            {chat.unread > 0 && (
              <Badge className="bg-gold text-black font-bold text-xs min-w-[24px] h-6 flex items-center justify-center">
                {chat.unread > 99 ? "99+" : chat.unread}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

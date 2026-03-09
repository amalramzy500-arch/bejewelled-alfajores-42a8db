"use client"

import { Settings, ChevronRight, Heart, ShoppingBag, Clock, Star, Shield, Moon, Bell, HelpCircle, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const menuItems = [
  { icon: Heart, label: "Favorites", value: "124 items", action: true },
  { icon: ShoppingBag, label: "My Orders", value: "View all", action: true },
  { icon: Clock, label: "Watch History", value: "250 videos", action: true },
  { icon: Star, label: "Premium", value: "Upgrade", action: true, highlight: true },
]

const settingsItems = [
  { icon: Bell, label: "Notifications", toggle: true },
  { icon: Moon, label: "Dark Mode", toggle: true, defaultOn: true },
  { icon: Shield, label: "Privacy & Security", action: true },
  { icon: HelpCircle, label: "Help & Support", action: true },
]

export function ProfileScreen() {
  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-8 safe-area-top">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <Button variant="ghost" size="icon" className="w-11 h-11 rounded-full glass" aria-label="Settings">
            <Settings className="w-5 h-5 text-foreground" />
          </Button>
        </div>

        {/* Profile Card */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20 border-2 border-gold">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="Profile" />
              <AvatarFallback className="bg-secondary text-foreground text-2xl">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">John Doe</h2>
              <p className="text-sm text-muted-foreground">@johndoe</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gold/20 text-gold">
                  Gold Member
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">1.2K</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-2xl font-bold text-gold">856</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">42</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-5 mb-6">
        <div className="glass rounded-2xl overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors min-h-[60px]"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.highlight ? 'bg-gold/20' : 'bg-secondary'}`}>
                  <item.icon className={`w-5 h-5 ${item.highlight ? 'text-gold' : 'text-foreground'}`} />
                </div>
                <span className={`font-medium ${item.highlight ? 'text-gold' : 'text-foreground'}`}>{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{item.value}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-5 mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
          Settings
        </h3>
        <div className="glass rounded-2xl overflow-hidden">
          {settingsItems.map((item) => (
            <div
              key={item.label}
              className="w-full flex items-center justify-between px-5 py-4 min-h-[60px]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              {item.toggle ? (
                <Switch defaultChecked={item.defaultOn} className="data-[state=checked]:bg-gold" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-5 pb-32">
        <button className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl glass hover:bg-destructive/10 transition-colors min-h-[60px]">
          <LogOut className="w-5 h-5 text-destructive" />
          <span className="font-medium text-destructive">Sign Out</span>
        </button>
      </div>
    </div>
  )
}

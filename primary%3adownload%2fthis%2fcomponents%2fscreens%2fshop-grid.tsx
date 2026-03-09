"use client"

import { useState } from "react"
import { Search, Star, Heart, ShoppingBag, Filter, Sparkles, Truck, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  sold: number
  isFavorite: boolean
  hasFlash: boolean
  freeShipping: boolean
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Earbuds Pro Max",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviews: 12453,
    sold: 50000,
    isFavorite: false,
    hasFlash: true,
    freeShipping: true,
  },
  {
    id: "2",
    name: "Luxury Smart Watch Series 8",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop",
    price: 249.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 8765,
    sold: 25000,
    isFavorite: true,
    hasFlash: false,
    freeShipping: true,
  },
  {
    id: "3",
    name: "Designer Leather Crossbody Bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop",
    price: 59.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviews: 3421,
    sold: 15000,
    isFavorite: false,
    hasFlash: true,
    freeShipping: false,
  },
  {
    id: "4",
    name: "Minimalist Desk Lamp LED",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop",
    price: 34.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviews: 2156,
    sold: 8000,
    isFavorite: false,
    hasFlash: false,
    freeShipping: true,
  },
  {
    id: "5",
    name: "Vintage Polaroid Camera",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop",
    price: 119.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviews: 5678,
    sold: 12000,
    isFavorite: true,
    hasFlash: true,
    freeShipping: true,
  },
  {
    id: "6",
    name: "Artisan Coffee Maker Set",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
    price: 79.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviews: 4532,
    sold: 18000,
    isFavorite: false,
    hasFlash: false,
    freeShipping: true,
  },
  {
    id: "7",
    name: "Noise Cancelling Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    price: 159.99,
    originalPrice: 299.99,
    rating: 4.9,
    reviews: 9876,
    sold: 35000,
    isFavorite: false,
    hasFlash: true,
    freeShipping: true,
  },
  {
    id: "8",
    name: "Smart Home Speaker",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&h=300&fit=crop",
    price: 99.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviews: 6543,
    sold: 22000,
    isFavorite: false,
    hasFlash: false,
    freeShipping: false,
  },
]

const categories = [
  { id: "all", name: "For You", icon: Sparkles },
  { id: "flash", name: "Flash Sale", icon: null },
  { id: "tech", name: "Tech", icon: null },
  { id: "fashion", name: "Fashion", icon: null },
  { id: "home", name: "Home", icon: null },
]

function formatCount(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K+"
  }
  return num.toString()
}

export function ShopGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [products, setProducts] = useState(mockProducts)

  const toggleFavorite = (id: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    )
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || 
      (selectedCategory === "flash" && product.hasFlash)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-5 pt-6 pb-3 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Shop</h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="w-11 h-11 rounded-full glass" aria-label="Filter products">
              <Filter className="w-5 h-5 text-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="w-11 h-11 rounded-full glass relative" aria-label="Shopping bag">
              <ShoppingBag className="w-5 h-5 text-foreground" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search premium products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-secondary/50 border-0 rounded-2xl text-base placeholder:text-muted-foreground focus-visible:ring-gold/50"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all min-h-[48px]",
                selectedCategory === category.id
                  ? "bg-gold text-black"
                  : "glass text-foreground/80 hover:text-foreground"
              )}
            >
              {category.icon && <category.icon className="w-4 h-4" />}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-6 py-3 border-y border-border/50 bg-secondary/30">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-4 h-4 text-gold" />
          <span>Buyer Protection</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Truck className="w-4 h-4 text-gold" />
          <span>Free Returns</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground text-lg">No products found</p>
            <p className="text-muted-foreground/60 text-sm mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({ 
  product, 
  onToggleFavorite 
}: { 
  product: Product
  onToggleFavorite: (id: string) => void 
}) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <div className="relative rounded-2xl overflow-hidden glass group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-gold text-black font-bold text-xs">
            -{discount}%
          </Badge>
        )}

        {/* Flash Sale Badge */}
        {product.hasFlash && (
          <Badge className="absolute top-2 right-10 bg-destructive text-white font-bold text-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Flash
          </Badge>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-2 right-2 w-9 h-9 rounded-full glass flex items-center justify-center min-w-[44px] min-h-[44px]"
          aria-label={product.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-colors",
              product.isFavorite ? "text-gold fill-gold" : "text-white"
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 leading-snug">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-gold">${product.price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
        </div>

        {/* Rating & Sold */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            <span className="font-semibold text-foreground/80">{product.rating}</span>
            <span>({formatCount(product.reviews)})</span>
          </div>
          <span>{formatCount(product.sold)} sold</span>
        </div>

        {/* Free Shipping */}
        {product.freeShipping && (
          <div className="flex items-center gap-1 mt-2 text-xs text-emerald-500">
            <Truck className="w-3.5 h-3.5" />
            <span>Free Shipping</span>
          </div>
        )}
      </div>
    </div>
  )
}

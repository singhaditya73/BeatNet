"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { MusicVisualizer } from "./music-visualizer"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-background/80 backdrop-blur-md rounded-xl shadow-lg border border-primary/20 p-4 glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">Currently Playing</h3>
          <p className="text-sm text-muted-foreground">Community&apos;s Top Pick</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsFavorite(!isFavorite)} className="hover:text-primary">
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`} />
        </Button>
      </div>

      {/* Song progress */}
      <div className="mb-4">
        <Slider defaultValue={[33]} max={100} step={1} className="my-4" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1:23</span>
          <span>3:45</span>
        </div>
      </div>

      {/* Visualizer */}
      <div className="mb-4">
        <MusicVisualizer />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mt-4">
        <Button variant="ghost" size="icon" className="hover:text-primary">
          <SkipBack className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-primary/50 hover:border-primary hover:text-primary"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
        </Button>
        <Button variant="ghost" size="icon" className="hover:text-primary">
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>

      {/* Volume */}
      <div className="flex items-center mt-4">
        <Volume2 className="h-4 w-4 mr-2 text-muted-foreground" />
        <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
      </div>
    </motion.div>
  )
}

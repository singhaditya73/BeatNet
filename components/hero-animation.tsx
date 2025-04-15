"use client"

import { useRef, useEffect, useMemo } from "react"
import { motion, useAnimation } from "framer-motion"
import { Disc3, Music2, Headphones, Radio, Mic2, Volume2 } from "lucide-react"
import { VinylRecord } from "../components/venyl-record"
import { MusicPlayer } from "./music-player"

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      scale: [0.9, 1],
      opacity: [0.5, 1],
      transition: { duration: 1.5, ease: "easeOut" },
    })
  }, [controls])

  // Pre-generate all random values on component mount to avoid hydration mismatch
  const animationData = useMemo(() => {
    // Seed a fixed value for server-side rendering
    const floatingElements = [
      { icon: <Music2 className="h-8 w-8 text-primary" />, delay: 0, duration: 15 },
      { icon: <Disc3 className="h-10 w-10 text-primary" />, delay: 1.5, duration: 18 },
      { icon: <Music2 className="h-6 w-6 text-primary" />, delay: 0.8, duration: 12 },
      { icon: <Mic2 className="h-12 w-12 text-primary" />, delay: 2.2, duration: 20 },
      { icon: <Headphones className="h-9 w-9 text-primary" />, delay: 1.2, duration: 16 },
      { icon: <Radio className="h-7 w-7 text-primary" />, delay: 0.5, duration: 14 },
      { icon: <Volume2 className="h-10 w-10 text-primary" />, delay: 3.0, duration: 17 },
      { icon: <Headphones className="h-8 w-8 text-primary" />, delay: 2.5, duration: 19 },
    ]

    return floatingElements.map((element, index) => {
      // Pre-calculate all random values
      const initialX = -100 + (index * 25) % 200
      const initialY = -100 + (index * 30) % 200
      const initialRotate = -45 + (index * 15) % 90
      
      // Create keyframes with consistent values
      const xKeyframes = [-50 + index * 15, 50 - index * 10, -70 + index * 20]
      const yKeyframes = [-60 + index * 20, 40 - index * 15, -50 + index * 25]
      const rotateKeyframes = [-20 + index * 5, 30 - index * 8, -15 + index * 10]
      
      return {
        ...element,
        initialX,
        initialY,
        initialRotate,
        xKeyframes,
        yKeyframes,
        rotateKeyframes,
      }
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-md bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/20"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10 dark:from-purple-900/10 dark:via-pink-900/5 dark:to-blue-900/10 animate-gradient"></div>

      {/* Wave animation */}
      <div className="absolute bottom-0 left-0 right-0 h-24 wave from-purple-500/20 via-pink-500/10 to-purple-500/20 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-purple-900/20"></div>

      {/* Center glow */}
      <motion.div animate={controls} className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-64 w-64 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-80 blur-2xl animate-pulse-slow"></div>
      </motion.div>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 p-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="z-10"
        >
          <VinylRecord />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="z-10"
        >
          <MusicPlayer />
        </motion.div>
      </div>

      {/* Floating elements with pre-computed animation values */}
      {animationData.map((element, index) => (
        <motion.div
          key={index}
          initial={{
            x: element.initialX,
            y: element.initialY,
            opacity: 0,
            rotate: element.initialRotate,
          }}
          animate={{
            x: element.xKeyframes,
            y: element.yKeyframes,
            opacity: [0.2, 1, 0.2],
            rotate: element.rotateKeyframes,
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
            times: [0, 0.5, 1],
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 z-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          <div className="p-2 bg-background/40 backdrop-blur-sm rounded-full shadow-lg">{element.icon}</div>
        </motion.div>
      ))}

      {/* Pulsing circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
          initial={{ width: 100, height: 100, opacity: 0.7 }}
          animate={{
            width: [100, 300],
            height: [100, 300],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
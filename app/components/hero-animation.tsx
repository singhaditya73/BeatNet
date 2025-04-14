"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Disc3, Music2, Headphones, Radio } from "lucide-react"

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true)
    
    controls.start({
      scale: [0.9, 1],
      opacity: [0.5, 1],
      transition: { duration: 1.5, ease: "easeOut" },
    })
  }, [controls])

  // Pre-generate animation paths for each element
  // These are fixed paths that will be the same for both server and client
  const animationPaths = [
    { 
      x: [100, -80, 60], 
      y: [-70, 80, -50], 
      rotate: [20, -30, 15] 
    },
    { 
      x: [-120, 70, -90], 
      y: [60, -100, 80], 
      rotate: [-15, 40, -25] 
    },
    { 
      x: [80, -60, 90], 
      y: [-50, 70, -80], 
      rotate: [30, -20, 35] 
    },
    { 
      x: [-90, 100, -70], 
      y: [90, -60, 50], 
      rotate: [-35, 25, -15] 
    },
    { 
      x: [70, -110, 85], 
      y: [-75, 65, -95], 
      rotate: [10, -45, 20] 
    },
    { 
      x: [-60, 85, -75], 
      y: [55, -85, 70], 
      rotate: [-25, 15, -30] 
    },
    { 
      x: [110, -65, 95], 
      y: [-90, 75, -55], 
      rotate: [45, -10, 30] 
    },
    { 
      x: [-80, 95, -105], 
      y: [85, -65, 75], 
      rotate: [-20, 40, -15] 
    },
  ]

  const floatingElements = [
    { icon: <Music2 className="h-8 w-8 text-primary" />, delay: 0, duration: 15 },
    { icon: <Disc3 className="h-10 w-10 text-primary" />, delay: 1.5, duration: 18 },
    { icon: <Music2 className="h-6 w-6 text-primary" />, delay: 0.8, duration: 12 },
    { icon: <Disc3 className="h-12 w-12 text-primary" />, delay: 2.2, duration: 20 },
    { icon: <Headphones className="h-9 w-9 text-primary" />, delay: 1.2, duration: 16 },
    { icon: <Radio className="h-7 w-7 text-primary" />, delay: 0.5, duration: 14 },
    { icon: <Music2 className="h-10 w-10 text-primary" />, delay: 3.0, duration: 17 },
    { icon: <Headphones className="h-8 w-8 text-primary" />, delay: 2.5, duration: 19 },
  ]

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-md bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/20"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10 dark:from-purple-900/10 dark:via-pink-900/5 dark:to-blue-900/10 animate-gradient"></div>

      {/* Center glow */}
      <motion.div animate={controls} className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-64 w-64 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-80 blur-2xl animate-pulse-slow"></div>
      </motion.div>

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="z-10 text-center hover-lift"
        >
          <motion.div
            className="flex h-32 w-32 items-center justify-center rounded-full bg-background/90 shadow-lg border border-primary/20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Music2 className="h-16 w-16 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements - only animate with real values on the client */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          // Fixed initial state ensures server and client start with the same values
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            rotate: 0,
          }}
          // Only apply animations when on the client
          animate={isClient ? {
            x: animationPaths[index].x,
            y: animationPaths[index].y,
            opacity: [0, 1, 0],
            rotate: animationPaths[index].rotate,
          } : {}}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
            times: [0, 0.5, 1],
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 z-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ 
            // Ensure we use number values for all style properties
            opacity: 0 
          }}
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
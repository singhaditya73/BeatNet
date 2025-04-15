"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function MusicVisualizer() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Activate visualizer after a delay for visual effect
    const timer = setTimeout(() => {
      setIsActive(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-end justify-center h-16 space-x-1 mx-auto">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-[6px] mx-[2px] rounded-sm bg-gradient-to-t from-primary to-purple-400"
          initial={{ height: "10px" }}
          animate={{
            height: isActive ? `${Math.floor(Math.random() * 35) + 25}px` : "5px",
          }}
          transition={{
            duration: 0.3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { LogIn, Music, ThumbsUp, Play } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <LogIn className="h-10 w-10" />,
      title: "Create an Account",
      description: "Sign up for free and join the musical democracy in seconds.",
    },
    {
      icon: <Music className="h-10 w-10" />,
      title: "Join a Room",
      description: "Find a room that matches your music taste or create your own.",
    },
    {
      icon: <ThumbsUp className="h-10 w-10" />,
      title: "Vote for Songs",
      description: "Browse the queue and vote for the tracks you want to hear next.",
    },
    {
      icon: <Play className="h-10 w-10" />,
      title: "Enjoy Together",
      description: "Listen in sync with everyone else as the most voted songs play.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {steps.map((step, index) => (
        <motion.div
          key={index}
          variants={item}
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", stiffness: 300 },
          }}
        >
          <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-primary/5 transition-colors duration-300">
            <motion.div
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {step.icon}
            </motion.div>
            <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

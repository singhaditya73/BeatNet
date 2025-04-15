"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TestimonialProps {
  quote: string
  author: string
  role: string
}

export function Testimonial({ quote, author, role }: TestimonialProps) {
  const initials = author
    .split(" ")
    .map((name) => name[0])
    .join("")

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-2 border-transparent hover:border-primary/20">
        <CardContent className="pt-6">
          <div className="relative">
            <div className="absolute -left-2 -top-2 text-4xl text-primary opacity-50">&ldquo;</div>
            <motion.blockquote className="relative z-10 pt-4" initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
              {quote}
            </motion.blockquote>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <div className="font-medium">{author}</div>
              <div className="text-sm text-muted-foreground">{role}</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Disc3 } from "lucide-react"

export function VinylRecord() {
  return (
    <motion.div
      className="relative w-64 h-64 mx-auto"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 shadow-xl">
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-800">
          <div className="absolute inset-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-600 dark:to-gray-700">
            <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-500 opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-500 opacity-20 m-4"></div>
            <div className="absolute inset-0 rounded-full border border-dashed border-gray-500 opacity-20 m-8"></div>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Disc3 className="h-12 w-12 text-primary" />
      </div>
    </motion.div>
  )
}

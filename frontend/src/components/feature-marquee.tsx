"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface FeatureMarqueeProps {
  features: string[]
}

export default function FeatureMarquee({ features }: FeatureMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full py-10 overflow-hidden bg-primary/5 dark:bg-primary/10 transition-colors duration-300">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Key Features</h2>
      </div>
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex space-x-8 py-2 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Number.POSITIVE_INFINITY }}
        >
          {features.concat(features).map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-6 py-3 bg-primary/10 dark:bg-primary/20 rounded-full text-primary font-medium transition-colors duration-300"
            >
              {feature}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}


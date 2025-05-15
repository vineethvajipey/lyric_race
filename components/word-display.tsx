"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface WordDisplayProps {
  words: {
    word: string
    correct: boolean
    original?: string
  }[]
  showParticles?: boolean
}

export function WordDisplay({ words, showParticles = true }: WordDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [words])

  return (
    <div ref={containerRef} className="overflow-y-auto max-h-[300px] p-4">
      <div className="flex flex-wrap gap-1">
        {words.map((word, index) => (
          <div key={index} className="relative">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xl ${word.correct ? "text-green-500 font-medium" : "text-foreground"}`}
            >
              {word.word}
            </motion.span>

            {word.correct && showParticles && <ParticleEffect />}
          </div>
        ))}
      </div>
    </div>
  )
}

function ParticleEffect() {
  return (
    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            y: 0,
            x: 0,
          }}
          animate={{
            opacity: 0,
            y: -20,
            x: Math.random() * 20 - 10,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: Math.random() * 0.2,
          }}
          className="absolute w-1 h-1 rounded-full bg-green-500"
          style={{
            left: `${Math.random() * 20 - 10}px`,
          }}
        />
      ))}
    </div>
  )
}

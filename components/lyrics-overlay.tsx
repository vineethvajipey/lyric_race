"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

interface LyricsOverlayProps {
  currentLyric: string;
  words: {
    word: string;
    correct: boolean;
    original?: string;
  }[];
  showLyrics: boolean;
}

export function LyricsOverlay({ currentLyric, words, showLyrics }: LyricsOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [words]);

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
      <div className="p-3 bg-gradient-to-t from-black/80 to-transparent">
        {/* Current Lyrics */}
        {showLyrics && (
          <div className="mb-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-base md:text-lg font-bold text-white text-center"
            >
              {currentLyric || "Waiting for lyrics..."}
            </motion.div>
          </div>
        )}

        {/* User's Words */}
        <div ref={containerRef} className="overflow-y-auto max-h-[80px]">
          <div className="flex flex-wrap gap-1 justify-center">
            {words.map((word, index) => (
              <div key={index} className="relative">
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm md:text-base font-medium ${
                    word.correct ? "text-green-400" : "text-white"
                  }`}
                >
                  {word.word}
                </motion.span>

                {word.correct && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          opacity: 1,
                          y: 0,
                          x: 0,
                        }}
                        animate={{
                          opacity: 0,
                          y: -10,
                          x: Math.random() * 10 - 5,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                          delay: Math.random() * 0.2,
                        }}
                        className="absolute w-1 h-1 rounded-full bg-green-400"
                        style={{
                          left: `${Math.random() * 10 - 5}px`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

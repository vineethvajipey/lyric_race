"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Mic, MicOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { WordDisplay } from "@/components/word-display"

export default function PracticePage() {
  // Each word now has a timestamp
  const [processedWords, setProcessedWords] = useState<{ word: string; correct: boolean; timestamp: number }[]>([])
  const { transcript, resetTranscript, startListening, stopListening, browserSupportsSpeechRecognition } = useSpeechRecognition()
  const wordsRef = useRef<HTMLDivElement>(null)

  // Start listening automatically on mount
  useEffect(() => {
    startListening()
    return () => stopListening()
  }, [startListening, stopListening])

  // Add new words with timestamp
  useEffect(() => {
    if (transcript) {
      const now = Date.now()
      const words = transcript.split(" ").filter(Boolean).map((word) => ({
        word,
        correct: true,
        timestamp: now
      }))
      // Add new words to the list
      setProcessedWords((prev) => [...prev, ...words])
    }
  }, [transcript])

  // Remove words older than 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const cutoff = Date.now() - 5000
      setProcessedWords((prev) => prev.filter((w) => w.timestamp > cutoff))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (wordsRef.current) {
      wordsRef.current.scrollTop = wordsRef.current.scrollHeight
    }
  }, [processedWords])

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold">Speech Recognition Not Supported</h1>
          <p>Your browser doesn't support speech recognition. Please try using Chrome, Edge, or Safari.</p>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b p-4">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Practice Mode</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto p-4 flex flex-col">
        <div
          ref={wordsRef}
          className="flex-1 bg-muted/30 rounded-lg p-6 mb-6 overflow-y-auto min-h-[300px] max-h-[60vh]"
        >
          {processedWords.length > 0 ? (
            <WordDisplay words={processedWords} fadeDuration={5000} />
          ) : (
            <p className="text-muted-foreground text-center mt-12">
              Speak now...
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

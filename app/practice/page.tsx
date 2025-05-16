"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Mic, MicOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { WordDisplay } from "@/components/word-display"

export default function PracticePage() {
  const [processedWords, setProcessedWords] = useState<{ word: string; correct: boolean }[]>([])

  const { transcript, resetTranscript, startListening, stopListening, browserSupportsSpeechRecognition, isListening, error } =
    useSpeechRecognition()

  const wordsRef = useRef<HTMLDivElement>(null)

  // Process transcript into words
  useEffect(() => {
    if (transcript) {
      const words = transcript.split(" ").map((word) => ({
        word,
        correct: true, // In practice mode, all words are marked as correct
      }))
      setProcessedWords(words)
    }
  }, [transcript])

  useEffect(() => {
    if (wordsRef.current) {
      wordsRef.current.scrollTop = wordsRef.current.scrollHeight
    }
  }, [processedWords])

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      resetTranscript()
      startListening()
    }
  }

  const handleReset = () => {
    resetTranscript()
    stopListening()
    setProcessedWords([])
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold">Speech Recognition Error</h1>
          <p className="text-red-500">{error}</p>
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
            <WordDisplay words={processedWords} />
          ) : (
            <p className="text-muted-foreground text-center mt-12">
              {isListening ? "Speak now..." : "Press the microphone button to start speaking"}
            </p>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleListening}
            size="lg"
            variant={isListening ? "destructive" : "default"}
            className="gap-2 w-40"
          >
            {isListening ? (
              <>
                <MicOff className="h-5 w-5" />
                Stop
              </>
            ) : (
              <>
                <Mic className="h-5 w-5" />
                Start
              </>
            )}
          </Button>

          <Button onClick={handleReset} variant="outline" size="lg" className="w-40">
            Reset
          </Button>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Play } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { AudioPlayer } from "@/components/audio-player"
import { WordDisplay } from "@/components/word-display"
import SelfieVideo from "@/components/SelfieVideo"
import { LyricsOverlay } from "@/components/lyrics-overlay"

import { compareWords, calculateAccuracy, getCurrentLyricLine, normalizeText } from "@/lib/lyrics-utils"
import { LyricsToggle } from "@/components/lyrics-toggle"

export default function GamePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const songId = searchParams.get("song")

  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready")
  const [score, setScore] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentLyric, setCurrentLyric] = useState("")
  const [processedWords, setProcessedWords] = useState<{ word: string; correct: boolean }[]>([])
  const [totalWords, setTotalWords] = useState(0)
  const [showLyrics, setShowLyrics] = useState(true)

  const { transcript, resetTranscript, startListening, stopListening, browserSupportsSpeechRecognition, isListening, error } =
    useSpeechRecognition()

  const [song, setSong] = useState<any>(undefined);
  const lyricsRef = useRef<HTMLDivElement>(null);

  // Fetch song data from API
  useEffect(() => {
    if (!songId) {
      router.push("/");
      return;
    }
    fetch(`/api/songs/${songId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Song not found');
        return res.json();
      })
      .then((data) => {
        setSong(data);
        // Count total words in all lyrics for scoring
        const allLyrics = data.lyrics.map((line: any) => line.text).join(" ");
        setTotalWords(normalizeText(allLyrics).split(" ").length);
      })
      .catch(() => {
        router.push("/");
      });
  }, [songId, router]);

  // Update current lyric based on time
  useEffect(() => {
    if (song && gameState === "playing") {
      const currentLine = getCurrentLyricLine(song.lyrics, currentTime)
      if (currentLine) {
        setCurrentLyric(currentLine.text)
      } else {
        setCurrentLyric("")
      }
    }
  }, [currentTime, song, gameState])

  // Process speech recognition results
  useEffect(() => {
    if (gameState === "playing" && currentLyric && transcript) {
      const comparisonResult = compareWords(currentLyric, transcript)
      setProcessedWords(comparisonResult)
    }
  }, [transcript, currentLyric, gameState])

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time)
  }

  const startGame = () => {
    resetTranscript()
    startListening()
    setGameState("playing")
    setProcessedWords([])
  }

  const endGame = () => {
    stopListening()
    setGameState("finished")

    // Calculate final score
    if (totalWords > 0) {
      const correctWords = processedWords.filter((word) => word.correct).length
      const accuracy = calculateAccuracy(processedWords, totalWords)
      setScore(accuracy)
    }
  }

  const resetGame = () => {
    resetTranscript()
    setGameState("ready")
    setScore(0)
    setProcessedWords([])
    setCurrentTime(0)
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
          <p>Your browser doesn't support microphone access. Please try using a different browser.</p>
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

  if (!song) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b p-4">
  <div className="container relative flex items-center justify-between">
    <Link href="/">
      <Button variant="ghost" size="sm" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
    </Link>
    <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold whitespace-nowrap pointer-events-none select-none">
      {song.title}
    </h1>
  </div>
</header>

      <main className="flex-1 container max-w-3xl mx-auto p-4 flex flex-col">
        {gameState === "ready" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
            <div>
              <h2 className="text-2xl font-bold">{song.title}</h2>
              <p className="text-muted-foreground">by {song.artist}</p>
              <p className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted">
                Difficulty: {song.difficulty}
              </p>
            </div>

            <div className="mb-4">
              <SelfieVideo />
            </div>

            <Button onClick={startGame} size="lg" className="gap-2">
              <Play className="h-5 w-5" />
              Start Singing
            </Button>
          </div>
        )}

        {gameState === "playing" && (
  <div className="flex-1 flex flex-col">
    {/* Current lyrics display - above the video */}
    {showLyrics && (
      <div className="mb-3 max-w-xl mx-auto w-full px-4">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">Current Lyrics:</p>
            <LyricsToggle showLyrics={showLyrics} onToggle={() => setShowLyrics(!showLyrics)} />
          </div>
          <div ref={lyricsRef} className="text-lg font-medium overflow-y-auto max-h-[80px]">
            {currentLyric || "Waiting for lyrics..."}
          </div>
        </div>
      </div>
    )}
    
    {/* Video container */}
    <div className="flex flex-col items-center mb-4">
      <div className="w-full max-w-lg mx-auto relative rounded-lg overflow-hidden">
        <div className="aspect-square bg-black">
          <div className="absolute inset-0 w-full h-full">
            <SelfieVideo fullScreen={true} />
          </div>
        </div>
        
        {/* Only the transcript overlay */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end pointer-events-none">
            <div className="p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-center">
                <div className="text-white">
                  <WordDisplay 
                    words={processedWords.map(word => ({
                      ...word,
                      correct: word.correct
                    }))}
                    showParticles={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Show lyrics toggle when lyrics are hidden */}
        {!showLyrics && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/50 p-2 rounded-lg">
            <LyricsToggle showLyrics={showLyrics} onToggle={() => setShowLyrics(!showLyrics)} />
          </div>
        )}
      </div>
    </div>
    
    {/* Audio player and end button */}
    <div className="px-4 max-w-xl mx-auto w-full">
      <div className="p-4 rounded-lg space-y-4 bg-muted/30">
        <AudioPlayer src={song.audioSrc} onTimeUpdate={handleTimeUpdate} onEnded={endGame} autoPlay={true} />
        <div className="flex justify-center">
          <Button onClick={endGame} variant="outline" size="lg">
            End Performance
          </Button>
        </div>
      </div>
    </div>
  </div>
)}

        {gameState === "finished" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-muted/30 p-8 rounded-lg"
            >
              <h2 className="text-3xl font-bold">Your Score: {score}%</h2>
            </motion.div>

            <div className="bg-muted/30 rounded-lg p-6 w-full max-w-md">
              <h3 className="font-medium mb-2">Your Performance:</h3>
              <WordDisplay words={processedWords} showParticles={false} />
            </div>

            <div className="flex gap-4">
              <Button onClick={resetGame} size="lg">
                Try Again
              </Button>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Choose Another Song
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

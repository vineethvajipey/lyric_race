"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  src: string
  onTimeUpdate?: (currentTime: number) => void
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  autoPlay?: boolean
}

export function AudioPlayer({ src, onTimeUpdate, onPlay, onPause, onEnded, autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
      onTimeUpdate?.(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onEnded?.()
    }

    // Events
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("ended", handleEnded)

    // Cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [onTimeUpdate, onEnded])

  useEffect(() => {
    if (autoPlay) {
      playAudio()
    }
  }, [autoPlay])

  const playAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    audio
      .play()
      .then(() => {
        setIsPlaying(true)
        onPlay?.()
      })
      .catch((error) => {
        console.error("Error playing audio:", error)
      })
  }

  const pauseAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    setIsPlaying(false)
    onPause?.()
  }

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio()
    } else {
      playAudio()
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)

    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)

    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  return (
    <div className="w-full space-y-2">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <span className="text-sm w-16">{formatTime(currentTime)}</span>

        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleTimeChange}
          className="flex-1"
        />

        <span className="text-sm w-16 text-right">{formatTime(duration)}</span>

        <Button variant="ghost" size="icon" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  )
}

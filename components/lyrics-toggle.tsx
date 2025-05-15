"use client"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface LyricsToggleProps {
  showLyrics: boolean
  onToggle: () => void
}

export function LyricsToggle({ showLyrics, onToggle }: LyricsToggleProps) {
  return (
    <Button variant="outline" size="sm" onClick={onToggle} className="gap-1">
      {showLyrics ? (
        <>
          <EyeOff className="h-3.5 w-3.5" />
          Hide Lyrics
        </>
      ) : (
        <>
          <Eye className="h-3.5 w-3.5" />
          Show Lyrics
        </>
      )}
    </Button>
  )
}

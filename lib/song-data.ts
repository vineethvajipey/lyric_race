// This file contains the song data structure
// Note: This file does NOT contain actual copyrighted lyrics

import fs from 'fs'
import path from 'path'

export interface Song {
  id: string
  title: string
  artist: string
  audioSrc: string
  bpm: number
  difficulty: "easy" | "medium" | "hard"
  coverArt?: string // Path to cover art image
  lyrics: LyricLine[]
}

export interface LyricLine {
  text: string
  startTime: number
  endTime: number
}

// Dynamically load all songs from the lib/songs directory
// Dynamically load all songs from the lib/songs directory
const songsDir = path.join(process.cwd(), 'lib', 'songs')

function loadSongs(): Record<string, Song> {
  const songFiles = fs.readdirSync(songsDir).filter((file) => file.endsWith('.json'))
  const songs: Record<string, Song> = {}
  for (const file of songFiles) {
    const songData = JSON.parse(fs.readFileSync(path.join(songsDir, file), 'utf-8')) as Song
    songs[songData.id] = songData
  }
  return songs
}

export const songs = loadSongs()


// Function to get a song by ID
export function getSong(id: string): Song | undefined {
  return songs[id]
}

// This file contains the song data structure
// Note: This file does NOT contain actual copyrighted lyrics

export interface Song {
  id: string
  title: string
  artist: string
  audioSrc: string
  bpm: number
  difficulty: "easy" | "medium" | "hard"
  // The lyrics array should be populated by the user with their own content
  lyrics: LyricLine[]
}

export interface LyricLine {
  text: string
  startTime: number
  endTime: number
}

// Example song structure with placeholder data
// Users should replace the lyrics array with their own content
export const songs: Record<string, Song> = {
  rap_god: {
    id: "rap_god",
    title: "Rap God",
    artist: "Fast Rapper",
    audioSrc: "/audio/rap_god_instrumental.mp3", // Path to the instrumental
    bpm: 148,
    difficulty: "hard",
    lyrics: [
      // This is where the user would add their own lyrics with timestamps
      // Example structure (user needs to replace with actual content):
      { text: "[Placeholder for first line]", startTime: 0, endTime: 3 },
      { text: "[Placeholder for second line]", startTime: 3, endTime: 6 },
      // More lines...
    ],
  },
  birds_of_feather: {
    id: "birds_of_feather",
    title: "Birds of a Feather",
    artist: "Billie Eilish",
    audioSrc: "/audio/birds_of_a_feather_instrumental.mp3", // Path to the instrumental
    bpm: 95,
    difficulty: "easy",
    lyrics: [
  { text: "I want you to stay", startTime: 0, endTime: 4 },
  { text: "'Til I'm in the grave", startTime: 4, endTime: 8 },
  { text: "'Til I rot away, dead and buried", startTime: 8, endTime: 12 },
  { text: "'Til I'm in the casket you carry", startTime: 12, endTime: 16 },
  { text: "If you go, I'm going too, uh", startTime: 16, endTime: 20 },
  { text: "'Cause it was always you, alright", startTime: 20, endTime: 24 },
  { text: "And if I'm turnin' blue, please don't save me", startTime: 24, endTime: 28 },
  { text: "Nothing left to lose without my baby", startTime: 28, endTime: 32 },
  { text: "Birds of a feather, we should stick together, I know", startTime: 32, endTime: 36 },
  { text: "I said I'd never think I wasn't better alone", startTime: 36, endTime: 40 },
  { text: "Can't change the weather, might not be forever", startTime: 40, endTime: 44 },
  { text: "But if it's forever, it's even better", startTime: 44, endTime: 48 },
  { text: "And I don't know what I'm cryin' for", startTime: 48, endTime: 52 },
  { text: "I don't think I could love you more", startTime: 52, endTime: 56 },
  { text: "It might not be long, but baby, I", startTime: 56, endTime: 60 },
  { text: "I'll love you 'til the day that I die", startTime: 60, endTime: 64 },
  { text: "'Til the day that I die", startTime: 64, endTime: 68 },
  { text: "'Til the light leaves my eyes", startTime: 68, endTime: 72 },
  { text: "'Til the day that I die", startTime: 72, endTime: 76 },
  { text: "I want you to see, hm", startTime: 76, endTime: 80 },
  { text: "How you look to me, hm", startTime: 80, endTime: 84 },
  { text: "You wouldn't believe if I told ya", startTime: 84, endTime: 88 },
  { text: "You would keep the compliments I throw ya", startTime: 88, endTime: 92 },
  { text: "But you're so full of shit, uh", startTime: 92, endTime: 96 },
  { text: "Tell me it's a bit, no", startTime: 96, endTime: 100 },
  { text: "Say you don't see it, your mind's polluted", startTime: 100, endTime: 104 },
  { text: "Say you wanna quit, don't be stupid", startTime: 104, endTime: 108 },
  { text: "And I don't know what I'm cryin' for", startTime: 108, endTime: 112 },
  { text: "I don't think I could love you more", startTime: 112, endTime: 116 },
  { text: "Might not be long, but baby, I", startTime: 116, endTime: 120 },
  { text: "Don't wanna say goodbye", startTime: 120, endTime: 124 },
  { text: "Birds of a feather, we should stick together, I know ('til the day that I die)", startTime: 124, endTime: 128 },
  { text: "I said I'd never think I wasn't better alone ('til the light leaves my eyes)", startTime: 128, endTime: 132 },
  { text: "Can't change the weather, might not be forever ('til the day I die)", startTime: 132, endTime: 136 },
  { text: "But if it's forever, it's even better", startTime: 136, endTime: 140 },
  { text: "I knew you in another life", startTime: 140, endTime: 144 },
  { text: "You had that same look in your eyes", startTime: 144, endTime: 148 },
  { text: "I love you, don't act so surprised", startTime: 148, endTime: 152 },
],
  },
}

// Function to get a song by ID
export function getSong(id: string): Song | undefined {
  return songs[id]
}

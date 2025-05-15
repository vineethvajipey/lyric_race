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
      { text: "I want you to stay", startTime: 0.0, endTime: 5.5 },
      { text: "'Til I'm in the grave", startTime: 5.5, endTime: 7.5 },
      { text: "'Til I rot away, dead and buried", startTime: 7.5, endTime: 11.0 },
      { text: "'Til I'm in the casket you carry", startTime: 11.0, endTime: 13.5 },
      { text: "If you go, I'm going too, uh", startTime: 13.5, endTime: 15.0 },
      { text: "'Cause it was always you, alright", startTime: 15.0, endTime: 16.0 },
      { text: "And if I'm turnin' blue, please don't save me", startTime: 16.0, endTime: 19.0 },
      { text: "Nothing left to lose without my baby", startTime: 19.0, endTime: 22.0 },
      { text: "Birds of a feather, we should stick together, I know", startTime: 22.0, endTime: 25.0 },
      { text: "I said I'd never think I wasn't better alone", startTime: 25.0, endTime: 28.0 },
      { text: "Can't change the weather, might not be forever", startTime: 28.0, endTime: 31.0 },
      { text: "But if it's forever, it's even better", startTime: 31.0, endTime: 34.0 },
      { text: "And I don't know what I'm cryin' for", startTime: 34.0, endTime: 36.5 },
      { text: "I don't think I could love you more", startTime: 36.5, endTime: 39.0 },
      { text: "It might not be long, but baby, I", startTime: 39.0, endTime: 41.0 },
      { text: "I'll love you 'til the day that I die", startTime: 41.0, endTime: 44.0 },
      { text: "'Til the day that I die", startTime: 44.0, endTime: 46.0 },
      { text: "'Til the light leaves my eyes", startTime: 46.0, endTime: 48.0 },
      { text: "'Til the day that I die", startTime: 48.0, endTime: 50.0 },
      { text: "I want you to see, hm", startTime: 50.0, endTime: 52.0 },
      { text: "How you look to me, hm", startTime: 52.0, endTime: 54.0 },
      { text: "You wouldn't believe if I told ya", startTime: 54.0, endTime: 56.5 },
      { text: "You would keep the compliments I throw ya", startTime: 56.5, endTime: 59.0 },
      { text: "But you're so full of shit, uh", startTime: 59.0, endTime: 61.0 },
      { text: "Tell me it's a bit, no", startTime: 61.0, endTime: 63.0 },
      { text: "Say you don't see it, your mind's polluted", startTime: 63.0, endTime: 65.5 },
      { text: "Say you wanna quit, don't be stupid", startTime: 65.5, endTime: 68.0 },
      { text: "And I don't know what I'm cryin' for", startTime: 68.0, endTime: 70.5 },
      { text: "I don't think I could love you more", startTime: 70.5, endTime: 73.0 },
      { text: "Might not be long, but baby, I", startTime: 73.0, endTime: 75.0 },
      { text: "Don't wanna say goodbye", startTime: 75.0, endTime: 77.0 },
      { text: "Birds of a feather, we should stick together, I know ('til the day that I die)", startTime: 77.0, endTime: 80.0 },
      { text: "I said I'd never think I wasn't better alone ('til the light leaves my eyes)", startTime: 80.0, endTime: 83.0 },
      { text: "Can't change the weather, might not be forever ('til the day I die)", startTime: 83.0, endTime: 86.0 },
      { text: "But if it's forever, it's even better", startTime: 86.0, endTime: 89.0 },
      { text: "I knew you in another life", startTime: 89.0, endTime: 91.0 },
      { text: "You had that same look in your eyes", startTime: 91.0, endTime: 93.0 },
      { text: "I love you, don't act so surprised", startTime: 93.0, endTime: 95.0 },
    ],    
  },
}

// Function to get a song by ID
export function getSong(id: string): Song | undefined {
  return songs[id]
}

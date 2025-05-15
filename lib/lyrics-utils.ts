// This file contains utility functions for lyric processing and comparison

// Normalize text for comparison (lowercase, remove punctuation, extra spaces)
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

// Compare two strings and return an array of words with match status
export function compareWords(
  reference: string,
  spoken: string,
): { word: string; correct: boolean; original?: string }[] {
  const normalizedReference = normalizeText(reference)
  const normalizedSpoken = normalizeText(spoken)

  const referenceWords = normalizedReference.split(" ")
  const spokenWords = normalizedSpoken.split(" ")

  // Create a map to track which reference words have been matched
  const matchedReferenceWords = new Set<number>()

  // For each spoken word, find the best matching reference word
  const result = spokenWords.map((spokenWord) => {
    // Try to find an exact match first
    for (let i = 0; i < referenceWords.length; i++) {
      if (!matchedReferenceWords.has(i) && referenceWords[i] === spokenWord) {
        matchedReferenceWords.add(i)
        return { word: spokenWord, correct: true }
      }
    }

    // If no exact match, mark as incorrect
    return { word: spokenWord, correct: false }
  })

  return result
}

// Calculate accuracy score based on matched words
export function calculateAccuracy(
  matchedWords: { word: string; correct: boolean }[],
  totalReferenceWords: number,
): number {
  const correctWords = matchedWords.filter((word) => word.correct).length
  return Math.round((correctWords / totalReferenceWords) * 100)
}

// Simple data structure for lyrics with timestamps
export interface LyricLine {
  text: string
  startTime: number
  endTime: number
}

// Get the current lyric line based on the current time
export function getCurrentLyricLine(lyrics: LyricLine[], currentTime: number): LyricLine | null {
  return lyrics.find((line) => currentTime >= line.startTime && currentTime <= line.endTime) || null
}

// Get the next lyric line based on the current time
export function getNextLyricLine(lyrics: LyricLine[], currentTime: number): LyricLine | null {
  return lyrics.find((line) => currentTime < line.startTime) || null
}

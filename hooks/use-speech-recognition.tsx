"use client"

import { useState, useEffect, useCallback } from "react"

interface SpeechRecognitionResult {
  transcript: string
  resetTranscript: () => void
  startListening: () => void
  stopListening: () => void
  browserSupportsSpeechRecognition: boolean
  isListening: boolean
  error: string | null
}

// Define the SpeechRecognition type
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onresult: (event: any) => void
  onerror: (event: any) => void
  onend: (event: any) => void
}

// Define the window with SpeechRecognition
interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition: new () => SpeechRecognition
  webkitSpeechRecognition: new () => SpeechRecognition
}

export function useSpeechRecognition(): SpeechRecognitionResult {
  const [transcript, setTranscript] = useState("")
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [browserSupports, setBrowserSupports] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const windowWithSpeech = window as unknown as WindowWithSpeechRecognition
      const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = true
        recognitionInstance.interimResults = true
        recognitionInstance.lang = "en-US"

        recognitionInstance.onresult = (event) => {
          let interimTranscript = ""
          let finalTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript + " "
            } else {
              interimTranscript += transcript
            }
          }

          setTranscript((prev) => finalTranscript + interimTranscript)
        }
        
        recognitionInstance.onstart = () => {
          setIsListening(true)
        }
        
        recognitionInstance.onend = () => {
          setIsListening(false)
        }
        
        recognitionInstance.onerror = (event) => {
          console.error("Speech recognition error:", event)
          setError("An error occurred with speech recognition.")
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
        setBrowserSupports(true)
      } else {
        setBrowserSupports(false)
        setError("Your browser does not support speech recognition.")
      }
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [])

  const startListening = useCallback(() => {
    if (recognition) {
      try {
        setTranscript("") // Reset transcript when starting
        recognition.start()
      } catch (error) {
        console.error("Error starting speech recognition:", error)
        setError("Failed to start speech recognition.")
      }
    }
  }, [recognition])

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop()
    }
  }, [recognition])

  const resetTranscript = useCallback(() => {
    setTranscript("")
    setError(null)
  }, [])

  return {
    transcript,
    resetTranscript,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition: browserSupports,
    isListening,
    error
  }
}

require('dotenv').config();
const { createClient } = require('@deepgram/sdk');
const recorder = require('node-record-lpcm16');

// Initialize Deepgram with the API key
// Using the API key directly as provided in the request
const deepgramApiKey = '1f9c3b4b5e9a9df4acc1efc7340ce90d95657a38c';

// Log the API key (first few characters for debugging)
console.log(`Using API key: ${deepgramApiKey.substring(0, 8)}...`);

// Create Deepgram client
const deepgram = createClient(deepgramApiKey);

// Create a function to start the microphone and connect to Deepgram
async function startLiveTranscription() {
  try {
    console.log('Initializing Deepgram connection...');
    
    // Connect to Deepgram for real-time transcription
    const deepgramLive = await deepgram.listen.live({
      language: 'en',
      smart_format: true,
      model: 'nova-2',
      interim_results: true,
    });
    
    // Handle connection open
    deepgramLive.on('open', () => {
      console.log('Connected to Deepgram! Start speaking...');
      
      // Start recording from the microphone
      const recording = recorder.record({
        sampleRate: 16000,
        channels: 1,
        audioType: 'raw', // Raw PCM audio data
        threshold: 0.5,
        recordProgram: 'rec', // Uses SoX
      });
      
      // Send the microphone data to Deepgram
      recording.stream()
        .on('data', (chunk) => {
          deepgramLive.send(chunk);
        })
        .on('error', (err) => {
          console.error('Recording error:', err);
        });
      
      // Set up cleanup for when the script is terminated
      process.on('SIGINT', () => {
        console.log('\nStopping recording...');
        recording.stop();
        deepgramLive.finish();
        process.exit(0);
      });
    });
    
    // Handle transcription results
    deepgramLive.on('transcript', (transcription) => {
      // Check if there's a transcript
      const transcript = transcription?.results?.channels[0]?.alternatives[0]?.transcript;
      
      if (transcript && transcript.trim() !== '') {
        // Clear the line and print the new transcript
        process.stdout.write('\r\x1b[K'); // Clear the current line
        process.stdout.write(`Transcript: ${transcript}`);
      }
    });
    
    // Handle errors
    deepgramLive.on('error', (error) => {
      console.error('Deepgram error:', error);
    });
    
    // Handle close
    deepgramLive.on('close', () => {
      console.log('\nConnection closed.');
      process.exit(0);
    });
    
    console.log('Waiting for Deepgram connection to open...');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Print instructions
console.log('=== Deepgram Live Transcription Test ===');
console.log('This script will record audio from your microphone and transcribe it in real-time.');
console.log('Press Ctrl+C to stop recording and exit.');
console.log('');

// Start the live transcription
startLiveTranscription();

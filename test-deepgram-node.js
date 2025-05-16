require('dotenv').config();
const { createClient } = require('@deepgram/sdk');
const fs = require('fs');
const path = require('path');

// Initialize Deepgram with the API key from environment variable
const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
console.log(`Using API key from environment: ${deepgramApiKey ? deepgramApiKey.substring(0, 4) + '...' : 'not found'}`);

// Create Deepgram client
const deepgram = createClient(deepgramApiKey);

// Use a pre-recorded audio file for testing
async function testDeepgramWithFile() {
  try {
    console.log('Starting Deepgram test with audio file...');
    
    // Path to your audio file
    const audioFile = path.join(__dirname, 'public', 'audio', 'NOKIA.mp3');
    
    // Check if file exists
    if (!fs.existsSync(audioFile)) {
      console.error(`Error: File ${audioFile} does not exist. Please provide a valid audio file.`);
      return;
    }
    
    console.log(`Using audio file: ${audioFile}`);
    
    // Read the audio file
    const audio = fs.readFileSync(audioFile);
    
    // Configure the transcription request
    const source = {
      buffer: audio,
      mimetype: 'audio/mp3', // MP3 file type
    };
    
    const options = {
      punctuate: true,
      model: 'nova-2',
      language: 'en',
      smart_format: true,
      diarize: true, // Speaker diarization
    };
    
    // Send the audio to Deepgram for transcription
    console.log('Sending audio to Deepgram...');
    const response = await deepgram.transcribe(source, options);
    
    // Print the transcription results
    console.log('Transcription results:');
    console.log(JSON.stringify(response, null, 2));
    
    // Print just the transcript text
    const transcript = response.results?.channels[0]?.alternatives[0]?.transcript;
    console.log('\nTranscript:');
    console.log(transcript || 'No transcript available');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Start the test
testDeepgramWithFile();

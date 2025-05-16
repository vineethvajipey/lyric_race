require('dotenv').config();
const fs = require('fs');
const path = require('path');
const fetch = require('cross-fetch');

// Get API key from environment
const apiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
console.log(`Using API key: ${apiKey ? apiKey.substring(0, 4) + '...' : 'not found'}`);

async function transcribeAudio() {
  try {
    // Path to audio file
    const audioFile = path.join(__dirname, 'public', 'audio', 'NOKIA.mp3');
    
    // Check if file exists
    if (!fs.existsSync(audioFile)) {
      console.error(`Error: File ${audioFile} does not exist`);
      return;
    }
    
    console.log(`Using audio file: ${audioFile}`);
    
    // Read the audio file
    const audioData = fs.readFileSync(audioFile);
    
    // Deepgram API endpoint
    const url = 'https://api.deepgram.com/v1/listen';
    
    // Parameters for transcription
    const params = new URLSearchParams({
      model: 'nova-2',
      smart_format: 'true',
      punctuate: 'true',
      diarize: 'true',
      language: 'en'
    });
    
    console.log('Sending request to Deepgram...');
    
    // Make the API request
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'audio/mp3'
      },
      body: audioData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    // Parse the response
    const data = await response.json();
    
    // Print the full response
    console.log('Transcription results:');
    console.log(JSON.stringify(data, null, 2));
    
    // Print just the transcript
    const transcript = data.results?.channels[0]?.alternatives[0]?.transcript;
    console.log('\nTranscript:');
    console.log(transcript || 'No transcript available');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the transcription
transcribeAudio();

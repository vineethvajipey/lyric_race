require('dotenv').config();
const { Deepgram } = require('@deepgram/sdk');
const MicrophoneStream = require('microphone-stream').default;

// Initialize Deepgram with the API key
const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || '1f9c3b4b5e9a9df4acc1efc7340ce90d95657a38';
const deepgram = new Deepgram(deepgramApiKey);

// Create a function to start the microphone and connect to Deepgram
async function startTranscription() {
  try {
    console.log('Starting microphone...');
    
    // Create a microphone stream
    const micStream = new MicrophoneStream();
    
    // Start the microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        micStream.setStream(stream);
        console.log('Microphone started. Speak now...');
      })
      .catch((err) => {
        console.error('Error accessing microphone:', err);
      });
    
    // Connect to Deepgram for real-time transcription
    const deepgramLive = deepgram.transcription.live({
      language: 'en',
      smart_format: true,
      model: 'nova-2',
      interim_results: true,
    });
    
    // Handle connection open
    deepgramLive.addListener('open', () => {
      console.log('Connected to Deepgram. Start speaking...');
      
      // Send audio data to Deepgram
      micStream.on('data', (chunk) => {
        deepgramLive.send(chunk);
      });
    });
    
    // Handle transcription results
    deepgramLive.addListener('transcriptReceived', (transcription) => {
      const transcript = transcription.channel.alternatives[0].transcript;
      if (transcript) {
        console.log(`Transcription: ${transcript}`);
      }
    });
    
    // Handle errors
    deepgramLive.addListener('error', (error) => {
      console.error('Deepgram error:', error);
    });
    
    // Handle close
    deepgramLive.addListener('close', () => {
      console.log('Connection closed.');
      micStream.stop();
    });
    
    // Set up cleanup for when the script is terminated
    process.on('SIGINT', () => {
      console.log('Stopping...');
      deepgramLive.finish();
      micStream.stop();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Start the transcription
startTranscription();

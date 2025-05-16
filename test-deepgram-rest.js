require('dotenv').config();
const fetch = require('cross-fetch');

// Read API key from environment variable
const apiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
console.log(`Using API key from environment: ${apiKey ? apiKey.substring(0, 4) + '...' : 'not found'}`);

// Function to test the Deepgram API using REST
async function testDeepgramRest() {
  console.log('Testing Deepgram API using REST...');
  
  // Create a simple text-to-speech request
  // This is a simple endpoint that should work with any valid API key
  const url = 'https://api.deepgram.com/v1/listen';
  
  try {
    // Create a simple audio data (just a few bytes for testing)
    const dummyAudio = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]);
    
    // Make the request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'audio/wav'
      },
      body: dummyAudio
    });
    
    // Check the response status
    if (response.ok) {
      const data = await response.json();
      console.log('API request successful:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      const errorText = await response.text();
      console.error(`API request failed with status ${response.status}:`);
      console.error(errorText);
      
      if (response.status === 401) {
        console.error('\nThe API key appears to be invalid or unauthorized.');
        console.error('Please check that you are using a valid Deepgram API key.');
        console.error('You can get a free API key from https://console.deepgram.com/');
      }
    }
  } catch (error) {
    console.error('Error making API request:');
    console.error(error);
  }
}

// Run the test
testDeepgramRest();

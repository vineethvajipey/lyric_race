const { createClient } = require('@deepgram/sdk');

// Initialize Deepgram with the API key
const deepgramApiKey = '1f9c3b4b5e9a9df4acc1efc7340ce90d95657a38c';
console.log(`Using API key: ${deepgramApiKey.substring(0, 8)}...`);

// Create Deepgram client
const deepgram = createClient(deepgramApiKey);

// Simple function to test the API key
async function testApiKey() {
  try {
    console.log('Testing Deepgram API key...');
    
    // Make a simple request to check if the API key is valid
    // We'll use the projects.list() method which should be available with any valid key
    const result = await deepgram.manage.getProjects();
    
    console.log('API key is valid! Response:');
    console.log(JSON.stringify(result, null, 2));
    
    return true;
  } catch (error) {
    console.error('Error testing API key:');
    console.error(error.message || error);
    
    if (error.message && error.message.includes('401')) {
      console.error('\nThe API key appears to be invalid or unauthorized.');
      console.error('Please check that you are using a valid Deepgram API key.');
    }
    
    return false;
  }
}

// Run the test
testApiKey();

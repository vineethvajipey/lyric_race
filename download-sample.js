const fs = require('fs');
const https = require('https');

// URL to a sample audio file (this is a public domain audio sample)
const sampleAudioUrl = 'https://github.com/deepgram-devs/deepgram-node-sdk/raw/main/examples/prerecorded/sample.wav';
const outputPath = './sample.wav';

console.log(`Downloading sample audio from ${sampleAudioUrl}...`);

// Download the file
https.get(sampleAudioUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download file: ${response.statusCode} ${response.statusMessage}`);
    return;
  }

  const fileStream = fs.createWriteStream(outputPath);
  response.pipe(fileStream);

  fileStream.on('finish', () => {
    fileStream.close();
    console.log(`Sample audio downloaded to ${outputPath}`);
  });
}).on('error', (err) => {
  console.error(`Error downloading file: ${err.message}`);
  fs.unlink(outputPath, () => {}); // Clean up partial file
});

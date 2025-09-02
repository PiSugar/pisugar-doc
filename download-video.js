// download videos and save to build/assets/video
// video list
// https://doc-resourses.pisugar.uk/pisugar2-hardware-install.mp4
// https://doc-resourses.pisugar.uk/PiSugar2_install.mp4
// https://doc-resourses.pisugar.uk/PiSugar2Plus_install.mp4
// https://doc-resourses.pisugar.uk/pisugar2plus-software-install.mp4
// https://doc-resourses.pisugar.uk/pisugar3plus-install.mp4
// https://doc-resourses.pisugar.uk/pisugar3-install.mp4
// https://doc-resourses.pisugar.uk/pisugars-hardware-install.mp4
// https://doc-resourses.pisugar.uk/pisugarsplus-hardware-install.mp4
// https://doc-resourses.pisugar.uk/pisugar3-ota.mp4

const fs = require('fs');
const https = require('https');
const path = require('path');

// Create assets/video directory if it doesn't exist
const videoDir = path.join(__dirname, 'build', 'assets', 'video');
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

// Video URLs
const videoUrls = [
  'https://doc-resourses.pisugar.uk/pisugar2-hardware-install.mp4',
  'https://doc-resourses.pisugar.uk/PiSugar2_install.mp4',
  'https://doc-resourses.pisugar.uk/PiSugar2Plus_install.mp4',
  'https://doc-resourses.pisugar.uk/pisugar2plus-software-install.mp4',
  'https://doc-resourses.pisugar.uk/pisugar3plus-install.mp4',
  'https://doc-resourses.pisugar.uk/pisugar3-install.mp4',
  'https://doc-resourses.pisugar.uk/pisugars-hardware-install.mp4',
  'https://doc-resourses.pisugar.uk/pisugarsplus-hardware-install.mp4',
  'https://doc-resourses.pisugar.uk/pisugar3-ota.mp4'
];

// Download function
function downloadVideo(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(videoDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

// Download all videos
async function downloadAllVideos() {
  for (const url of videoUrls) {
    const filename = path.basename(url);
    try {
      await downloadVideo(url, filename);
    } catch (error) {
      console.error(`Failed to download ${filename}:`, error.message);
    }
  }
  console.log('All downloads completed');
}

downloadAllVideos();

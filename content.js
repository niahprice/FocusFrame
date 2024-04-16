// Function to replace GIFs with their first frame image
function replaceGIFsWithStaticImages() {
  // Select all GIF images on the page
  var gifs = document.querySelectorAll('img[src$=".gif"]');
  
  // Replace each GIF with its first frame image
  gifs.forEach(function(gif) {
    var firstFrameSrc = gif.src.replace(/\.gif$/i, "_static.gif"); // Change .gif to _static.gif
    gif.src = firstFrameSrc;
  });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.disableAnimations) {
    replaceGIFsWithStaticImages();
  }
});

  
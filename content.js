let removeGIFs = false; // Variable to store the state of GIF removal

// Function to remove GIF images
function removeGIFImages() {
  const gifs = document.querySelectorAll('img[src$=".gif"]');
  gifs.forEach(gif => {
    gif.remove();
  });
}

// Function to handle messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleGIFRemoval') {
    removeGIFs = request.removeGIFs;
    if (removeGIFs) {
      removeGIFImages();
    }
  }
});

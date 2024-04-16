document.addEventListener('DOMContentLoaded', function() {
  var toggleAnimations = document.getElementById('toggleAnimations');
  
  toggleAnimations.addEventListener('change', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: replaceGIFsWithStaticImages,
      });
    });
  });
});

function replaceGIFsWithStaticImages() {
  var gifs = document.querySelectorAll('img[src$=".gif"]');
  
  gifs.forEach(function(gif) {
    var firstFrameSrc = gif.src.replace(/\.gif$/i, "_static.gif");
    gif.src = firstFrameSrc;
  });
}

  
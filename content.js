// Function to pause CSS animations
function pauseAnimations() {
  var animatedElements = document.querySelectorAll('*[style*="animation"]');
  animatedElements.forEach(function(element) {
    element.style.animationPlayState = 'paused';
  });
}

// Function to disable GIF animations
function disableGIFs() {
  var gifs = document.querySelectorAll('img[src$=".gif"]');
  gifs.forEach(function(gif) {
    gif.src = '';
  });
}

// Function to pause HTML5 videos
function pauseVideos() {
  var videos = document.querySelectorAll('video');
  videos.forEach(function(video) {
    video.pause();
  });
}

// Function to summarize text content of a webpage
function summarizeSite() {
  var textContent = document.body.textContent;
  var summary = generateSummary(textContent);
  chrome.runtime.sendMessage({ summary: summary });
}

// Function to generate summary using sentence ranking
function generateSummary(text) {
  // Split text into sentences
  var sentences = text.split(/[.!?]/);

  // Calculate the score of each sentence based on word frequency
  var sentenceScores = [];
  sentences.forEach(function(sentence) {
    var words = sentence.trim().split(/\s+/);
    var score = words.length; // Score based on the number of words
    sentenceScores.push({ sentence: sentence.trim(), score: score });
  });

  // Sort sentences by score
  sentenceScores.sort((a, b) => b.score - a.score);

  // Select the top sentences to include in the summary
  var numSentencesInSummary = 5; // Number of sentences in the summary
  var summarySentences = sentenceScores.slice(0, numSentencesInSummary).map(obj => obj.sentence);

  // Join summary sentences into a summary
  var summary = summarySentences.join(' ');
  return summary;
}

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.summarizeSite) {
    summarizeSite();
  }
});


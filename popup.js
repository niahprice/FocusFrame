document.addEventListener('DOMContentLoaded', function() {
  // Summarize site
  document.getElementById('summarizeButton').addEventListener('click', function() {
    // Get the current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTab = tabs[0];
      var url = currentTab.url;
      // Send message to content script to summarize the site
      chrome.tabs.sendMessage(currentTab.id, { summarizeSite: true });
    });
  });

  // Feedback buttons
  document.getElementById('thumbsDownButton').addEventListener('click', function() {
    document.getElementById('feedbackTextBox').style.display = 'block';
  });

  document.getElementById('submitFeedbackButton').addEventListener('click', function() {
    var feedbackText = document.getElementById('feedbackText').value;
    // Send feedback to developers
    console.log('Feedback:', feedbackText);
    // Optionally, send feedback to server or other platform
  });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.summary) {
    document.getElementById('summaryTextarea').value = message.summary;
  }
});

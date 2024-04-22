document.addEventListener('DOMContentLoaded', function() {
  //Disable Animations (GIFs)
  const toggleCheckbox = document.getElementById('toggleGIFRemoval');

  // Retrieve and set the initial state of the checkbox from localStorage
  const removeGIFs = JSON.parse(localStorage.getItem('removeGIFs'));
  toggleCheckbox.checked = removeGIFs || false;

  toggleCheckbox.addEventListener('change', function() {
    const removeGIFs = toggleCheckbox.checked;

    // Save the checkbox state to localStorage
    localStorage.setItem('removeGIFs', JSON.stringify(removeGIFs));

    // Send message to content script to toggle GIF removal
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, { action: 'toggleGIFRemoval', removeGIFs });
    });
  });

  // Summarize site goes here
 
  // Feedback buttons
  document.getElementById('thumbsDownButton').addEventListener('click', function() {
    document.getElementById('feedbackTextBox').style.display = 'block';
  });

  document.getElementById('submitFeedbackButton').addEventListener('click', function() {
    var feedbackText = document.getElementById('feedbackText').value;
    // Send feedback to developers
    console.log('Feedback:', feedbackText);
    // Optionally, send feedback to server or other platform

    // Close the feedback text box
    document.getElementById('feedbackTextBox').style.display = 'none';

    // Display thank you message
    var thankYouMessage = document.createElement('div');
    thankYouMessage.id = 'thankYouMessage'; // Assign an ID for styling
    thankYouMessage.textContent = 'Thank you for your Feedback!';
    document.body.appendChild(thankYouMessage);

    // Remove the thank you message after 3 seconds
    setTimeout(function() {
      thankYouMessage.remove();
    }, 3000);
  });
});

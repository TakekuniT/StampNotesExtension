// enhances/modifies functionalities of a webpage

// immediately invoked function expression
/*
(function() {
    let youtubeLeftControls, youtubePlayer;
    console.log('Content script is running!');


    const newVideoLoaded = () => {
      const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
      if (!bookmarkBtnExists) {
        const bookmarkBtn = document.createElement("img");;
        bookmarkBtn.src = chrome.runtime.getURL("images/TimeNotesGrey-16.png");
        bookmarkBtn.className = "ytp-button " + "bookmark-btn";
        bookmarkBtn.title = "click to bookmark";

        youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
        youtubePlayer = document.getElementsByClassName("video-stream")[0];
        youtubeLeftControls.appendChild(bookmarkBtn);
        bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler); 
      }
      console.log(bookmarkBtnExists);
    }
    newVideoLoaded();
})();
*/




// content.js
console.log('Content script is running / loaded!');
var buttonInserted = false;

// inserts button to page

// create button outside
var newButton =  document.createElement('button');;
function insertButton() {    
  // Select the ytp-right-controls div
  var rightControlsDiv = document.querySelector('.ytp-right-controls');

  // Create a new button element
  newButton.className = 'ytp-size-button ytp-button'; // 
  newButton.style.backgroundColor = 'transparent';
  newButton.setAttribute('aria-keyshortcuts', 's')
  newButton.setAttribute('data-priority', '2'); // Add the data-priority attribute
  newButton.setAttribute('data-title-no-tool-tip', 'Stamp a note')
  newButton.setAttribute('aria-label', 'Stamp note keyboard shortcut s');
  newButton.title = 'Stamp a note (s)';

  // if u want to insert a image as button icon
  var imagePath = chrome.runtime.getURL("images/TimeNotesGrey-16.png");

  var innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-6 -6 36 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-stamp"><path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"/><path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13"/></svg>
  `;
  newButton.innerHTML = innerHTML;
  // Insert the new button as the first child of ytp-right-controls
  rightControlsDiv.insertBefore(newButton, rightControlsDiv.firstChild);
  console.log("Button inserted!");
}

const port = chrome.runtime.connect({ name: "content-script" });
// Listen for a message from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "insertButton") {
    if (buttonInserted === false) {
        insertButton();
        buttonInserted = true;
    }
  }
});

//insertButton();


newButton.addEventListener('click', e => {
  console.log('stamp is clicked!');
  stampNote();
})

document.addEventListener("keydown", function (event) {
  // Check if the pressed key is "S"
  if (event.key === "s") {
    // Trigger the button click
    stampNote();
  }
});


// Function to handle button click and open the text input
function stampNote() {
  // Prompt the user for input
  const annotation = prompt("Enter your annotation:");

  // Check if the user provided an annotation
  if (annotation !== null) {
    // Do something with the annotation (for now, just log it to the console)
    console.log("User entered annotation:", annotation);
  }
}


/*
document.addEventListener('DOMContentLoaded', function() {
  // Content script code
  console.log('Content script is running insideevent listner!');
});*/
/*
console.log('Content script is running!');
const button = document.createElement('button');
button.textContent = 'Click me!';
button.addEventListener('click', function() {
    // Handle button click event
    alert('Button clicked!');
});

// Add the button to the document body
document.body.appendChild(button);*/


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

// Select the ytp-right-controls div
var rightControlsDiv = document.querySelector('.ytp-right-controls');

// Create a new button element

// takis button

var newButton = document.createElement('button');
newButton.className = 'ytp-size-button ytp-button'; // 

/*newButton.style.width = '48px';
newButton.style.height = '48px';*/
newButton.style.backgroundColor = 'transparent';

newButton.setAttribute('aria-keyshortcuts', 's')
newButton.setAttribute('data-priority', '2'); // Add the data-priority attribute
newButton.setAttribute('data-title-no-tool-tip', 'Stamp a note')
newButton.setAttribute('aria-label', 'Stamp note keyboard shortcut s');

/*
newButton.setAttribute('display', 'flex');
newButton.setAttribute('align-items', 'center');
newButton.setAttribute('justify-content', 'center');*/


newButton.title = 'Stamp a note (s)';

//display: flex; align-items: center; justify-content: center;">



// dupe button




// Create the inner structure of the button



var imagePath = chrome.runtime.getURL("images/TimeNotesGrey-16.png");

var innerHTML = `
<svg class="stamp-note-button-icon" height="100%" version="1.1" viewBox="0 0 36 36" width="100%" fill-opacity="1">
<foreignObject width="100%" height="100%">
  <div class="your-icon" style="display: flex; align-items: center; justify-content: center; height: 100%;">
    <img src="${imagePath}" alt="Icon" style="max-width: 100%; max-height: 100%;">
  </div>
</foreignObject>
</svg>
<div class="ytp-tooltip">Stamp a Note</div>

`;

var innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-6 -6 36 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-stamp"><path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"/><path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13"/></svg>`;

//<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-stamp"><path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"/><path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13"/></svg>

//<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-stamp" preserveAspectRatio="xMidYMid meet" ><path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"/><path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13"/></svg>


/*
var innerHTML = `
  <div class="stamp-notes-text">Your Button Text</div>
  <div class="stamp-notes-chevron">
    <svg height="100%" viewBox="0 0 24 24" width="100%">
      <path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z" fill="#fff"></path>
    </svg>
  </div>
`;*/

newButton.innerHTML = innerHTML;



// Insert the new button as the first child of ytp-right-controls
rightControlsDiv.insertBefore(newButton, rightControlsDiv.firstChild);

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


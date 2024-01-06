// enhances/modifies functionalities of a webpage

// immediately invoked function expression
/*
(function() {
   
})();
*/




// content.js




console.log('Content script is running / loaded!');





// inject button
var buttonInserted = false;

// create button outside
var newButton =  document.createElement('button');
var player;

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


// Listen for a message from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "tabUpdated") {
        if (buttonInserted === false) {
            insertButton();
            buttonInserted = true;
        }
        if (!player) {
        // Create the player
            player = document.getElementsByClassName("video-stream")[0];
        }
        console.log("video id:" + message.id);
  }
});

//insertButton();


// checks for button click
newButton.addEventListener('click', e => {
    stampNote();
})

// checks for key clicks
document.addEventListener('keydown', function (event) {
    if (event.key === 's') {
        stampNote();
    }
});



// stamping a note
function stampNote() {
    player.pause();
    const annotation = prompt('Enter your annotation:');
    if (annotation !== '') {
        timeStamp = player.currentTime;
        console.log('User entered annotation:' + annotation + ' at ' + timeStamp);
    }
    player.play();
}




/*
  check if button exists by doing var chekc = document.getElementsByClassName("")[0];

*/
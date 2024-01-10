// enhances/modifies functionalities of a webpage

// immediately invoked function expression
/*
(function() {
   
})();
*/




console.log('Content script is running / loaded!');

// inject button
var buttonInserted = false;
var newButton =  document.createElement('button');
var player;
var videoID;


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


// Listen for a message from the background script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'tabUpdated') {
        if (buttonInserted === false) {
            insertButton();
            buttonInserted = true;
        }
        if (!player) {
        // Create the player
            player = document.getElementsByClassName('video-stream')[0];
        }
        videoID = message.id;
        //console.log('video id:' + message.id);
    } else if (message.action === 'SetUpButtonRewind') {
      console.log('msg form popup received, value is', message.value);
      player.currentTime = message.value;
      //player.play();
    }
    else if (message.action === 'Edit') {
      console.log('msg from popup: ', message.value);
      stampNote(message.note, message.value);
    }
    else if (message.action === 's key shortcut') {
      /*if ( document.activeElement.id === 'contenteditable-root') {
        // The 's' key was pressed in an input field or textarea
        console.log('User is typing in an input field or textarea.');
        sendResponse('shortcut key reached content');
        return;
      }*/
      stampNote();
    }
    else {
      console.log('message fialed womp womp');
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
      const focusedElement = document.activeElement;
      const isTyping = ['INPUT', 'TEXTAREA'].includes(focusedElement.tagName);
      /*
      if ( document.activeElement.id === 'contenteditable-root' || document.activeElement.id === 'search-input') {
        // The 's' key was pressed in an input field or textarea
        console.log('User is typing in an input field or textarea.');
        return;
      }*/
      if (isTyping || document.activeElement.id === 'contenteditable-root') {
        console.log('User is typing in an input field or textarea.');
        return;
      }
      stampNote();
      console.log('pop up opend from webpage s key');
    }
});


// converts seconds into time format
function convertToTime(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = Math.floor(totalSeconds % 60);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    if (hours !== 0) {
        return minutes + ":" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
}



// stamping a note
function stampNote(currentNote ='', timeVal = 0) {
    player.pause();
    const annotation = prompt('Enter your annotation:', currentNote);
    if (annotation !== '' && annotation !== null) {
        if (currentNote === '') {
          timeStamp = player.currentTime;
        }
        else {
          timeStamp = parseFloat(timeVal);
        }
        console.log('User entered annotation:' + annotation + ' at ' + convertToTime(timeStamp));
        let newStamp = [timeStamp, annotation];

        chrome.storage.sync.get(videoID, function(result) {
          
          // adds to existing key
          if (result && Object.prototype.hasOwnProperty.call(result, videoID)) {
            let currentVal = result[videoID];
            if (currentNote !== '') {
              currentVal = currentVal.filter(pair => pair[0] !== timeStamp);
              console.log('after rmeoving:', currentVal);
            }
            
            currentVal.push(newStamp);
            currentVal.sort(function(a, b) {
              return a[0] - b[0];
            });
        
            
            let updateVal = {};
            updateVal[videoID] = currentVal;
        
            chrome.storage.sync.set(updateVal, function() {
              console.log('Data saved for ' + videoID);
            });

            console.log(result[videoID]);
          
          // adds new key
          } else {
            console.log(videoID + ' is not used yet');
            
            let newVal = {};
            newVal[videoID] = [newStamp];
        
            chrome.storage.sync.set(newVal, function() {
              console.log('Data saved for ' + videoID);
            });

            console.log(result[videoID]);
          }
          
        });
        
    }
    player.play();
}




/*
  check if button exists by doing var chekc = document.getElementsByClassName("")[0];

*/
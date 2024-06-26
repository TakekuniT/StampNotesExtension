// enhances/modifies functionalities of a webpage

// immediately invoked function expression





console.log('Content script is running / loaded!');

// create button
var buttonInserted = false;
var newButton =  document.createElement('button');
var player;
var videoID;
var playerObj;
var adLength = 0;
var videoRun = false;

function calcAd() {
  if (videoRun) {
    adLength = player.currentTime - convertToSeconds(getCurrentTime());
    adLength = Math.floor(adLength);
  }
}

// dynamically updates ad length
setInterval(calcAd, 1000);

/*
function injectYouTubeAPI() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function createPlayerContainer() {
  var playerContainer = document.createElement('div');
  playerContainer.id = 'player'; 
  document.body.appendChild(playerContainer);
}*/


function insertButton() {    
    // Select the ytp-right-controls div
    var rightControlsDiv = document.querySelector('.ytp-right-controls');

    // Create a new button element
    newButton.className = 'ytp-stamp-button ytp-button'; 
    newButton.style.backgroundColor = 'transparent';
    newButton.setAttribute('aria-keyshortcuts', 's')
    newButton.setAttribute('data-priority', '2'); 
    newButton.setAttribute('data-title-no-tooltip', 'Stamp a note')
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
    //console.log("Button inserted!");




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
            //playerObj = new YT.Player('player');
            videoRun = true;
        }
        videoID = message.id;
        //console.log('video id:' + message.id);
    } else if (message.action === 'Rewind') {
      //console.log('msg form popup received, value is', message.value);
      player.currentTime = message.value + adLength;
      //playerObj.seekTo(message.value);
      //player.play();
    }
    else if (message.action === 'Edit') {
      //console.log('msg from popup: ', message.value);
      stampNote(message.note, message.value);
    }
    else if (message.action === 's key shortcut') {
      stampNote();
    }
    else {
      console.log('message failed womp womp');
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
    
      if (isTyping || document.activeElement.id === 'contenteditable-root') {
        console.log('User is typing in an input field or textarea.');
        return;
      }
      stampNote();
      //console.log('pop up opened from webpage s key');
    }
});


function getCurrentTime() {
  return document.querySelector('.ytp-time-current').textContent;
}


// converts seconds into time format
function convertToTime(totalSeconds) {
  let rounded = Math.round(totalSeconds);
  let hours = Math.floor(rounded / 3600);
  let minutes = Math.floor((rounded % 3600) / 60);
  var seconds = Math.floor(rounded % 60);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  if (hours === '00') {
      return minutes + ':' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
}

// converts to seconds format
function convertToSeconds(playbackTime) {
  const timeComponents = playbackTime.split(':').map(component => parseInt(component));
  let seconds = 0;

  for (let i = 0; i < timeComponents.length; i++) {
    const component = timeComponents[i];
    seconds += component * Math.pow(60, timeComponents.length - 1 - i);
  }

  return seconds;
}


// stamping a note
function stampNote(currentNote ='', timeVal = 0) {
    player.pause();
    let saveToStack;
    const annotation = prompt('Enter your annotation:', currentNote);
    if (annotation !== '' && annotation !== null) {
        if (currentNote === '') {
          //timeStamp = player.currentTime;
          timeStamp = convertToSeconds(getCurrentTime());
        }
        else {
          timeStamp = parseFloat(timeVal);
        }
        //console.log('User entered annotation:' + annotation + ' at ' + convertToTime(timeStamp));
        let newStamp = [timeStamp, annotation];

        chrome.storage.sync.get(videoID, function(result) {
          
          // adds to existing key
          if (result && Object.prototype.hasOwnProperty.call(result, videoID)) {
            let currentVal = result[videoID];
            if (currentNote !== '') {
              currentVal = currentVal.filter(pair => pair[0] !== timeStamp);
              //console.log('after removing:', currentVal);
            }

            saveToStack = currentVal;
            
            currentVal.push(newStamp);
            currentVal.sort(function(a, b) {
              return a[0] - b[0];
            });

            if (currentNote === '') {
              saveToStack = currentVal;
            }
        
            
            let updateVal = {};
            updateVal[videoID] = currentVal;

            chrome.runtime.sendMessage({ action: 'Stamp', value: saveToStack, indicator: currentNote}, function(response) {
              console.log('response is', response);
              console.log('stamped', currentVal);
                  
            });
        
            chrome.storage.sync.set(updateVal, function() {
              console.log('Data saved for ' + videoID);
            });

            //console.log(result[videoID]);
          
          // adds new key
          } else {
            //console.log(videoID + ' is not used yet');
            
            let newVal = {};
            newVal[videoID] = [newStamp];
        
            chrome.storage.sync.set(newVal, function() {
              console.log('Data saved for ' + videoID);
            });

            //console.log(result[videoID]);
          }
          
        });
        
    }
    player.play();
}



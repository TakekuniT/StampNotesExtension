// sets the functionality of popup
/*document.addEventListener('DOMContentLoaded', function () {
    //console.log('Popup loaded!');
});*/
// popup.js



function generateList(title, id) {
  if (title !== 'undoLast'){
    //document.getElementById('popup-display').innerHTML = ' ';
  }
  //document.getElementById('popup-display').innerHTML = ' ';
  

  

  let list = document.createElement('ul');
  list.id = 'timestamps-list';
  

  let deleteButtonCols = document.createElement('div');
  deleteButtonCols.className = 'deleteButtons';


  console.log('pop up reloaded');

  chrome.storage.sync.get([id], function(result) {
    list.className = id;
    console.log(result[id]);
    let valueList = result[id];
    
    if ((!result[id] || valueList.length === 0) && title === "new") {
        //document.getElementById('popup').innerHTML = '<div id="popup-error"> <h2>This is not a YouTube Video</h2> </div>';
        let outerPop = document.getElementById('popup');
        
        
        outerPop.innerHTML = '';
        let emptyList = document.createElement('div');
        emptyList.id = 'empty-message';
        let emptyMessage = document.createElement('h2');
        emptyMessage.innerHTML = 'Click on <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-stamp"><path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"/><path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13"/></svg> or press <code>S</code> to add a StampNote';
        emptyList.appendChild(emptyMessage);
        outerPop.append(emptyList);

        /*if (title !== 'new') {
          let undoButton = document.createElement('button');
          undoButton.className = 'undo-button';
          undoButton.textContent = 'Undo';
          undoButton.id = id;

          let empty = 'undoEmpty'
          undoButton.addEventListener('click', function(event) {
            undoClick(event, empty);
          });

          outerPop.appendChild(undoButton);
        }*/
        
        
        return;
    }


    let popup;
    let popupGet = document.getElementById('popup-display');
    let header = document.createElement('h1');
    //header.textContent = title;
    header.textContent = 'StampNotes';

    if (popupGet) {
      popup = popupGet;
      popup.innerHTML = ' ';
    }
    else{
      let popupCreate = document.createElement('div');
      popup = popupCreate;
      popup.id = 'popup-display';
      
    }
    popup.appendChild(header);

    
    




    for (let stamp of valueList) {
      let time = convertToTime(stamp[0]);
      let note = stamp[1];
      let item = document.createElement('li');
      item.id = stamp[0];


      let del = document.createElement('button');
      del.className = 'delete-buttons';
      del.id = time;
      //del.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff5f84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>';
      del.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3f6c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

      let edit = document.createElement('button');
      edit.className = 'edit-buttons';
      edit.id = time;
      edit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#208aff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-square"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>';

      let timeDiv = document.createElement('div');
      timeDiv.className = 'timestamp';
      timeDiv.textContent = time;

      let noteDiv = document.createElement('div');
      noteDiv.className = 'annotation';
      noteDiv.textContent = note;
      /*
      deleteButtonCols.appendChild(del);
      item.appendChild(timeDiv);
      item.appendChild(noteDiv);*/
      
      let stampNote = document.createElement('li');
      stampNote.className = 'stampnote';
      let buttons = document.createElement('li');
      buttons.className = 'buttons';

      stampNote.appendChild(timeDiv);
      stampNote.appendChild(noteDiv);
      buttons.appendChild(edit);
      buttons.appendChild(del);
      
      
      //item.appendChild(del);
      item.appendChild(stampNote);
      item.appendChild(buttons);
      list.appendChild(item);
    }
    //gridContainer.appendChild(list);
    //list.appendChild(notesContainer)
    //list.appendChild(deleteButtonCols); 
    popup.appendChild(list);
    //popup.appendChild(list);
    
    let clearButton = document.createElement('button');
    clearButton.className = 'clear-button';
    clearButton.innerHTML = '<svg id="clearIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>';
    clearButton.id = id;

    let undoButton = document.createElement('button');
    undoButton.className = 'undo-button';
    undoButton.innerHTML = '<svg id="undoIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"  stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo-2"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>';
    undoButton.id = id;

    popup.appendChild(clearButton);
    popup.appendChild(undoButton);


    setUpButtons();


  });

  
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


function rewindClick(event) {
  let currButton = event.target;
  let timeStamp = ((currButton.parentNode).parentNode).id;
  console.log('button pressed');
  let currentTime = parseFloat(timeStamp);
  //player.currentTime = 0;//parseFloat(timeStamp);
  //player.play();
  // send message to content.js

  chrome.runtime.sendMessage({ action: 'SetUpButtonRewind', value: currentTime }, function(response) {
    console.log(response);
  });
}

function deleteClick(event) {
  let currButton = event.target.closest('.delete-buttons');

  let currentID = (((currButton.parentNode).parentNode).parentNode).className;
  let stampToDelete = ((currButton.parentNode).parentNode).id;
  console.log('delete lcicked', stampToDelete );

  chrome.runtime.sendMessage({ action: 'Delete', value: stampToDelete, id: currentID}, function(response) {
    console.log(response);

    chrome.storage.sync.get(currentID, function(result) {
      let updatedData = result[currentID].filter(pair => pair[0] !== parseFloat(stampToDelete));
      let updateVal = {};
      updateVal[currentID] = updatedData;
      chrome.storage.sync.set(updateVal, function() {
        console.log('Data has been updated.', updatedData);
        generateList('no title', currentID);
      });
    });
  });

  
}

function editClick(event) {
  let currButton = event.target.closest('.edit-buttons');

  let currentID = (((currButton.parentNode).parentNode).parentNode).className;
  let stampToEdit = ((currButton.parentNode).parentNode).id;
  
  let currentNote = currButton.parentNode.parentNode.children[0].children[1].textContent;
  console.log('button object', currButton);
  console.log('current annot', currButton.parentNode.parentNode.children[0].children[1].textContent);
  

  chrome.runtime.sendMessage({ action: 'Edit', value: stampToEdit, id: currentID, note: currentNote }, function(response) {
    //console.log('message sent to background.js');
    console.log('edit response is', response);
    generateList('no title', currentID);
  });
}


function undoClick(event, empty) {
  let currButton = event.target.closest('.undo-button');
  let currentID = currButton.id;

  chrome.runtime.sendMessage({ action: 'Undo', id: currentID}, function(response) {
    console.log('response is', response);
    console.log('undo sent from pop', currentID);

    generateList(empty, currentID);
        
  });
}


function clearClick(event) {
  let currButton = event.target.closest('.clear-button');
  let currentID = currButton.id;
  chrome.runtime.sendMessage({action: 'Clear', id: currentID }, function(response) {
    console.log('response is', response)
    console.log('clear sent from pop');

    generateList('no title', currentID)
  });
}


function setUpButtons() {
  //var player = document.getElementsByClassName("video-stream")[0];
  var timeStamps = document.getElementsByClassName('timestamp');
  console.log(timeStamps.length);

  var deleteButtons = document.getElementsByClassName('delete-buttons');
  var editButtons = document.getElementsByClassName('edit-buttons');

  var undoButton = document.getElementsByClassName('undo-button')[0];
  var clearButton = document.getElementsByClassName('clear-button')[0];


  for (let i = 0; i < timeStamps.length; i++) {
    timeStamps[i].addEventListener('click', rewindClick);
    deleteButtons[i].addEventListener('click', deleteClick);
    editButtons[i].addEventListener('click', editClick);
  }

  undoButton.addEventListener('click',  function(event) {
    undoClick(event, 'undo');
  });

  clearButton.addEventListener('click', clearClick);

}

// checks for key clicks
document.addEventListener('keydown', function (event) {
  if (event.key === 's') {
    chrome.runtime.sendMessage({ action: 's shortcut key' }, function(response) {
      console.log(response);
    });

  }
});

document.addEventListener('DOMContentLoaded', function() {
    /*document.getElementById('timestamps-list').addEventListener('click', function(){
        alert('clicked on list');
        //document.getElementById('timestamps-list').innerHTML = '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
        chrome.runtime.sendMessage({ action: 'checkYTVid' }, function(response) {
            console.log(response); 
        }); 
    });*/ 

    /*
    console.log('clicked on popup');
    chrome.storage.sync.get(function(result) {
        console.log(result);
    });*/
    //var player = document.getElementsByClassName("video-stream")[0];


  
    // sends a message to background.js to get information of the webpage
    chrome.runtime.sendMessage({ action: 'checkYTVid' }, function(response) {
        console.log(response.isYt); 
        let videoTitle = response.title;
        let videoKey = response.id;
        let check = response.isYt;
        if (check) {
            generateList('new', videoKey);
        }
        else {
            document.getElementById('popup').innerHTML = '<div id="popup-error"> <h2>This is not a YouTube Video</h2> </div>';
        }
    });
     

    
});


  


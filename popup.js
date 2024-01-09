// sets the functionality of popup
/*document.addEventListener('DOMContentLoaded', function () {
    //console.log('Popup loaded!');
});*/
// popup.js



function generateList(title, id) {
  document.getElementById('popup-display').innerHTML = '';
  let popup = document.getElementById('popup-display');

  let header = document.createElement('h1');
  //header.textContent = title;
  header.textContent = 'StampNotes';
  popup.appendChild(header);

  let list = document.createElement('ul');
  list.id = 'timestamps-list';

  let deleteButtonCols = document.createElement('div');
  deleteButtonCols.className = 'deleteButtons';



  //let notesContainer = document.createElement('div');
  //notesContainer.className = 'notes';

  chrome.storage.sync.get([id], function(result) {
    console.log('testing');
    console.log(result[id]);
    let valueList = result[id];
    for (let stamp of valueList) {
      let time = convertToTime(stamp[0]);
      let note = stamp[1];
      let item = document.createElement('li');
      item.id = stamp[0];


      let del = document.createElement('button');
      del.className = 'delete-buttons';
      del.id = time;
      del.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff5f84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>';

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
    setUpButtons();


  });

  
}



// converts seconds into time format
function convertToTime(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = Math.floor(totalSeconds % 60);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    if (hours === '00') {
        return minutes + ':' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
}


function rewind(event) {
  let currButton = event.target;
  let timeStamp = ((currButton.parentNode).parentNode).id;
  console.log('button pressed');
  let currentTime = parseFloat(timeStamp);
  //player.currentTime = 0;//parseFloat(timeStamp);
  //player.play();
  // send message to content.js

  chrome.runtime.sendMessage({ action: 'SetUpButton', value: currentTime }, function(response) {
    console.log('message sent to background.js');
    console.log(response);
  });
}


function setUpButtons() {
  //var player = document.getElementsByClassName("video-stream")[0];
  var timeStamps = document.getElementsByClassName('timestamp');
  console.log(timeStamps.length);
  for (let i = 0; i < timeStamps.length; i++) {
    timeStamps[i].addEventListener("click", rewind);
  }
  
}



document.addEventListener('DOMContentLoaded', function() {
    /*document.getElementById('timestamps-list').addEventListener('click', function(){
        alert('clicked on list');
        //document.getElementById('timestamps-list').innerHTML = '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
        chrome.runtime.sendMessage({ action: 'checkYTVid' }, function(response) {
            console.log(response); 
        }); 
    });*/ 
    var videoTitle;
    var videoKey;

    /*
    console.log('clicked on popup');
    chrome.storage.sync.get(function(result) {
        console.log(result);
    });*/
    var player = document.getElementsByClassName("video-stream")[0];


  
    // sends a message to background.js to get information of the webpage
    chrome.runtime.sendMessage({ action: 'checkYTVid' }, function(response) {
        console.log(response.isYt); 
        videoTitle = response.title;
        videoKey = response.id;
        let check = response.isYt;
        if (check) {
            generateList(response.title, response.id);
        }
        else {
            document.getElementById('popup').innerHTML = '<div id="popup-error"> <h2>This is not a YouTube Video</h2> </div>';
        }
    });
    
    

    

    
});


  


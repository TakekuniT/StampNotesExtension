// sets the functionality of popup
/*document.addEventListener('DOMContentLoaded', function () {
    //console.log('Popup loaded!');
});*/
// popup.js

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

    console.log('clicked on popup');
    chrome.storage.sync.get(function(result) {
        console.log(result);
    });


    function generateList(title, id) {
        document.getElementById('popup-display').innerHTML = '<h2>' + title + '</h2><div id="timestamps-list"></div>';
        console.log('checkpoint');
        
        chrome.storage.sync.get([id], function(result) {
        
            console.log(result[id]);
            let htmlList = generateHTMLList(result[id]);
            console.log(htmlList);
            document.getElementById('timestamps-list').innerHTML = htmlList;
        });
    }


    function generateHTMLList(valueList) {
        // value list is the value array of the video ID key, ex. [[time, note], [time, note]]
        let result = '';
        result += '<ul>';
        for (let stamp of valueList) {
            let time = convertToTime(stamp[0]);
            let note = stamp[1];
            result += '<li>';
            result += time + '&nbsp;&nbsp;-&nbsp;&nbsp;' + note;
            result += '</li>';
        }
        result += '</ul>'
        return result;
        
    }

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


  


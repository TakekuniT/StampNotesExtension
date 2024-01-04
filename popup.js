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
    console.log('clicked on popup');
    
    chrome.runtime.sendMessage({ action: 'checkYTVid' }, function(response) {
        console.log(response.isYt); 
        var check = response.isYt;
        if (check) {
            document.getElementById('popup-display').innerHTML = '<h2>' + response.title + '</h2><div id="timestamps-list"></div>';
            document.getElementById('timestamps-list').innerHTML = '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
        }
        else {
            document.getElementById('popup').innerHTML = '<div id="popup-error"> <h2>This is not a YouTube Video</h2> </div>';
        }
    }); 
    
});


  


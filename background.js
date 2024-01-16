// performs tasks that do not involve user interactions
var previousData = [];

// waits for popup.js to send a message, then sends a response back
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'checkYTVid') {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            // Ensure that tabs is not empty before accessing tabs[0]
            if (tabs && tabs.length > 0) {
                const tabURL = tabs[0].url;
                //console.log(tabURL);
                const videoID = tabURL.split('?')[1];
                const videoIDs = new URLSearchParams(videoID);
                var result = {
                    isYt: checkURL(tabURL),
                    title: tabs[0].title,
                    id: videoIDs.get('v')
                }
                sendResponse(result);
            } else {
                sendResponse('errorrr'); 
            }
        });
        return true; // response will be sent asynchronously
    } 
    else if (request.action === 'SetUpButtonRewind') {
        sendResponse('reached background');
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log('tab id extraacted:', tabs[0].id);
            console.log('time is', request.value);
            chrome.tabs.sendMessage(tabs[0].id, { action: request.action , value: request.value});
        });
    }
    else if (request.action === 'Edit') {
        sendResponse('reached the back rooms');
        chrome.storage.sync.get(request.id, function(result) {
            previousData.push(result[request.id]);
            console.log('prev', previousData);
        });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: request.action , value: request.value, id: request.id, note: request.note});
        });
    }
    else if (request.action === 's shortcut key') {
        sendResponse('shortcut key reached backgrouond');
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log(tabs[0]);
            if (tabs[0].url.includes('youtube.com') && tabs[0].url.includes('watch')) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 's key shortcut'});
            }
        });
    }
    else if (request.action === 'Delete') {
        chrome.storage.sync.get(request.id, function(result) {
            previousData.push(result[request.id]);
            console.log('id', request.id);
            console.log('previous', previousData);
            sendResponse(previousData);
        });
         
    }
    else if (request.action === 'Undo') {
        //sendResponse(previousData);
        //console.log('prev data', previousData);
        let updateVal = {};
        let oldData = previousData.pop();
        console.log('old data', oldData);
        let videoID = request.id;
        updateVal[videoID] = oldData;
        
        chrome.storage.sync.get(videoID, function(result) {
            if (result[videoID].length === 0) {
                console.log('its empty sending false');
                sendResponse(false);
            }
            else {
                console.log('not empty sending true');
                sendResponse(true);
            }
        });

        chrome.storage.sync.set(updateVal, function() {
            //sendResponse('undo succ');  
            console.log('undo success for',  videoID);
              
        });
    }
    else if (request.action === "Stamp") {

        /*previousData.push(request.value);
        console.log('stamp pushed');*/
        if (request.indicator === '') {
            previousData = [];
            console.log('reset');
            previousData.push(request.value);
        }
        
        console.log('stamp pushed');
        
        
           
    }
    else if (request.action === 'Clear') {
        chrome.storage.sync.get(request.id, function(result) {
            previousData.push(result[request.id]);
            console.log('previous', previousData);
            sendResponse(previousData);
        });


        let updateVal = {};
        let newData = [];
        
        updateVal[request.id] = newData;

        chrome.storage.sync.set(updateVal, function() {
            console.log('delete success');
              
        });
    }
    else {
        sendResponse('invalid request');
        return false;
    }
})



// Listen for changes in the tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes('youtube.com') && tab.url.includes('watch')) {
      // Send a message to the content script to insert the button
        const videoID = tab.url.split('?')[1];
        const videoIDs = new URLSearchParams(videoID);
        console.log('tab is updated');
        //console.log(tabId);
        chrome.tabs.sendMessage(tabId, { 
            action: 'tabUpdated',
            id: videoIDs.get('v')
        });
        previousData = [];

    }
});





let urlList = [];




function checkURL(url){
    if (url.includes('youtube.com/watch')) {
        return true;
    }
    else {
        return false;
    }
}




// performs tasks that do not involve user interactions

var tabURL = 'default';
var isYTVid = false


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
    else if (request.action === 'SetUpButton') {
        sendResponse('reached background');
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log('tab id extraacted:', tabs[0].id);
            console.log('time is', request.value);
            chrome.tabs.sendMessage(tabs[0].id, { action: request.action , value: request.value});
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

    }
});
  

/*chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (activeTab) {
        checkTab(activeTab);
    }); 
});*/

let urlList = [];


/*chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete'){
        tabURL = tab.url;
        isYTVid = checkTab(tab);
    }
    else {
        console.log('fail???');
    }
})*/


function checkURL(url){
    if (url.includes('youtube.com/watch')) {
        return true;
    }
    else {
        return false;
    }
}

/*function checkTab(activeTab){
    if (activeTab && activeTab.url && activeTab.url.includes('youtube.com/watch')) {
        console.log('This is a YouTube video page:', activeTab.url);
        let urlKey = activeTab.url.split('?')[1];
        urlList.push(urlKey);
        console.log(urlKey);
        return true;
    } else {
        console.log('This is not a YouTube video page:', activeTab.url);
        return false;
    }
}*/


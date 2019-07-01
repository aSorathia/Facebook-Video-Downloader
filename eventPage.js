chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.todo == "showExtension"){
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });
    }

    if(request.todo == "download"){
        console.log(request.url);
        console.log(request.fileName);
        chrome.downloads.download({
            url: request.url,
            filename: request.fileName,
            saveAs: false
        });
    }
})

function downloadVid(info, tab) {    
	chrome.tabs.sendMessage(tab.id,{todo: "getLink"});    
}

var contextMenuItem = {
	"id": "fVideos",
	"title": "Download fVideo",
	"contexts": ["all"],
    "onclick":downloadVid
};
chrome.contextMenus.create(contextMenuItem);
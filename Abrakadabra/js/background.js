chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
        sendResponse({ data: localStorage[request.key] });
    } else {
        sendResponse({});
    }
});

chrome.contextMenus.create({
				"title": "Show magic",
				"contexts": ["page", "selection", "image", "link"],
				"onclick" : translateSelection
			  });
			  
function translateSelection(){
	chrome.tabs.getSelected(null,function(tab)
{
    chrome.tabs.sendRequest(tab.id,{method:"translateSelection"}, function(response){
    });
}); 
}
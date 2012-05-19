function checkForValidUrl(tabId, changeInfo, tab) {
  var sites=new Array("vk.com","facebook.com","mail.google.com","imo.im");
  for(var i=0;i<4;i++){
	if(tab.url.indexOf(sites[i])>-1) chrome.pageAction.show(tabId);
  }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.tabs.onActivated.addListener(checkForValidUrl);
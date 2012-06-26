
var inputs=new Array("ad3","fc_tab_txt text","uiTextareaAutogrow input","convinput-text-container");
var storage = {
    set: function (key, value) {
        localStorage[key] = value;
    },
    get: function (key) {
        return localStorage[key];
    }
};

function getPageLogClass(){
	var site=document.location.href;
	var log=new String();
	if(site.indexOf("vk.com")>-1) log=".fc_tab_log_msgs";
	else if(site.indexOf("mail.google.com")>-1) log=".Z8Dgfe";
	else if(site.indexOf("imo.im")>-1) log=".convlog-msgs";
	else if(site.indexOf("facebook.com")>-1) log=".conversation";
	return log;
}

function abra_get_storage(){
  chrome.extension.sendRequest({method: "getLocalStorage", key: "abra_old_hotkey"}, function(response) {
  	var h=response.data;
	console.log("abra_old="+response.data);
	if(h!=undefined&&h!=""){
		shortcut.remove(h);
	}	
  });
  chrome.extension.sendRequest({method: "getLocalStorage", key: "abra_hotkey"}, function(response) {
  console.log("abra_new="+response.data);
	shortcut.add(response.data,activeSelection);
  });
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	switch(request.method){
		case "popupOldHotkey":
				var h=request.data;
				if(h!=undefined&&h!=""){
					shortcut.remove(h);
				};	
			break;
		case "popupNewHotkey":
			if(request.data!=undefined&&request.data!="")
				shortcut.add(request.data,activeSelection);
			break;
		default: 
			sendResponse({});
	}
});

function checktext(){
	  chrome.extension.sendRequest({method: "getLocalStorage", key: "abra_old_hotkey"}, function(response) {
  	var h=response.data;
	console.log("abra_old="+response.data);
	if(h!=undefined&&h!=""){
		shortcut.remove(h);
	}	
  });
  chrome.extension.sendRequest({method: "getLocalStorage", key: "abra_hotkey"}, function(response) {
	shortcut.add(response.data,activeSelection);
  });
}

function checkinput(){
	var elem=this;
	if(elem==undefined) return;
	var t=elem.value;
	if(t.length==0) return;
	var res=enru(t);
	elem.value=res;
}
function activeSelection(){
	var start;
	var end;
	var seltag;
	var elem=getSelectedNode();
	var t=new String(getSelectedText());
	if(elem==undefined){
	  var elem=document.activeElement;
	  seltag=new String(elem.tagName);
	  if(seltag.indexOf("TEXT")==-1||seltag.indexOf("input")==-1) 
	  return;
	 }
	 var elem2=document.activeElement;
	 var seltag2=new String(elem2.tagName);
	 if(seltag2.indexOf("TEXT")>-1||seltag2.indexOf("input")>-1) elem=elem2;
	 seltag=new String(elem.tagName);
	 if(seltag.indexOf("TEXT")>-1||seltag.indexOf("input")>-1){
		elem.focus();
		var temp=elem.value;
		if(temp.indexOf(t)>-1){
			start=elem.selectionStart;
			end=elem.selectionEnd;
			t=temp.substring(start,end);
			if(t.length==0){
				$("input").each(checkinput);
				$("textarea").each(checkinput);
				return;
			 } 
			var text=temp.substring(0,start)+enru(t)+temp.substring(end);
			 elem.value=text;
		}
	 } else {
	 	if(t!=""){
		 var selection=getSelectedText();
		 var t=new String(selection);
		 var temp=elem.innerHTML;
		 start=selection.startOffset;
		 end=selection.endOffset;
		 if(temp.indexOf(t)>-1){
			 var text=temp.substring(0,start)+enru(t)
			 if(start!=end) text+=temp.substring(end);
			 elem.innerHTML=text;
		}
	 }
	}
}
$(document).ready(checktext());
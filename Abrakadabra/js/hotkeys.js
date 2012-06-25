function getSelectedNode()
{
    if (document.selection)
        return document.selection.createRange().parentElement();
    else
    {
        var selection = window.getSelection();
        if (selection.rangeCount > 0)
                return selection.getRangeAt(0).startContainer.parentNode;
    }
}

function getSelectedText()
{
	if (document.selection)
        return document.selection.createRange();
    else
    {
        var selection = window.getSelection();
        if (selection.rangeCount > 0)
                return selection.getRangeAt(0);
    }
}

function setHotkey(){
	var oForm = document.forms["selecthotkey"];
	var first=oForm.elements["firstkey"].value;
	var second=oForm.elements["secondkey"].value;
	var third=oForm.elements["speckey"].value;
	var hot="";
	hot=first+"+";
	if(second!="none") hot+=second+"+";
	hot+=third;
	var h=storage.get('abra_hotkey');
	storage.set('abra_hotkey',hot);
	storage.set('abra_old_hotkey',h);
	abra_load_checkboxes();
	chrome.extension.getBackgroundPage().storage.set("abra_old_hotkey",h);
	chrome.extension.getBackgroundPage().storage.set("abra_hotkey",hot);
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendRequest(tab.id, {method: "popupOldHotkey", tabid: tab.id, data: h}, function(response) { });
	  chrome.tabs.sendRequest(tab.id, {method: "popupNewHotkey", tabid: tab.id, data: hot}, function(response) { });
	});
};
var storage = {
	set: function(key, value) {
		localStorage[key] = value;
	},
	get: function(key) {
		return localStorage[key];
	}
};
function checkstorage() {
	if(storage.get('abra_check_input') == undefined)
		storage.set('abra_check_input', false);
	if(storage.get('abra_check') == undefined)
		storage.set('abra_check', false);
	if(storage.get('abra_old_hotkey') == undefined)
		storage.set('abra_old_hotkey', "Ctrl+Shift+A");
	if(storage.get('abra_hotkey') == undefined)
		storage.set('abra_hotkey', "Ctrl+Shift+A");
	if(storage.get('abra_check_selected') == undefined)
		storage.set('abra_check_selected', "true");
};
function abra_load_checkboxes(){
	var first=storage.get("abra_check_input");
	var second=storage.get("abra_check");
	var third=storage.get("abra_check_selected");
	checkstorage();
	if(first=="true") first=true; else first=false;
	if(second=="true") second=true; else second=false;
	document.getElementById("abracheck").checked=second;
	document.getElementById("abracheckinput").checked=first;
	document.getElementById("checkselected").checked=third;
	var hotkey=storage.get("abra_hotkey");
	document.getElementById("currenthot").innerHTML="<u>Current hotkey</u>: <i>"+hotkey+"</i>";
};

function changeabracheck(){
	var ch=document.getElementById("abracheck");
	if(!ch) return;
	if(storage.get("abra_check")=="true"){
		storage.set("abra_check",false);
		ch.checked=false;
	}
	else {
		storage.set("abra_check",true);
		ch.checked=true;
	}
	var d=storage.get("abra_check");
	chrome.extension.getBackgroundPage().storage.set("abra_check",d);
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendRequest(tab.id, {method: "changeLogCheck",  data: d}, function(response) { });
	});
};
function changeabracheckinput(){
	var ch=document.getElementById("abracheckinput");
	if(!ch) return;
	if(storage.get("abra_check_input")=="true"){
		storage.set("abra_check_input","false");
		ch.checked=false;
	}
	else {
		storage.set("abra_check_input","true");
		ch.checked=true;
	}
	var d=storage.get("abra_check_input");
	chrome.extension.getBackgroundPage().storage.set("abra_check_input",d);
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendRequest(tab.id, {method: "changeInputCheck", data: d }, function(response) { });
	});
};

function changehotkeyaction(){
	var ch=document.getElementById("checkselected");
	if(!ch) return;
	if(storage.get("abra_check_selected")=="true"){
		storage.set("abra_check_selected","false");
		ch.checked=false;
	}
	else {
		storage.set("abra_check_selected","true");
		ch.checked=true;
	}
	var d=storage.get("abra_check_selected");
	chrome.extension.getBackgroundPage().storage.set("abra_check_selected",d);
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendRequest(tab.id, {method: "changeSelectedCheck", data: d }, function(response) { });
	});
}
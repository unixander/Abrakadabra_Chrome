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

function setHotkey(elem){
	var formname = "selecthotkey";
	if(elem.value.indexOf("Set")==-1) formname+="_rus";
	var oForm = document.forms[formname];
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
	if(storage.get('abra_old_hotkey') == undefined)
		storage.set('abra_old_hotkey', "Ctrl+Shift+A");
	if(storage.get('abra_hotkey') == undefined)
		storage.set('abra_hotkey', "Ctrl+Shift+A");
};
function abra_load_checkboxes(){
	var hotkey=storage.get("abra_hotkey");
	$(".currenthot").html("<i>"+hotkey+"</i>");
};


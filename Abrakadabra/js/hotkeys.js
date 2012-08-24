function setHotkey(elem, inTestMode) {
    var formname = "selecthotkey";
    if (elem.value.indexOf("Set") == -1) formname += "_rus";
    var oForm = document.forms[formname];
    var first = oForm.elements["firstkey"].value;
    var second = oForm.elements["secondkey"].value;
    var third = oForm.elements["speckey"].value;
    var hot = first + "+";
    if (second != "none") hot += second + "+";
    hot += third;
    var h = storage.get('abra_hotkey');
    storage.set('abra_hotkey', hot);
    storage.set('abra_old_hotkey', h);
    if (inTestMode) {
        shortcut.add(hot, translateSelection);
        return;
    }
    loadCheckboxes();
    chrome.extension.getBackgroundPage().storage.set("abra_old_hotkey", h);
    chrome.extension.getBackgroundPage().storage.set("abra_hotkey", hot);
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, { method: "popupOldHotkey", tabid: tab.id, data: h }, function() {});
        chrome.tabs.sendRequest(tab.id, { method: "popupNewHotkey", tabid: tab.id, data: hot }, function() {});
    });
}

var storage = {
    set: function(key, value) {
        localStorage[key] = value;
    },
    get: function(key) {
        return localStorage[key];
    }
};

function checkHotkeyInStorage() {
    if (storage.get('abra_old_hotkey') == undefined)
        storage.set('abra_old_hotkey', "Ctrl+Shift+A");
    if (storage.get('abra_hotkey') == undefined)
        storage.set('abra_hotkey', "Ctrl+Shift+A");
}

function loadCheckboxes() {
    var hotkey = storage.get("abra_hotkey");
    $(".currenthot").html("<i>" + hotkey + "</i>");
}


function checkHotkey() {
    chrome.extension.sendRequest({ method: "getLocalStorage", key: "abra_old_hotkey" }, function (response) {
        var h = response.data;
        console.log("abra_old=" + response.data);
        if (h != undefined && h != "") {
            shortcut.remove(h);
        }
    });
    chrome.extension.sendRequest({ method: "getLocalStorage", key: "abra_hotkey" }, function (response) {
        shortcut.add(response.data, translateSelection);
    });
}

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    switch (request.method) {
        case "popupOldHotkey":
            var h = request.data;
            if (h != undefined && h != "") {
                shortcut.remove(h);
            }
            break;
        case "popupNewHotkey":
            if (request.data != undefined && request.data != "")
                shortcut.add(request.data, translateSelection);
            break;
		case "translateSelection":
			translateSelection();
			break;
        default:
            sendResponse({});
    }
});

$(document).ready(checkHotkey);
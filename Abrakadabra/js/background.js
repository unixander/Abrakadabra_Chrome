chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
        sendResponse({ data: localStorage[request.key] });
    } else {
        sendResponse({});
    }
});

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
        default:
            sendResponse({});
    }
});
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function(response){
     chrome.tabs.sendRequest(tab.id, {method: "displayResults", data: response.data});
  });
});
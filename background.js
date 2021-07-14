chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    {
      censorLevel: 'word',
      censoredPages: [ ],
    }
  );
  chrome.tabs.query({ active: true }, (tabs) => {
    if (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { "message": "activated_tab", "url": tabs[0].url });
    }
  });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { "message": "activated_tab", "url": tabs[0].url });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.tabs.sendMessage(tabId, { "message": "updated_tab", "url": tab.url });
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { "message": "created_tab", "url": tab.url });
});
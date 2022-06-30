chrome.action.onClicked.addListener((tab) => {
    if (tab.url.indexOf('https://app.slack.com') > -1) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['script.js']
        });
    }
});

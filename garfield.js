function garfield() {
    browser.tabs.executeScript({
        file: "creategarfield.js"
    });
}

browser.browserAction.onClicked.addListener(garfield);
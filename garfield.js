function garfield() {
    browser.tabs.executeScript({
        file: "yourscript.js"
    });
}

browser.browserAction.onClicked.addListener(garfield);
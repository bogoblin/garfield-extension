function garfield() {
    browser.tabs.create({
        url: "https://www.garfield.com"
    });
}

browser.browserAction.onClicked.addListener(garfield);
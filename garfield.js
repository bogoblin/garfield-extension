const scripts = ["Bubble.js", "creategarfield.js", "image.js", "animations.js", "behaviour.js"];

function garfield() {
    scripts.forEach(script => {
        browser.tabs.executeScript({
            file: script
        });
    })
    
    browser.tabs.insertCSS({
        file: "./style.css"
    });
}

browser.browserAction.onClicked.addListener(garfield);
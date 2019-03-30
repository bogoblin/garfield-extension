const scripts = ["load.js", "image.js", "animations.js", "behaviour.js", "Bubble.js", "Lasagna.js"];

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
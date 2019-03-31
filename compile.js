const fs = require('fs');
const scripts = ["Bubble.js", "image.js", "animations.js", "textmaster.js", "Garfield.js"];
let output = Buffer.from("");

scripts.forEach(script => {
    output += fs.readFileSync(script);
    output += "\n";
});
fs.writeFileSync("extension.js", output);
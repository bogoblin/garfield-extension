var state = animWhack;
var x = 0, y = 0;
var targetX = 200, targetY = 200;
var frame = 0;

var walkSpeed = 5;

function setPosition(x, y) {
    garfieldCanvas.style.left = x + "px";
    garfieldCanvas.style.top = y + "px";
}

function update() {
    setPosition(x, y);

    state = animIdle;

    if(Math.abs(x - targetX) > walkSpeed) {
        if(x > targetX) x -= walkSpeed;
        else x += walkSpeed;
        state = animWalk;
        state['flipped'] = x > targetX;
    } else if(Math.abs(y - targetY) > walkSpeed) {
        if(y > targetY) y -= walkSpeed;
        else y += walkSpeed;
        state = animJump;
        state['flipped'] = x > targetX;
    } else {
        targetX = Math.random() * window.innerWidth;
        targetY = Math.random() * window.innerHeight;
    }

    if(frame % 4 == 0)
        nextFrame(state);

    frame++;
}

setInterval(update, 1000 / 30);
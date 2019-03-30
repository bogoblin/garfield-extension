var x = 200, y = 200;
var targetX = 200, targetY = 200;
var frame = 0;

var walkSpeed = 5;

var currAnimation = animIdle;

const STATE_IDLE = 0, STATE_WALKING = 1, STATE_SLEEPING = 2;
const STATE_DRAGGING = 10, STATE_DROPPED = 11; // for drag n drop
var stateTimeout = 5; // no of frames until change state (only applicable in some states)
var currState = STATE_IDLE;

function setPosition(x, y) {
    garfieldCanvas.style.left = x + "px";
    garfieldCanvas.style.top = y + "px";
}

function updateIdle() {
    currAnimation = animIdle;
    stateTimeout--;
    if(stateTimeout < 0) {
        targetX = Math.random() * (window.innerWidth-200) + 100;
        targetY = Math.random() * (window.innerHeight-200) + 100;
        currState = STATE_WALKING;
    }
}

function updateWalking() {
    if(Math.abs(x - targetX) > walkSpeed) {
        if(x > targetX) x -= walkSpeed;
        else x += walkSpeed;
        currAnimation = animWalk;
        currAnimation['flipped'] = x > targetX;
    } else if(Math.abs(y - targetY) > walkSpeed) {
        if(y > targetY) y -= walkSpeed;
        else y += walkSpeed;
        currAnimation = animWalk;
        currAnimation['flipped'] = x > targetX;
    } else {
        if(Math.random() > 0.5) {
            currState = STATE_IDLE;
            stateTimeout = Math.random() * 100;
         } else {
            currState = STATE_SLEEPING;
            stateTimeout = Math.random() * 100;
        }
    }
}

function updateSleeping() {
    currAnimation = animSleeping;
    stateTimeout--;
    if(stateTimeout < 0) {
        targetX = Math.random() * window.innerWidth;
        targetY = Math.random() * window.innerHeight;
        currState = STATE_WALKING;
    }
}

function updateFalling() {
    currAnimation = animJump;
    y += walkSpeed*5;
    console.log(stateTimeout);
    stateTimeout--;
    if(stateTimeout < 0) {
        currState = STATE_IDLE;
        stateTimeout = 50;
    }
}

function update() {
    setPosition(x, y);

    if(currState == STATE_IDLE) {
        updateIdle();
    } else if(currState == STATE_WALKING) {
        updateWalking();
    } else if(currState == STATE_SLEEPING) {
        updateSleeping();
    } else if(currState == STATE_DRAGGING) {
        currAnimation = animJump;
        stateTimeout = 5;
    } else if(currState == STATE_DROPPED) {
        updateFalling();
    } else {
        // i am lost in the void.
    }

    if(frame % 4 == 0)
        nextFrame(currAnimation);

    frame++;
}

setInterval(update, 1000 / 30);
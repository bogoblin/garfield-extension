const WALKSPEED = 5;
const STATE_IDLE = 0,
    STATE_WALKING = 1,
    STATE_SLEEPING = 2;
    STATE_KICKING = 3;
const STATE_DRAGGING = 10,
    STATE_DROPPED = 11; // for drag n drop

let garfield;
class Garfield {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.targetX = 200;
        this.targetY = 200;
        this.frame = 0;
        this.currentAnimation = animIdle;
        this.state = STATE_IDLE;
        this.yvel = 0;
        this.xvel = 0;
        this.onarrived = () => 0;
    }

    nextFrame() {
        nextFrame(this.currentAnimation);
    }
    goIdle() {
        this.state = STATE_IDLE;
        this.yvel = 0;
        this.xvel = 0;
        garfield.onarrived();
        garfield.onarrived = () => {};
    }
    walkTo(x, y, onarrived) {
        if (this.state != STATE_IDLE) return;
        this.targetX = x;
        this.targetY = y;
        this.state = STATE_WALKING;
        if (onarrived) {
            this.onarrived = onarrived;
        }
    }
    update() {
        if (garfield.frame % 4 == 0) {
            garfield.nextFrame();
        }
        garfield.frame++;
        switch (garfield.state) {
            case STATE_IDLE:
                garfield.currentAnimation = animIdle;
                break;

            case STATE_WALKING:
                garfield.currentAnimation = animWalk;
                if (Math.abs(garfield.x - garfield.targetX) > WALKSPEED) {
                    if (garfield.x > garfield.targetX) garfield.x -= WALKSPEED;
                    else garfield.x += WALKSPEED;
                    garfield.currentAnimation = animWalk;
                    garfield.currentAnimation['flipped'] = garfield.x > garfield.targetX;
                }
                else if (Math.abs(garfield.y - garfield.targetY) > WALKSPEED) {
                    if (garfield.y > garfield.targetY) garfield.y -= WALKSPEED;
                    else garfield.y += WALKSPEED;
                    garfield.currentAnimation = animWalk;
                } else {
                    garfield.goIdle();
                }
                break;

            case STATE_SLEEPING:
                garfield.currentAnimation = animSleeping;
                break;

            case STATE_DRAGGING:
                garfield.currentAnimation = animJump;
                bubble.show("Hey, put me down!");
                break;

            case STATE_DROPPED:
                garfield.currentAnimation = animJump;
                garfield.yvel++;
                garfield.y += garfield.yvel;
                garfield.x += garfield.xvel;
                if (garfield.y >= garfield.floorY) {
                    garfield.goIdle();
                }
                if (garfield.x <= 0) {
                    garfield.x = 0;
                    garfield.xvel *= -0.5;
                }
                if (garfield.x >= window.innerWidth) {
                    garfield.x = window.innerWidth;
                    garfield.xvel *= -0.5;
                }
                break;

            case STATE_KICKING:
                garfield.currentAnimation = animKick;
                garfield.kickFramesLeft--;
                if (garfield.kickFramesLeft <= 0) {
                    garfield.goIdle();
                }
                break;

            default:
                garfield.goIdle();
                break;
        }

        garfieldCanvas.style.left = garfield.x + "px";
        garfieldCanvas.style.top = garfield.y + "px";

        if (bubble) bubble.update(garfield);
    }
    say(text) {
        if (this.state == STATE_DRAGGING) return;
        bubble.show(text);
    }
    walkToElement(element, onarrived) {
        let rect = element.getBoundingClientRect();
        let actualX = rect.x + window.scrollX;
        let actualY = rect.y + window.scrollY;
        garfield.walkTo(actualX, actualY, onarrived);
        console.log(actualX);
    }
    elementToKick() {
        return elementToKick(garfield.x, garfield.y, 400);
    }
    kick(element) {
        garfield.kickFramesLeft = 12;
        setTimeout(() => {
            slideOff(element, this.currentAnimation["flipped"]?-1:1);
        }, 300);
        this.state = STATE_KICKING;
    }


}

setTimeout(function() {
    let element = document.getElementsByTagName("img")[0];
    garfield.walkToElement(element, () => {
        console.log("asdfasdfdone");
        let ke = garfield.elementToKick();
        console.log(ke);
        garfield.kick(ke);
    });
}, 2000);

garfield = new Garfield();

setInterval(garfield.update, 1000 / 30);
0;

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        garfield.floorY = 600;
        console.log("dragdown");
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        garfield.y = garfield.y - pos2;
        garfield.yvel = -pos2;
        garfield.x = garfield.x - pos1;
        garfield.xvel = -pos1;

        garfield.state = STATE_DRAGGING;

    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        garfield.state = STATE_DROPPED;
    }
}

dragElement(garfieldCanvas);
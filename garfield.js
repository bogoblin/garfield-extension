const WALKSPEED = 5;
const STATE_IDLE = 0,
    STATE_WALKING = 1,
    STATE_SLEEPING = 2;
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

        this.nextFrame = function () {
            nextFrame(this.currentAnimation);
        }
        this.goIdle = function () {
            this.state = STATE_IDLE;
            this.yvel = 0;
        }
        this.walkTo = function () {
            this.targetX = x;
            this.targetY = y;
            this.state = STATE_WALKING;
        }
        this.update = function () {
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
                    if (Math.abs(y - targetY) > WALKSPEED) {
                        if (garfield.y > garfield.targetY) garfield.y -= WALKSPEED;
                        else y += WALKSPEED;
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
                    break;

                case STATE_DROPPED:
                    garfield.currentAnimation = animJump;
                    garfield.yvel++;
                    garfield.y += garfield.yvel;
                    if (garfield.yvel == 15) {
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
    }


}

garfield = new Garfield();

setInterval(garfield.update, 1000 / 30);
0;

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        garfield.y = garfield.y - pos2;
        garfield.x = garfield.x - pos1;

        garfield.state = STATE_DRAGGING;
        
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        garfield.state = STATE_DROPPED;
    }
}

dragElement(garfieldCanvas);
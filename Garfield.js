const WALKSPEED = 5;
const STATE_IDLE = 0,
    STATE_WALKING = 1,
    STATE_SLEEPING = 2,
    STATE_KICKING = 3,
    STATE_WHACKING = 4,
    STATE_SCRATCHING = 5;
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
    resetAnim() {
        garfield.currentAnimation["currItem"] = 0;
    }
    update() {
        if (garfield.frame % 4 == 0) {
            garfield.nextFrame();
        }
        garfield.frame++;
        let lastAnim = garfield.currentAnimation;
        switch (garfield.state) {
            case STATE_IDLE:
                garfield.currentAnimation = animIdle;
                if (garfield.currentAnimation != lastAnim) {
                    garfield.resetAnim();
                }
                if (garfield.frame % 200 == 0) {
                    let rand = Math.random();
                    if (rand > 0.66) {
                        garfield.gotoAndWhack(
                            Math.random() * (window.innerWidth-200) + 100,
                            Math.random() * (window.innerHeight -200) + 100 +window.scrollY
                        );
                    } else if (rand > 0.33){
                        garfield.gotoAndScratch(
                          Math.random() * (window.innerWidth-200) + 100,
                          Math.random() * (window.innerHeight-200) + 100+window.scrollY
                        );
                    } else {
                        garfield.gotoAndKick(
                            Math.random() * (window.innerWidth-200) + 100,
                            Math.random() * (window.innerHeight-200) + 100+window.scrollY
                        );
                    }
                }
                break;

            case STATE_WALKING:
                garfield.currentAnimation = animWalk;
                if (garfield.currentAnimation != lastAnim) {
                    garfield.resetAnim();
                }
                if (Math.pow(garfield.x - garfield.targetX, 2) + 
                    Math.pow(garfield.y - garfield.targetY, 2) > WALKSPEED*WALKSPEED) { 
                    let dx = garfield.targetX - garfield.x;
                    let dy = garfield.targetY - garfield.y;

                    let len = Math.sqrt(dx*dx + dy*dy);

                    dx /= len;
                    dy /= len;

                    dx *= WALKSPEED;
                    dy *= WALKSPEED;

                    garfield.x += dx;
                    garfield.y += dy;

                    garfield.currentAnimation = animWalk;
                    garfield.currentAnimation['flipped'] = garfield.x > garfield.targetX;
                } else {
                    garfield.goIdle();
                }
                break;

            case STATE_SLEEPING:
                garfield.currentAnimation = animSleeping;
                if (garfield.currentAnimation != lastAnim) {
                    garfield.resetAnim();
                }
                break;

            case STATE_DRAGGING:
                garfield.currentAnimation = animJump;
                if (garfield.currentAnimation != lastAnim) {
                    garfield.resetAnim();
                }
                bubble.show("Hey, put me down!");
                break;

            case STATE_DROPPED:
                garfield.currentAnimation = animJump;
                if (garfield.currentAnimation != lastAnim) {
                    garfield.resetAnim();
                }
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
                if (garfield.currentAnimation != lastAnim) {
                    garfield.resetAnim();
                }
                garfield.kickFramesLeft--;
                if (garfield.currentAnimation["currItem"] >= 3) {
                    garfield.currentAnimation["currItem"] = 3;
                }
                if (garfield.kickFramesLeft <= 0) {
                    garfield.goIdle();
                }
                break;

            case STATE_WHACKING:
                garfield.currentAnimation = animWhack;
                if (garfield.currentAnimation != lastAnim) {
                    garfield.resetAnim();
                }
                garfield.whackFramesLeft--;
                if (garfield.currentAnimation["currItem"] >= 2) {
                    garfield.currentAnimation["currItem"] = 2;
                }
                if (garfield.whackFramesLeft <= 0) {
                    garfield.goIdle();
                }
                break;

            case STATE_SCRATCHING:
                garfield.currentAnimation = animScratch;
                if (garfield.currentAnimation != lastAnim) {
                    garfield.resetAnim();
                }
                garfield.scratchFramesLeft--;
                if (garfield.scratchFramesLeft <= 0) {
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
    elementToScratch() {
        return elementToKick(garfield.x, garfield.y, 20);
    }
    kick(element) {
        garfield.kickFramesLeft = 16;
        setTimeout(() => {
            slideOff(element, this.currentAnimation["flipped"]?-1:1);
        }, 300);
        this.state = STATE_KICKING;
    }
    gotoAndKick(x, y) {
        garfield.walkTo(x, y, () => {
            let ke = garfield.elementToKick();
            if (!ke) return;
            garfield.kick(ke);
            garfield.say("Get outta my way, "+ke.tagName);
        });
    }
    whack(element) {
        garfield.whackFramesLeft = 32;
        setTimeout(() => {
            fallDown(element);
        }, 480);
        this.state = STATE_WHACKING;
    }
    scratch(element) {
        this.state = STATE_SCRATCHING;
        garfield.scratchFramesLeft = 16;

        setTimeout(() => {
            // place scratch image over element
            var rect = element.getBoundingClientRect();
            var scratchImg = document.createElement("img");
            scratchImg.setAttribute("src", scratch.src);
            scratchImg.style.width = element.offsetWidth + "px";
            scratchImg.style.height = element.offsetHeight + "px";
            scratchImg.style.position = "absolute";
            scratchImg.style.top = (rect.top + window.scrollY) + "px";
            scratchImg.style.left = (rect.left + window.scrollX) + "px";
            scratchImg.style.opacity = "0.5";
            document.body.appendChild(scratchImg);
        }, 16*1000.0/33);
    }
    gotoAndWhack(x, y) {
        garfield.walkTo(x, y, () => {
            let ke = garfield.elementToKick();
            if (!ke) return;
            garfield.whack(ke);
            garfield.say("Hasta la vista, "+ke.tagName);
        });
    }
    gotoAndScratch(x, y) {
        garfield.walkTo(x, y, () => {
            let skra = garfield.elementToScratch();
            if (!skra) return;
            garfield.scratch(skra);
            garfield.say("Get outta here "+skra.tagName);
        });
    }


}

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

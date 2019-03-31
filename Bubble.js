var x = 0;
var y = 0;

class Bubble {

    constructor() {
        let element = document.createElement("div");
        element.id = "bubble";
        element.hidden = true;
        document.body.appendChild(element);
        this.msgdone = true;
        document.getElementById("bubble").hidden = true;
    }

    update() {
        let element = document.getElementById("bubble");
        if (garfield.x > window.innerWidth - 500) {
            element.className = "xreverse";
            element.style = "left: "+(garfield.x+25-500)+"px; top: "+(garfield.y-290)+"px;";
        } else {
            element.className = "";
            element.style = "left: "+(garfield.x+25)+"px; top: "+(garfield.y-290)+"px;";
        }
        if (this.msgdone) bubble.hide();
    }

    hide() {
        this.msgdone = true;
        document.getElementById("bubble").hidden = true;
    }

    show(text) {
        if (!this.msgdone) return;
        this.msgdone = false;
        let size = 100/(Math.log(text.length) + 1) + "px";
        document.getElementById("bubble").innerHTML = "<span class='inner' style='font-size:"+size+"'>"+text+"</span>";
        document.getElementById("bubble").hidden = false;
        var msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);

        msg.onend = () => {
            this.msgdone = true;
            bubble.hide();
        }
    }
}

let bubble = new Bubble();
bubble.hide();
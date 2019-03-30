var x = 0;
var y = 0;

class Bubble {

    constructor() {
        this.element = document.createElement("div");
        this.element.id = "bubble";
        document.body.appendChild(this.element);
        this.msgdone = true;
    }

    update() {
        document.getElementById("bubble").style = "left: "+(x+25)+"px; top: "+(y-290)+"px;";
    }

    hide() {
        this.msgdone = true;
        document.getElementById("bubble").hidden = true;
    }

    show(text) {
        if (!this.msgdone) return;
        this.msgdone = false;
        document.getElementById("bubble").innerHTML = "<span class='inner'>"+text+"</span>";
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
setInterval(bubble.update, 30);
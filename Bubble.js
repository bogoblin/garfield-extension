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
        document.getElementById("bubble").style = "left: "+(garfield.x+25)+"px; top: "+(garfield.y-290)+"px;";
    }

    hide() {
        this.msgdone = true;
        document.getElementById("bubble").hidden = true;
    }

    show(text) {
        if (!this.msgdone) return;
        this.msgdone = false;
        let size = 5/(text.length/20 + 1) + "em";
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
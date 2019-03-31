var x = 0;
var y = 0;

class Bubble {

    constructor() {
        let element = document.createElement("div");
        element.id = "bubble";
        element.style.display = "none";
        document.body.appendChild(element);
        this.msgdone = true;
        document.getElementById("bubble").style.display = "none";
    }

    update() {
        let element = document.getElementById("bubble");
        if (garfield.x > window.innerWidth - 500) {
            element.className = "xreverse";
            element.style = "left: "+(garfield.x+25-500)+"px; top: "+Math.max(0, garfield.y-290)+"px;";
        } else {
            element.className = "";
            element.style = "left: "+(garfield.x+25)+"px; top: "+Math.max(0, garfield.y-290)+"px;";
        }
        if (this.msgdone) bubble.hide();
    }

    hide() {
        this.msgdone = true;
        document.getElementById("bubble").style.display = "none";
    }

    show(text) {
        if (!this.msgdone) return;
        this.msgdone = false;
        let size = 100/(Math.log(text.length) + 1) + "px";
        document.getElementById("bubble").innerHTML = "<span class='inner' style='font-size:"+size+"'>"+text+"</span>";
        document.getElementById("bubble").hidden = false;
        var msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);

        if(window.speechSynthesis.getVoices().length > 0) {
            msg.onend = () => {
                this.msgdone = true;
                bubble.hide();
            }
        } else {
            setTimeout(function() { bubble.hide(); }, text.length * 100);
        }
    }
}

let bubble = new Bubble();
bubble.hide();
var x = 0;
var y = 0;

class Bubble {

    constructor(text) {
        this.element = document.createElement("div");
        this.element.id = "bubble";
        document.body.appendChild(this.element);
        this.show(text);
    }

    update() {
        document.getElementById("bubble").style = "left: "+(x+25)+"px; top: "+(y-160)+"px;";
    }

    hide() {
        document.getElementById("bubble").hidden = true;
        console.log("hide");
    }

    show(text) {
        document.getElementById("bubble").innerHTML = "<span class='inner'>"+text+"</span>";
        document.getElementById("bubble").hidden = false;
        setTimeout(function () {bubble.hide()}, 4000);
    }
}

let bubble = new Bubble("hi");
setInterval(bubble.update, 30);

setTimeout(bubble.show, 5000, "what is up");
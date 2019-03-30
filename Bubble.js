class Bubble {

    constructor(text, x, y, timeout) {
        this.text = text;
        this.x = x; this.y = y;
        this.element = document.createElement("span");
        this.element.className = "bubble";
        this.element.innerHTML = text;
        document.body.appendChild(this.element);
        setTimeout(this.remove, this.element.remove);

    }
}


function randint(min, max) {
    return Math.round(min + (max-min)*Math.random());
}

class Lasagna {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = "lasagna"+Math.round(Math.random()*10000);
        let element = document.createElement("div");
        element.id = this.id;
        element.classList = "lasagna";
        document.body.appendChild(element);
        this.update();
    }

    update() {
        document.getElementById(this.id).style="left:"+this.x+"px;top:"+this.y+"px;";
    }
}

let lasagnas = [];

// for (let i=0; i<5; i++) {
//     lasagnas.push(new Lasagna(randint(0, 500), 200));
// }
// setInterval(() => {
//     lasagnas.forEach(las => {
//         las.update();
//     });
// }, 30);
0;
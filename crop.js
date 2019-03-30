var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

var garfieldCanvas = document.createElement('canvas');
var garfieldContext = garfieldCanvas.getContext('2d');
document.body.appendChild(garfieldCanvas);

var CLEAR_COLOR = [40, 128, 240];

function load() {
    garf = document.getElementById("garfield");
    canvas.width = garf.width;
    canvas.height = garf.height;
    context.drawImage(garf, 0, 0);
}

function draw(imgX, imgY, imgWidth, imgHeight) {
    var bigData = context.getImageData(imgX, imgY, imgWidth, imgHeight);
    
    garfieldCanvas.width = imgWidth;
    garfieldCanvas.height = imgHeight;
    var imgData = garfieldContext.createImageData(imgWidth, imgHeight);

    for(var x = 0; x < imgWidth; x++) {
        for(var y = 0; y < imgHeight; y++) {
            var px = [ bigData.data[4*(x*imgHeight+y)],
                       bigData.data[4*(x*imgHeight+y)+1],
                       bigData.data[4*(x*imgHeight+y)+2],
                       bigData.data[4*(x*imgHeight+y)+3] ];

            if(px[0] == CLEAR_COLOR[0] && px[1] == CLEAR_COLOR[1] && px[2] == CLEAR_COLOR[2])
                imgData.data[4*(x*imgHeight+y)+3] = 0;
            else
                imgData.data[4*(x*imgHeight+y)+3] = 255;

            imgData.data[4*(x*imgHeight+y)+0] = px[0];
            imgData.data[4*(x*imgHeight+y)+1] = px[1];
            imgData.data[4*(x*imgHeight+y)+2] = px[2];
        }
    }

    garfieldContext.putImageData(imgData, 0, 0);
}

window.onload = load;



var garfieldState = {};
garfieldState['start'] = [1, 90];
garfieldState['offset'] = [42, 0];
garfieldState['size'] = [40, 64];
garfieldState['noOfItems'] = 8;
garfieldState['currItem'] = 0;

var states = []; // TODO

var animIdle = [60, 15];
var garfWidth = 40, garfHeight = 60;

function drawGarfield(state) {
    var i = state['currItem'];
    var n = state['noOfItems'];

    // ping pong
    if(i >= n)
        i = -n + i;


    var x = state['start'][0] + state['offset'][0] * i;
    var y = state['start'][1] + state['offset'][1] * i; 
    draw(x, y, state['size'][0], state['size'][1]);
}

function nextFrame(state) {
    state['currItem']++;
    if(state['currItem'] == 2 * state['noOfItems'] - 1)
        state['currItem'] = 0;
    drawGarfield(state);
}

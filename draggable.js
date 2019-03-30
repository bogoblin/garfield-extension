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

        y = y - pos2;
        x = x - pos1;

        currState = STATE_DRAGGING;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        currState = STATE_DROPPED;
        stateTimeout = 8;
    }
}

dragElement(garfieldCanvas);
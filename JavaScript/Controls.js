var mousePos = new Vector2();
var mouseDown = false;

var mouseInfo = document.getElementById("mouseInfo");


function handleMouseDown(event) {
    mouseDown = true;
    updateMessage();
    // More code here
}

function handleMouseUp(event) {
    mouseDown = false;
    updateMessage();
    // More code here
}

function handleMousePos(event) {
    mousePos = new Vector2(event.clientX, event.clientY);
    updateMessage();
    // More code here
}

function updateMessage(){
    let message = `Mouse Pos: ${mousePos.x} x | ${mousePos.y} y`;
    if(mouseDown)
        message += "<br>Mouse Down"
    mouseInfo.innerHTML = message;
}
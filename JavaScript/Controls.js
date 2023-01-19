var mousePos = new Vector2();
var mouseDown = false;

var mouseInfo = document.getElementById("mouseInfo");

var selectedPoint;
var initialOffset = new Vector2();

function handleMouseDown(event) {
    if(!mouseDown){
        findSelectedPoint();
    }
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
    let rect = ctx.canvas.getBoundingClientRect();
    mousePos = new Vector2(event.clientX - rect.left, event.clientY - rect.top);
    if(mouseDown && selectedPoint != undefined){
        let pointPos = mousePos.add(initialOffset);
        curves[selectedPoint.curve].setPoint(selectedPoint.point, screenToWorldPos(pointPos));

        
    }
    updateMessage();
    // More code here
}

function updateMessage(){
    let message = `Mouse Pos: ${mousePos.x} x | ${mousePos.y} y`;
    if(mouseDown)
        message += "<br>Mouse Down"
    mouseInfo.innerHTML = message;
}

function findSelectedPoint(){
    selectedPoint = undefined;
    for(let curvePair of curves.entries()){
        let points = curvePair[1].getPointsAsArray();
        if(points.length != 4) continue;
        for(let i = 0; i < 4; i++){
            let isMainPoint = i == 0 || i == points.length - 1;
            let radius = pointRad * getFac();
            let point = worldToScreenPos(points[i]);
            if(point.isInRectangle(mousePos, radius * 2)){
                if(point.sub(mousePos).magnitude <= radius){
                    selectedPoint = { curve: curvePair[0], point: i };
                    initialOffset = point.sub(mousePos);
                    if(isMainPoint) return;
                }
            }
        }
    }
}
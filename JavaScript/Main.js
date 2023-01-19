const gridZoom = 5;
const gridPos = new Vector2();

const pointRad = 0.075;
const lineWidth = 3;

const defaultCol = getComputedStyle(document.documentElement).getPropertyValue('--default-color');
const lineCol = getComputedStyle(document.documentElement).getPropertyValue('--line-color');
const detailCol = "rgb(150, 150, 150, 0.5)";

var ctx;
var curves = [];

function main(){
    
    var canvas = document.getElementById("mainCanvas");
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMousePos);
    
    ctx = canvas.getContext("2d");
   
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    ctx.fillStyle = lineCol;
    ctx.strokeStyle = lineCol;
    ctx.lineWidth = 3;

    curves.push(new CubicBezier(new Vector2(-1, -1), new Vector2(2.2, 1.2),
    new Vector2(-2.2, 1), new Vector2(1, -1)));
    
    // drawCurve(ctx, curve, 100);
    setInterval(update, 10);
}

function update(){
    draw(ctx, curves);
}

function getFac(){
    let smallerSide = Math.min(ctx.canvas.width, ctx.canvas.height);
    return smallerSide / gridZoom;
}

function worldToScreenPos(point){
    let fac = getFac();
    let vec = point.copy();
    vec.subWithSelf(gridPos);
    vec.mulWithSelf(fac)
    vec.y *= -1;
    vec.addWithSelf(new Vector2(ctx.canvas.width / 2, ctx.canvas.height / 2));

    return vec;
}

function screenToWorldPos(point){
    let fac = getFac();
    let vec = point.copy();
    vec.subWithSelf(new Vector2(ctx.canvas.width / 2, ctx.canvas.height / 2));
    vec.y *= -1;
    vec.mulWithSelf(1 / fac)
    vec.addWithSelf(gridPos);

    return vec;
}

main();
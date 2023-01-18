const gridZoom = 5;
const gridPos = new Vector2();


function main(){

    var defaultCol = getComputedStyle(document.documentElement).getPropertyValue('--default-color');
    var lineCol = getComputedStyle(document.documentElement).getPropertyValue('--line-color');
    
    var canvas = document.getElementById("mainCanvas");
    
    var ctx = canvas.getContext("2d");
   
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    ctx.fillStyle = lineCol;
    ctx.strokeStyle = lineCol;
    ctx.lineWidth = 3;
    
    ctx.moveTo(0, 0);
    ctx.lineTo(10, 10);
    ctx.stroke();

    let curve = new CubicBezier();
    drawCurve(ctx, curve);
}

function worldToScreenPos(canvas, point){
    let smallerSide = Math.min(canvas.width, canvas.height);
    let fac = smallerSide / gridZoom;

    let vec = point.copy();
    vec.subWithSelf(gridPos);
    vec.mulWithSelf(fac)
    vec.y *= -1;
    vec.addWithSelf(new Vector2(canvas.width / 2, canvas.height / 2));

    // console.log(">>>" + vec.x + ", " + vec.y);

    return vec;
}

function drawCurve(ctx, curve, precision=10){
    let origin = worldToScreenPos(ctx.canvas, curve.p1);
    ctx.moveTo(origin.x, origin.y);
    for(let i = 1; i < precision + 1; i++){
        let t = i / precision;
        let p = curve.getPoint(t);
        let sp = worldToScreenPos(ctx.canvas, p);
        ctx.lineTo(sp.x, sp.y);
    }
    ctx.stroke();
}

main();
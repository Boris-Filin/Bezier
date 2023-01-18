const gridZoom = 2;
const gridPos = new Vector2();
const pointRad = 0.075;
const lineWidth = 3;
const defaultCol = getComputedStyle(document.documentElement).getPropertyValue('--default-color');
const lineCol = getComputedStyle(document.documentElement).getPropertyValue('--line-color');
const detailCol = "rgb(150, 150, 150, 0.5)";

function main(){
    
    var canvas = document.getElementById("mainCanvas");
    
    var ctx = canvas.getContext("2d");
   
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    ctx.fillStyle = lineCol;
    ctx.strokeStyle = lineCol;
    ctx.lineWidth = 3;
    
    let curve = new CubicBezier();
    let start = new Date().getTime();
    drawCurve(ctx, curve, 100);
    alert(new Date().getTime() - start);
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
    drawPoint(ctx, curve.p1, true);
    drawPoint(ctx, curve.p4, true);
    drawPoint(ctx, curve.p2, false, 0.5, detailCol);
    drawPoint(ctx, curve.p3, false, 0.5, detailCol);
    
    ctx.beginPath();
    ctx.strokeStyle = detailCol;
    let screenPoints = curve.getPointsAsArray().map((v) => worldToScreenPos(ctx.canvas, v));
    ctx.moveTo(screenPoints[0].x, screenPoints[0].y);
    for(let vec of screenPoints){
        ctx.lineTo(vec.x, vec.y);
    }
    ctx.stroke();
    ctx.strokeStyle = lineCol;

    ctx.beginPath();
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

function drawPoint(ctx, vec, outline=false, scale=1, col=lineCol){
    let smallerSide = Math.min(ctx.canvas.width, ctx.canvas.height);
    let fac = smallerSide / gridZoom;
    rad = pointRad * fac * scale;
    let origin = worldToScreenPos(ctx.canvas, vec);

    drawCircle(ctx, origin, rad, col);
    if(outline){
        drawCircle(ctx, origin, 0.8 * rad, defaultCol);
        drawCircle(ctx, origin, 0.6 * rad, col);
    }
}

function drawCircle(ctx, origin, rad, col){
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, rad, 0, 2 * Math.PI, false);
    let oldStyle = ctx.fillStyle;
    ctx.fillStyle = col;
    ctx.fill();
    ctx.fillStyle = oldStyle;
}

main();
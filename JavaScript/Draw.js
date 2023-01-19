function draw(ctx, curves){
    ctx.fillStyle = defaultCol;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for(let curve of curves)
        drawCurve(ctx, curve, 100);
    drawCircle(ctx, mousePos, 5, "red");
}


function drawCurve(ctx, curve, precision=10){
    drawPoint(ctx, curve.p1, true);
    drawPoint(ctx, curve.p4, true);
    drawPoint(ctx, curve.p2, false, 0.5, detailCol);
    drawPoint(ctx, curve.p3, false, 0.5, detailCol);
    
    ctx.beginPath();
    ctx.strokeStyle = detailCol;
    let screenPoints = curve.getPointsAsArray().map((v) => worldToScreenPos(v));
    ctx.moveTo(screenPoints[0].x, screenPoints[0].y);
    for(let vec of screenPoints){
        ctx.lineTo(vec.x, vec.y);
    }
    ctx.stroke();
    ctx.strokeStyle = lineCol;

    ctx.beginPath();
    let origin = worldToScreenPos(curve.p1);
    ctx.moveTo(origin.x, origin.y);
    for(let i = 1; i < precision + 1; i++){
        let t = i / precision;
        let p = curve.getPoint(t);
        let sp = worldToScreenPos(p);
        ctx.lineTo(sp.x, sp.y);
    }
    ctx.stroke();
}

function drawPoint(ctx, vec, outline=false, scale=1, col=lineCol){
    let fac = getFac();
    rad = pointRad * fac * scale;
    let origin = worldToScreenPos(vec);

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

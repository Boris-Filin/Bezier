class CubicBezier {
    constructor(
        p1 = new Vector2(-1, -1),
        p2 = new Vector2(-.8, 1),
        p3 = new Vector2(.8, -1),
        p4 = new Vector2(1, 1))
    { [this.p1, this.p2, this.p3, this.p4] = [p1, p2, p3, p4]; }

    getPoint(t) {
        let p5 = this.p1.lerp(this.p2, t);
        let p6 = this.p2.lerp(this.p3, t);
        let p7 = this.p3.lerp(this.p4, t);
        let p8 = p5.lerp(p6, t);
        let p9 = p6.lerp(p7, t);
        return p8.lerp(p9, t);
    }

}
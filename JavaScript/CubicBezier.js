class CubicBezier {
    constructor(
        p1 = new Vector2(-1, -1),
        p2 = new Vector2(-.8, 1),
        p3 = new Vector2(.8, -1),
        p4 = new Vector2(1, 0))
    { [this.p1, this.p2, this.p3, this.p4] = [p1, p2, p3, p4]; }

    getPointsAsArray(){
        return [this.p1, this.p2, this.p3, this.p4];
    }

    getPoint(t){
        let tPow2 = t * t;
        let tPow3 = tPow2 * t;
        let coef1 = 1 - 3 * t + 3 * tPow2 - tPow3;
        let coef2 = 3 * t - 6 * tPow2 + 3 * tPow3;
        let coef3 = 3 * tPow2 - 3 * tPow3;
        return Vector2.addAll([this.p1.mul(coef1), this.p2.mul(coef2),
            this.p3.mul(coef3), this.p4.mul(tPow3)]);
    }

}
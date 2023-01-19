class Vector2{
    constructor(x=0, y=0){
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    copy(){
        return new Vector2(this.x, this.y);
    }

    add(vec){
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    sub(vec){
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    mul(x){
        return new Vector2(this.x * x, this.y * x);
    }

    lerp(vec, t){
        return this.mul(1 - t).add(vec.mul(t));
    }


    addWithSelf(vec){
        this.x += vec.x;
        this.y += vec.y;
    }

    subWithSelf(vec){
        this.x -= vec.x;
        this.y -= vec.y;
    }

    mulWithSelf(x){
        this.x *= x;
        this.y *= x;
    }

    isInRectangle(vec, width, height=-1){
        if(height == -1) height = width;
        width /= 2;
        height /= 2;
        return !(vec.x < this.x - width || vec.x > this.x + width ||
            vec.y < this.y - height || vec.y > this.y + height);
    }


    static addAll(arr){
        if(arr.length == 0) return undefined;
        let res = arr[0].copy();
        for(let vec of arr.slice(1))
            res.addWithSelf(vec);
        return res;
    }

}
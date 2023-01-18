class Vector2{
    constructor(x=0, y=0){
        this.x = x;
        this.y = y;
    }

    copy(){
        return new Vector2(this.x, this.y);
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
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


    static addAll(arr){
        if(arr.length == 0) return undefined;
        let res = arr[0].copy();
        for(let vec of arr.slice(1))
            res.addWithSelf(vec);
        return res;
    }

}
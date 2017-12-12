//using "odd-q" from https://www.redblobgames.com/grids/hexagons/#coordinates

let getNextVector = (dir,vector) => {
    switch(dir){
        case("n"):
            vector.row--;
            break;
        case("nw"):
            if(vector.col % 2 == 0){
                vector.row--;
            }
            vector.col--;
            break;
        case("ne"):
            if(vector.col % 2 == 0){
                vector.row--;
            }
            vector.col++;
            break;
        case("s"):
            vector.row++;
            break;
        case("sw"):
            if(vector.col % 2 != 0){
                vector.row++;
            }
            vector.col--;
            break;
        case("se"):
            if(vector.col % 2 != 0){
                vector.row++;
            }
            vector.col++;
            break;
    }
    return vector;
}

let getCube = (vector) => {
    let x = vector.col;
    let z = vector.row - (vector.col - (vector.col&1)) / 2;
    let y = -x-z;
    return {
        x: x,
        y: y,
        z: z
    }
}

let getDistance =(vector) => {
    let cube = getCube(vector);
    return Math.max(Math.abs(cube.x), Math.abs(cube.y), Math.abs(cube.z))
}

require("fs").readFile("captcha", "utf8", (err, path) => {
    console.log(path.split(",").reduce((acc,dir) => {
        let vector = getNextVector(dir,acc);
        let dist = getDistance(vector);
        vector.maxdist = vector.maxdist < dist ? dist : vector.maxdist;
        return vector;
    },{col:0,row:0, maxdist:0}).maxdist);
});
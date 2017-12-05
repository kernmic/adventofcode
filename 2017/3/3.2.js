let input = 277678;

let side = 1;
let length = 1;
let matrix = [{
    x: 0,
    y: 0,
    val: 1
}];
let position = matrix[0];
let directions = {
    right: {
        x: 1,
        y: 0,
        next: "up"
    },
    left: {
        x: -1,
        y: 0,
        next: "down"
    },
    up: {
        x: 0,
        y: 1,
        next: "left"
    },
    down: {
        x: 0,
        y: -1,
        next: "right"
    }
};
let currentDirection = directions.right;
let value = 0;

function getAdjacentVectors(x,y,matrix){
    return matrix.filter(vector => {
        for(let key in directions){
            let direction = directions[key];
            if(vector.x == direction.x + x && vector.y == direction.y + y){
                //right,left,up,down
                return true;
            }
            if(vector.x == directions[direction.next].x + direction.x + x && vector.y == directions[direction.next].y + direction.y + y){
                //diagonal
                return true;
            }
        }
        return false;
    });
}

function getSumOfAdjacentVectorValues(x,y,matrix){
    return getAdjacentVectors(x,y,matrix).reduce((acc, val) => {
        return acc + val.val;
    }, 0);
}


while(value <= input){
    for(let i = 1;i<=length&&value<=input;i++){
        let vector = {
            x: position.x + currentDirection.x,
            y: position.y + currentDirection.y
        }
        vector.val = getSumOfAdjacentVectorValues(vector.x,vector.y,matrix);
        value = vector.val;
        position = vector;
        matrix.push(vector);
    }

    currentDirection = directions[currentDirection.next];
    if(side%2==0){
        length++;
    }
    side++;
}

console.log(value);
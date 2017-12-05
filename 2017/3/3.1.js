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

let counter = 2;
while(counter <= input){

    for(let i = 1;i<=length;i++){
        let vector = {
            x: position.x + currentDirection.x,
            y: position.y + currentDirection.y,
            val: counter
        }
        position = vector;
        matrix.push(vector);
        counter++;
    }

    currentDirection = directions[currentDirection.next];
    if(side%2==0){
        length++;
    }
    side++;
}

let distance = matrix.filter(element => element.val == input).map(element => Math.abs(element.x) + Math.abs(element.y))[0];

console.log(distance);
const START = 'S'
const SPLITTER = '^'
const seenCoords = new Map();
let calls = 0;

const moveDownward = (y, x, grid) => {
    const key = [y,x].join(',');
    // if(seenCoords.has(key)){
    //     return 0;
    // }
    // seenCoords.set(key, true);
    if(grid[y]?.[x] === undefined) {
        return 0;
    }
    if(grid[y][x] === SPLITTER){
        return moveDownward(y,x-1,grid) + moveDownward(y,x+1,grid) + 1;
    }
    return moveDownward(y + 1,x,grid);
}

export const countSplits = async (request) => {
    const grid = request.body.split('\n').map(line => line.split(''));
    const startX = grid[0].findIndex(val => val === START)
    const result = moveDownward(0, startX, grid)
    console.log(calls)
    return result;
}
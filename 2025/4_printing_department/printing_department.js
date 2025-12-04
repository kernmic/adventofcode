const PAPER_ROLL = '@';

export const findLocationsWithLessThan4Adjacents = async (request, reply) => {
    const THRESHOLD = 4;
    let numberOfLocations = 0;
    const grid = request.body.split('\n');
    const width = grid[0].length
    const height = grid.length
    for(let y = 0;y<height;y++){
        for(let x = 0;x<width;x++){
            if(grid[y][x] !== PAPER_ROLL) {
                continue;
            }
            let paperRollCount = 0;
            grid[y]?.[x - 1] === PAPER_ROLL && paperRollCount++; // l
            grid[y]?.[x + 1] === PAPER_ROLL && paperRollCount++; // r

            grid[y - 1]?.[x] === PAPER_ROLL && paperRollCount++; // t
            grid[y - 1]?.[x + 1] === PAPER_ROLL && paperRollCount++; // tr
            grid[y - 1]?.[x - 1] === PAPER_ROLL && paperRollCount++; // tl

            grid[y + 1]?.[x] === PAPER_ROLL && paperRollCount++; // b
            grid[y + 1]?.[x + 1] === PAPER_ROLL && paperRollCount++; // br
            grid[y + 1]?.[x - 1] === PAPER_ROLL && paperRollCount++; // bl

            if(paperRollCount < THRESHOLD){
                numberOfLocations++;
            }
        }
    }
    return numberOfLocations
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

export const removePaperrolls = async (request, reply) => {
    const THRESHOLD = 4;
    let grid = request.body.split('\n');
    const width = grid[0].length
    const height = grid.length
    let deletions = -1;
    let totalDeletions = 0;
    while(deletions !== 0){
        deletions = 0;
        const to_delete = [];
        for(let y = 0;y<height;y++){
            for(let x = 0;x<width;x++){
                if(grid[y][x] !== PAPER_ROLL) {
                    continue;
                }
                let paperRollCount = 0;
                grid[y]?.[x - 1] === PAPER_ROLL && paperRollCount++; // l
                grid[y]?.[x + 1] === PAPER_ROLL && paperRollCount++; // r

                grid[y - 1]?.[x] === PAPER_ROLL && paperRollCount++; // t
                grid[y - 1]?.[x + 1] === PAPER_ROLL && paperRollCount++; // tr
                grid[y - 1]?.[x - 1] === PAPER_ROLL && paperRollCount++; // tl

                grid[y + 1]?.[x] === PAPER_ROLL && paperRollCount++; // b
                grid[y + 1]?.[x + 1] === PAPER_ROLL && paperRollCount++; // br
                grid[y + 1]?.[x - 1] === PAPER_ROLL && paperRollCount++; // bl

                if(paperRollCount < THRESHOLD){
                    deletions++;
                    totalDeletions++;
                    to_delete.push([y,x]);
                }
            }
        }
        to_delete.forEach(([y,x]) => {
            grid[y] = grid[y].replaceAt(x, '.')
        })
    }

    return totalDeletions
}
const occupyThreshold = 0;
const becomeEmptyThreshold = 4;
const empty = "L";
const occupied = "#";

const getNodeRows = input => {
  return input
      .map(row => row.split(""))
      .map((row,rowNum, allRows) => row.map((seat,seatNum, allSeatsInRow) => ({
        t: allRows[rowNum-1]?.[seatNum],
        tl: allRows[rowNum-1]?.[seatNum-1],
        tr: allRows[rowNum-1]?.[seatNum+1],
        l: allRows[rowNum]?.[seatNum-1],
        c: seat,
        r: allRows[rowNum]?.[seatNum+1],
        b: allRows[rowNum + 1]?.[seatNum],
        bl: allRows[rowNum + 1]?.[seatNum - 1],
        br: allRows[rowNum + 1]?.[seatNum + 1],
      })))
}

const hasChanged = (nodesBefore, nodesNow) =>
    JSON.stringify(nodesBefore) === JSON.stringify(nodesNow);

const getNextIteration = nodeRows => nodeRows
    .map(row => row.map((seat) => {
      const dirs = Object.keys(seat).filter(x => x !== "c");
      const isEmpty = seat.c === empty;
      const isOccupied = seat.c === occupied;
      const occupiedAdjacents = dirs.reduce((acc,val)=>seat[val] === occupied ? acc + 1 : acc,0)
      if(occupiedAdjacents <= occupyThreshold && isEmpty){
        return occupied;
      }
      if(occupiedAdjacents >= becomeEmptyThreshold && isOccupied){
        return empty;
      }
      return seat.c
    }).join(""));
const hash = arr => arr.join("");
const occupiedSeats = input => hash(input).split("").reduce((acc,val)=>val===occupied?acc+1:acc,0);

const part1 = (input) => {
  let last = "";
  let curr = input;

  while(true){
    const nodeRows = getNodeRows(curr);
    curr = getNextIteration(nodeRows);
    const currentHash = hash(curr);
    if(last === currentHash){
      break;
    }
    last = currentHash;
  }

  return occupiedSeats(curr)
};

exports.part1 = part1;

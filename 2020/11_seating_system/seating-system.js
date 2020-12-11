const occupyThreshold = 0;
const becomeEmptyThreshold = 4;
const becomeEmptyThresholdPart2 = 5;
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

const getNextIterationPart1 = nodeRows => nodeRows
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
    curr = getNextIterationPart1(nodeRows);
    const currentHash = hash(curr);
    if(last === currentHash){
      break;
    }
    last = currentHash;
  }

  return occupiedSeats(curr)
};

const hasOccupiedSeatInSightInDir = (nodeRows,rowNum,seatNum,dir) => {
    const seat = nodeRows[rowNum][seatNum];
    if(seat[dir] === occupied){
        return true;
    }
    if(seat[dir] === undefined || seat[dir] === empty){
        return false;
    }

    return {
        t: hasOccupiedSeatInSightInDir.bind(null,nodeRows,rowNum-1,seatNum,"t"),
        tl: hasOccupiedSeatInSightInDir.bind(null,nodeRows,rowNum-1,seatNum-1,"tl"),
        tr: hasOccupiedSeatInSightInDir.bind(null,nodeRows,rowNum-1,seatNum+1,"tr"),
        l: hasOccupiedSeatInSightInDir.bind(null,nodeRows,rowNum,seatNum-1,"l"),
        r: hasOccupiedSeatInSightInDir.bind(null,nodeRows,rowNum,seatNum+1,"r"),
        b: hasOccupiedSeatInSightInDir.bind(null,nodeRows,rowNum + 1,seatNum,"b"),
        bl: hasOccupiedSeatInSightInDir.bind(null,nodeRows,rowNum + 1,seatNum - 1,"bl"),
        br: hasOccupiedSeatInSightInDir.bind(null,nodeRows,rowNum + 1,seatNum + 1,"br"),
    }[dir]()
}

const getNextIterationPart2 = nodeRows => nodeRows
    .map((row,rowNum) => row.map((seat,seatNum) => {
      const dirs = Object.keys(seat).filter(x => x !== "c");
      const isEmpty = seat.c === empty;
      const isOccupied = seat.c === occupied;
      const occupiedAdjacents = dirs.reduce((acc,dir)=>hasOccupiedSeatInSightInDir(nodeRows,rowNum,seatNum,dir) ? acc + 1 : acc,0);
      if(occupiedAdjacents <= occupyThreshold && isEmpty){
        return occupied;
      }
      if(occupiedAdjacents >= becomeEmptyThresholdPart2 && isOccupied){
        return empty;
      }
      return seat.c
    }).join(""));

const part2 = (input) => {
  let last = "";
  let curr = input;

  while(true){
    curr = getNextIterationPart2(getNodeRows(curr));
    const currentHash = hash(curr);
    if(last === currentHash){
      break;
    }
    last = currentHash;
  }

  return occupiedSeats(curr)
};

exports.part1 = part1;
exports.part2 = part2;

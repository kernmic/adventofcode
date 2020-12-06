const {getSeatId} = require("./get-seat-id");
const { parseInput } = require("../0_util/input-parser");

const getSeatIdWith128RowsAnd8Seats = getSeatId.bind(null, 128, 8);

const input = parseInput();
const seatIds = input.map(getSeatIdWith128RowsAnd8Seats).sort((x,y) => x-y);

const sol1 = seatIds.reduce((acc,seatId)=>seatId > acc ? seatId : acc,0);

console.log("Solution1");
console.log(sol1);
console.log("Solution2");
for(let i = 0;i<seatIds.length;i++) {
    if(seatIds[i] !== i + seatIds[0]){
        console.log(i + seatIds[0]);
        break;
    }
}
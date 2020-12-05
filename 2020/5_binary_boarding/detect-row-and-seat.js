const customBinarySearch = (commands, start, end) => {
  if(commands.length === 0){
    return start;
  }
  const command = commands.shift();
  const middle = Math.floor((start + end)/2);
  if(command === "B" || command === "R"){
    return customBinarySearch(commands,middle,end);
  }else if(command === "F" || command === "L"){
    return customBinarySearch(commands,start,middle);
  }else {
    throw new Error("Unsupported")
  }
}

const detectRowAndSeat = (numberOfRows, numberOfSeats, input) => {
  const rowDescr = input.substr(0,Math.log2(numberOfRows)).split("");
  const seatDescr = input.substr(Math.log2(numberOfRows),Math.log2(numberOfSeats)).split("");
  const row = customBinarySearch(rowDescr,0,numberOfRows);
  const seat = customBinarySearch(seatDescr,0,numberOfSeats);
  return [row, seat]
};

exports.detectRowAndSeat = detectRowAndSeat;

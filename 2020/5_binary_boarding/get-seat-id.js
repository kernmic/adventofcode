const {detectRowAndSeat} = require("./detect-row-and-seat");
const getSeatId = (numberOfRows, numberOfSeats, input) => {
  const rowSeat = detectRowAndSeat(numberOfRows, numberOfSeats, input);
  return rowSeat[0] * 8 + rowSeat[1];
};

exports.getSeatId = getSeatId;

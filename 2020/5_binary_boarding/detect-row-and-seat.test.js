const { detectRowAndSeat } = require("./detect-row-and-seat");

test("detects row and seat", () => {
  const detectRowAndSeatCurried = detectRowAndSeat.bind(null,128,8);
  expect(detectRowAndSeatCurried("FBFBBFFRLR")).toEqual([44,5]);
  expect(detectRowAndSeatCurried("BFFFBBFRRR")).toEqual([70,7]);
  expect(detectRowAndSeatCurried("FFFBBBFRRR")).toEqual([14,7]);
  expect(detectRowAndSeatCurried("BBFFBBFRLL")).toEqual([102,4]);
});

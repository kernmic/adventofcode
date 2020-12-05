const { getSeatId } = require("./get-seat-id");

test("solves correctly", () => {
  expect(getSeatId(128,8,"FBFBBFFRLR")).toEqual(357);
  expect(getSeatId(128,8,"BFFFBBFRRR")).toEqual(567);
  expect(getSeatId(128,8,"FFFBBBFRRR")).toEqual(119);
  expect(getSeatId(128,8,"BBFFBBFRLL")).toEqual(820);
});

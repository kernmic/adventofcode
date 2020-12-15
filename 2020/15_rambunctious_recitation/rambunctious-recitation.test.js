const { getNthNumberSpoken } = require("./rambunctious-recitation");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly example 1", () => {
  expect(getNthNumberSpoken(2020,[0,3,6])).toBe(436);
});
test("solves correctly example 2", () => {
  expect(getNthNumberSpoken(2020,[1,3,2])).toBe(1);
});
test("solves correctly example 3", () => {
  expect(getNthNumberSpoken(2020,[2,1,3])).toBe(10);
});
test("solves correctly example 4", () => {
  expect(getNthNumberSpoken(2020,[1,2,3])).toBe(27);
});
test("solves correctly example 5", () => {
  expect(getNthNumberSpoken(2020,[2,3,1])).toBe(78);
});
test("solves correctly example 6", () => {
  expect(getNthNumberSpoken(2020,[3,2,1])).toBe(438);
});

test("solves correctly example 7", () => {
  expect(getNthNumberSpoken(2020,[3,1,2])).toBe(1836);
});
test("solves correctly input", () => {
  expect(getNthNumberSpoken(2020,[0,13,1,8,6,15])).toBe(1618);
});

// test("solves correctly example 1 in part 2", () => {
//   expect(getNthNumberSpoken(30000000,[0,3,6])).toBe(175594);
// });


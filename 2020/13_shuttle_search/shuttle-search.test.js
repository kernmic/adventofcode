const { part1, part2 } = require("./shuttle-search");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");
const {getOffsetForTimestamp} = require("./shuttle-search");

test("solves correctly part 1", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part1(input)).toBe(295);
});
// test("solves correctly part 2 with test 2", () => {
//   const input = parseInput(path.resolve(__dirname, "test2.txt"));
//   expect(part2(input)).toBe(3417);
// });
// test("solves correctly part 2 with test 3", () => {
//   const input = parseInput(path.resolve(__dirname, "test3.txt"));
//   expect(part2(input)).toBe(754018);
// });
// test("solves correctly part 2 with test 4", () => {
//   const input = parseInput(path.resolve(__dirname, "test4.txt"));
//   expect(part2(input)).toBe(779210);
// });
// test("solves correctly part 2 with test 5", () => {
//   const input = parseInput(path.resolve(__dirname, "test5.txt"));
//   expect(part2(input)).toBe(1261476);
// });
// test("solves correctly part 2 with test 6", () => {
//   const input = parseInput(path.resolve(__dirname, "test6.txt"));
//   expect(part2(input)).toBe(1202161486);
// });
// test("solves correctly getOffsetForTimestamp", () => {
//   const input = parseInput(path.resolve(__dirname, "test1.txt"));
//   const laneIds = input[1].split(",").map(x => isNaN(+x) ? x : +x);
//   expect(getOffsetForTimestamp(1068781,laneIds)).toEqual([0,1,2,3,4,5,6,7]);
// });

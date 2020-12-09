const { part1, part2 } = require("./encoding-error");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly part 1", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part1(input,5)).toBe(127);
});
test("solves correctly part 1 with input", () => {
  const input = parseInput(path.resolve(__dirname, "input.txt"));
  expect(part1(input,25)).toBe(105950735);
});
test("solves correctly part 2", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part2(input,127)).toBe(62);
});
// test("solves correctly part 2 with input", () => {
//   const input = parseInput(path.resolve(__dirname, "input.txt"));
//   expect(part2(input,105950735)).toBe(62);
// });

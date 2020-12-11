const { part1, part2 } = require("./seating-system");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly part 1", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part1(input)).toBe(37);
});
test("solves correctly part1 with input", () => {
  const input = parseInput(path.resolve(__dirname, "input.txt"));
  expect(part1(input)).toBe(2424);
});
test("solves correctly part 2", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part2(input)).toBe(26);
});
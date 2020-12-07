const { part2, part1 } = require("./handy-haversacks");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly part 1", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part1(input)).toBe(4);
});
test("solves correctly part 1 with input", () => {
  const input = parseInput(path.resolve(__dirname, "input.txt"));
  expect(part1(input)).toBe(161);
});
test("solves correctly part 2 with first example", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part2(input)).toBe(32);
});
test("solves correctly part 2 with second example", () => {
  const input = parseInput(path.resolve(__dirname, "test2.txt"));
  expect(part2(input)).toBe(126);
});
test("solves correctly part 2 with input", () => {
  const input = parseInput(path.resolve(__dirname, "input.txt"));
  expect(part2(input)).toBe(30899);
});

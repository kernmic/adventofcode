const { part1, part2 } = require("./adapter-array");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part1(input)).toBe(35);
});
test("solves correctly", () => {
  const input = parseInput(path.resolve(__dirname, "test2.txt"));
  expect(part1(input)).toBe(220);
});
test("solves correctly part1 with input", () => {
  const input = parseInput(path.resolve(__dirname, "input.txt"));
  expect(part1(input)).toBe(2272);
});
test("solves correctly part2", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part2(input)).toBe(8);
});
test("solves correctly part2 with test2", () => {
  const input = parseInput(path.resolve(__dirname, "test2.txt"));
  expect(part2(input)).toBe(19208);
});

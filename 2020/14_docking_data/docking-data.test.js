const { part1, part2 } = require("./docking-data");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part1(input)).toBe(165);
});
test("solves correctly part 2", () => {
  const input = parseInput(path.resolve(__dirname, "test2.txt"));
  expect(part2(input)).toBe(208);
});

const { part1, part2, getPossibleLocations } = require("./docking-data");
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
test("solves correctly getPossibleLocations", () => {
  const possibleLocations = getPossibleLocations("000000000000000000000000000000X1001X",42);
  expect(possibleLocations.includes(26)).toBeTruthy();
  expect(possibleLocations.includes(27)).toBeTruthy();
  expect(possibleLocations.includes(58)).toBeTruthy();
  expect(possibleLocations.includes(59)).toBeTruthy();
});


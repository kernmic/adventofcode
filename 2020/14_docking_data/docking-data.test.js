const { part1 } = require("./docking-data");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part1(input)).toBe(165);
});

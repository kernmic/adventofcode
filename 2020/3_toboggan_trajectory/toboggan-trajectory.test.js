const { tobogganTrajectory } = require("./toboggan-trajectory");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(tobogganTrajectory(input, 3, 1)).toBe(7);
});

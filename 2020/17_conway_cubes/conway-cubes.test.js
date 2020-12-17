const { conwayCubes } = require("./conway-cubes");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  console.log(input);
  expect(conwayCubes(input)).toBe(123);
});

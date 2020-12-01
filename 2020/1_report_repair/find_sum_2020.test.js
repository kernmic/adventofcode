const { findElementsThatSumTo2020 } = require("./find_sum_2020");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(findElementsThatSumTo2020(input)).toBe(514579);
});

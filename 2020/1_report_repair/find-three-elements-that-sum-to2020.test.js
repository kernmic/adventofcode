const {
  findThreeElementsThatSumTo2020,
} = require("./find-three-elements-that-sum-to2020");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(findThreeElementsThatSumTo2020(input)).toBe(241861950);
});

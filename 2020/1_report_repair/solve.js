const {
  findThreeElementsThatSumTo2020,
} = require("./find-three-elements-that-sum-to2020");
const { findElementsThatSumTo2020 } = require("./find_sum_2020");
const { parseInput } = require("../0_util/input-parser");

const input = parseInput();

const sol1 = findElementsThatSumTo2020(input);
const sol2 = findThreeElementsThatSumTo2020(input);

console.log("Solution1");
console.log(sol1);
console.log("Solution2");
console.log(sol2);

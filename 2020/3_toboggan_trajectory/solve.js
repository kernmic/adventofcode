const { tobogganTrajectory } = require("./toboggan-trajectory");
const { parseInput } = require("../0_util/input-parser");

const input = parseInput();

const sol1 = tobogganTrajectory(input, 3, 1);
const sol2 = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
].reduce(
  (acc, [stepX, stepY]) => acc * tobogganTrajectory(input, stepX, stepY),
  1
);

console.log("Solution1");
console.log(sol1);
console.log("Solution2");
console.log(sol2);

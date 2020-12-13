const { part1, part2 } = require("./shuttle-search");
const { parseInput } = require("../0_util/input-parser");

const input = parseInput();

const sol1 = part1(input);
const sol2 = part2(input);
console.log("Solution1");
console.log(sol1);
console.log("Solution2");
console.log(sol2);
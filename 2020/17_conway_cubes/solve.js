const { conwayCubes } = require("./conway-cubes");
const { conwayCubes: part2 } = require("./conway-cubes-part2");
const { parseInput } = require("../0_util/input-parser");

const input = parseInput();

const sol1 = conwayCubes(input);
const sol2 = part2(input);
console.log("Solution1");
console.log(sol1);
console.log("Solution2");
console.log(sol2);

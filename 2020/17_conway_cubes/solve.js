const { conwayCubes } = require("./conway-cubes");
const { parseInput } = require("../0_util/input-parser");

const input = parseInput();

const sol1 = conwayCubes(input);
console.log("Solution1");
console.log(sol1);
'use strict';

const { part1, part2 } = require("./encoding-error");
const { parseInput } = require("../0_util/input-parser");

const input = parseInput();

const sol1 = part1(input,25);
const sol2 = part2(input,105950735);
console.log("Solution1");
console.log(sol1);
console.log("Solution2");
console.log(sol2);
const {passportProcessingPart2} = require("./passport-processing-part2");
const { passportProcessing } = require("./passport-processing");
const { parseInput } = require("../0_util/input-parser");

const input = parseInput();

const sol1 = passportProcessing(input);
const sol2 = passportProcessingPart2(input);

console.log("Solution1");
console.log(sol1);
console.log("Solution2");
console.log(sol2);
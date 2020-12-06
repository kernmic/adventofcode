const {getQuestionsEveryoneAnsweredYes} = require("./custom-customs");
const { getQuestionsAnyoneAnsweredYes } = require("./custom-customs");
const { parseInput } = require("../0_util/input-parser");

const input = parseInput();

const sol1 = getQuestionsAnyoneAnsweredYes(input);
const sol2 = getQuestionsEveryoneAnsweredYes(input);
console.log("Solution1");
console.log(sol1);
console.log("Solution2");
console.log(sol2);
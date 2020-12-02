const {
  countPasswordsMatchingSecondPolicy,
} = require("./count-passwords-matching-second-policy");
const {
  countPasswordsMatchingPolicy,
} = require("./count-passwords-matching-policy");
const { parseInput } = require("../0_util/input-parser");

const input = parseInput();

const sol1 = countPasswordsMatchingPolicy(input);
const sol2 = countPasswordsMatchingSecondPolicy(input);

console.log("Solution1");
console.log(sol1);
console.log("Solution2");
console.log(sol2);

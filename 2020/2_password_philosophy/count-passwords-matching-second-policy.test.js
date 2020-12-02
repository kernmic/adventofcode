const {
  countPasswordsMatchingSecondPolicy,
} = require("./count-passwords-matching-second-policy");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(countPasswordsMatchingSecondPolicy(input)).toBe(1);
});

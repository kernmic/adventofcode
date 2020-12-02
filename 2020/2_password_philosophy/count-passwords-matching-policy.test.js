const {
  countPasswordsMatchingPolicy,
} = require("./count-passwords-matching-policy");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(countPasswordsMatchingPolicy(input)).toBe(2);
});

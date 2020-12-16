const { ticketTranslation, part2 } = require("./ticket-translation");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(ticketTranslation(input)).toBe(71);
});
test("solves correctly part 2 with input", () => {
  const input = parseInput(path.resolve(__dirname, "input.txt"));
  expect(part2(input)).toBe(2628667251989);
});

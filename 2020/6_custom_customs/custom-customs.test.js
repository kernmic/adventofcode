const { getQuestionsAnyoneAnsweredYes, getQuestionsEveryoneAnsweredYes } = require("./custom-customs");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly anyone", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(getQuestionsAnyoneAnsweredYes(input)).toBe(11);
});
test("solves correctly anyone", () => {
  const input = parseInput(path.resolve(__dirname, "input.txt"));
  expect(getQuestionsAnyoneAnsweredYes(input)).toBe(6768);
});

test("solves correctly everyone", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(getQuestionsEveryoneAnsweredYes(input)).toBe(6);
});
test("solves correctly everyone", () => {
  const input = parseInput(path.resolve(__dirname, "input.txt"));
  expect(getQuestionsEveryoneAnsweredYes(input)).toBe(3489);
});
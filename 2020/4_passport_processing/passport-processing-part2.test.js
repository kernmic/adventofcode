const { passportProcessingPart2, hasNumberOfDigits, isBetween, isHeight, isHairColor } = require("./passport-processing-part2");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("isHairColor", () => {
  expect(isHairColor("#123abc")).toBe(true);
  expect(isHairColor("#123abz")).toBe(false);
  expect(isHairColor("123abc")).toBe(false);
  expect(isHairColor("123abcef")).toBe(false);
  expect(isHairColor("123")).toBe(false);
  expect(isHairColor("#123")).toBe(false);
  expect(isHairColor("#1234")).toBe(false);
  expect(isHairColor("#1234567")).toBe(false);
});
test("isHeight", () => {
  expect(isHeight("60in")).toBe(true);
  expect(isHeight("190cm")).toBe(true);
  expect(isHeight("190in")).toBe(false);
  expect(isHeight("190")).toBe(false);
});
test("hasNumberOfDigits", () => {
  expect(hasNumberOfDigits(4,"1234")).toBe(true);
  expect(hasNumberOfDigits(9,"123456789")).toBe(true);
  expect(hasNumberOfDigits(4,"123")).toBe(false);
  expect(hasNumberOfDigits(4,"12345")).toBe(false);
});
test("isBetween", () => {
  expect(isBetween("1920","2002","1950")).toBe(true);
  expect(isBetween("1920","2002","1920")).toBe(true);
  expect(isBetween("1920","2002","2002")).toBe(true);
  expect(isBetween("1920","2002","2003")).toBe(false);
  expect(isBetween("1920","2002","1919")).toBe(false);
});
test("recognizes invalid passports", () => {
  const input = parseInput(path.resolve(__dirname, "test2.txt"));
  expect(passportProcessingPart2(input)).toBe(0);
});
test("recognizes valid passports", () => {
  const input = parseInput(path.resolve(__dirname, "test3.txt"));
  expect(passportProcessingPart2(input)).toBe(4);
});

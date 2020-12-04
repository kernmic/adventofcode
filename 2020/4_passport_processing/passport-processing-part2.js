const { mapKeyValues } = require("./map-key-values");
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const isDigit = tbt => !!tbt.match(/^\d+$/);
const hasNumberOfDigits = (num,tbt) => tbt.length === num && isDigit(tbt);
const isBetween = (min,max,tbt) => isDigit(tbt) && min <= +tbt && max >= +tbt;
const isHeight = tbt =>
    (tbt.split("cm").length > 1 && isBetween("150","193",tbt.split("cm")[0]))
|| (tbt.split("in").length > 1 && isBetween("59","76",tbt.split("in")[0]));
const isHairColor = tbt => !!tbt.match(/^#([0-9a-f]{6})$/);
const isEyeColor = tbt => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(tbt);

const ruleset = {
  "byr": isBetween.bind(null, "1920","2002"),
  "iyr": isBetween.bind(null, "2010","2020"),
  "eyr": isBetween.bind(null, "2020","2030"),
  "hgt": isHeight,
  "hcl": isHairColor,
  "ecl": isEyeColor,
  "pid": hasNumberOfDigits.bind(null,9),
  "cid": () => true
}

const isFieldValidAccordingToRules = (keyValue) => ruleset[keyValue[0]](keyValue[1]);

const isPassportValid = (passport) => requiredFields
    .every(reqField => passport.some(keyValue => keyValue[0] === reqField))
    && passport.every(isFieldValidAccordingToRules);

const passportProcessingPart2 = (input) => mapKeyValues(input)
    .reduce((acc,passport) => isPassportValid(passport) ? acc + 1 : acc, 0);

exports.isHairColor = isHairColor;
exports.isHeight = isHeight;
exports.hasNumberOfDigits = hasNumberOfDigits;
exports.isBetween = isBetween;
exports.passportProcessingPart2 = passportProcessingPart2;

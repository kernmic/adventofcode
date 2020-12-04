const { mapKeyValues } = require("./map-key-values");
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const isPassportValid = (passport) => requiredFields
    .every(reqField => passport.some(keyValue => keyValue[0] === reqField));

const passportProcessing = (input) => mapKeyValues(input)
    .reduce((acc,passport) => isPassportValid(passport) ? acc + 1 : acc, 0);

exports.passportProcessing = passportProcessing;

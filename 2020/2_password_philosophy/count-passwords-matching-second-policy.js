const { prepareData } = require("./count-passwords-matching-policy");

const countPasswordsMatchingSecondPolicy = (passwordsAndPolicies) => {
  return prepareData(passwordsAndPolicies).filter(
    ({ min, max, char, pwd }) =>
      (pwd[min - 1] === char && pwd[max - 1] !== char) ||
      (pwd[min - 1] !== char && pwd[max - 1] === char)
  ).length;
};

exports.countPasswordsMatchingSecondPolicy = countPasswordsMatchingSecondPolicy;

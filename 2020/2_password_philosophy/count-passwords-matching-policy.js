const prepareData = (passwordsAndPolicies) =>
  passwordsAndPolicies.map((pswdPolicy) => {
    const splitted = pswdPolicy.split(/\s/);
    const range = splitted[0].split(/-/).map((r) => parseInt(r));
    return {
      min: range[0],
      max: range[1],
      char: splitted[1].replace(/:/, ""),
      pwd: splitted[2],
    };
  });

const countPasswordsMatchingPolicy = (passwordsAndPolicies) => {
  return prepareData(passwordsAndPolicies).filter(
    ({ min, max, char, pwd }) =>
      pwd.match(new RegExp(char, "g")) &&
      pwd.match(new RegExp(char, "g")).length >= min &&
      pwd.match(new RegExp(char, "g")).length <= max
  ).length;
};

exports.prepareData = prepareData;
exports.countPasswordsMatchingPolicy = countPasswordsMatchingPolicy;

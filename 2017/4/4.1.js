let input = "aa bb cc dd aa";

input = input.split(/\s/);
let wordSet = new Set(input);

console.log(input);
console.log(wordSet);
console.log(wordSet.size == input.length ? "valid" : "not valid");
let fs = require("fs");
let path = require("path");

const parseInput = (filename = "input.txt", delimiter = /\n/) => {
  const data = fs.readFileSync(path.resolve(process.cwd(), filename), "utf8");
  return delimiter ? data.split(delimiter) : data;
};

exports.parseInput = parseInput;

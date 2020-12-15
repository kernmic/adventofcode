const { getNthNumberSpoken } = require("./rambunctious-recitation");
const { parseInput } = require("../0_util/input-parser");

const sol1 = getNthNumberSpoken(2020,[0,13,1,8,6,15]);;
console.log("Solution1");
console.log(sol1);
const sol2 = getNthNumberSpoken(30000000,[0,13,1,8,6,15]);;
console.log("Solution2");
console.log(sol2);
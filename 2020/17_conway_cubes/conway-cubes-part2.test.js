const { countActivePoints, mapInputAsDimension, getNextCycle, getNeighboursOfCube } = require("./conway-cubes-part2");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

// test("getNextCycle", () => {
//   const input = parseInput(path.resolve(__dirname, "test1.txt"));
//   let points = mapInputAsDimension(input);
//   for(let i = 0;i<6;i++){
//     points = getNextCycle(points);
//   }
//   expect(countActivePoints(points)).toEqual(848)
// });
test("getNeighboursOfCube", () => {
  const neighbours = getNeighboursOfCube({ x: 0, y: 2, z: 3, w: 3 });
  expect(neighbours.length).toEqual(80);
});
// test("solves correctly", () => {
//   const input = parseInput(path.resolve(__dirname, "test1.txt"));
//   console.log(input);
//   expect(conwayCubes(input)).toBe(112);
// });


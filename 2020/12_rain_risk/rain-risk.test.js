const { part1, part2, getNextDir } = require("./rain-risk");
const { parseInput } = require("../0_util/input-parser");
let path = require("path");

test("solves correctly part 1", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part1(input)).toBe(25);
});
test("solves getNextDir", () => {
  expect(getNextDir(["R",90],"E")).toBe("S");
  expect(getNextDir(["R",45],"E")).toBe("SE");
  expect(getNextDir(["R",0],"E")).toBe("E");
  expect(getNextDir(["R",135],"E")).toBe("SW");
  expect(getNextDir(["R",180],"E")).toBe("W");
  expect(getNextDir(["R",225],"E")).toBe("NW");
  expect(getNextDir(["R",270],"E")).toBe("N");
  expect(getNextDir(["R",315],"E")).toBe("NE");
  expect(getNextDir(["R",360],"E")).toBe("E");

  expect(getNextDir(["L",45],"E")).toBe("NE");
  expect(getNextDir(["L",90],"E")).toBe("N");
  expect(getNextDir(["L",180],"E")).toBe("W");
});
test("solves correctly part 2", () => {
  const input = parseInput(path.resolve(__dirname, "test1.txt"));
  expect(part2(input)).toBe(286);
});


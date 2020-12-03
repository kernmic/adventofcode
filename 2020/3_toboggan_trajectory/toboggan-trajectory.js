const isTree = (input, x, y) => input[y][x % input[0].length] === "#";

const tobogganTrajectory = (input, stepX, stepY) => {
  const isTreeCurried = isTree.bind(null, input);
  let treesEncountered = 0;
  for (let x = 0, y = 0; y < input.length; x += stepX, y += stepY) {
    if (!isTreeCurried(x, y)) {
      continue;
    }
    treesEncountered++;
  }
  return treesEncountered;
};

exports.tobogganTrajectory = tobogganTrajectory;

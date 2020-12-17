const mapInputAsDimension = input => {
  const grid = [];
  input.forEach((xAxis,y) => xAxis.split("").forEach((val,x) => {
    grid.push({
      active: val === "#",
      x,
      y
    });
  }))
  return grid;
}

const conwayCubes = (input) => {
  console.log(input)
  return mapInputAsDimension(input);
};

exports.conwayCubes = conwayCubes;

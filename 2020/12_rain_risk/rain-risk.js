const prepareData = input => input.map(x => [x[0], +x.substr(1)])

const dirsMap = {
  R: ["N","NE","E","SE","S","SW","W","NW"],
  L: ["N","NE","E","SE","S","SW","W","NW"].reverse()
};
const getNextDir = ([dir,degree],currDir) => {
  if(degree === 0){
    return currDir;
  }
  const dirs = dirsMap[dir];
  const newDirIndex = (dirs.indexOf(currDir) + 1 ) % dirs.length;
  return getNextDir([dir,degree - 45],dirs[newDirIndex]);
}

const getNextShipCoord = ([action,value],{ x, y, dir }) => ({
  x,
  y,
  dir,
  ...({
    N: () => ({
      y: y+value
    }),
    S: () => ({
      y: y-value
    }),
    E: () => ({
      x: x+value
    }),
    W: () => ({
      x: x-value
    }),
    L: () => ({
      dir: getNextDir([action,value],dir)
    }),
    R: () => ({
      dir: getNextDir([action,value],dir)
    }),
    F: getNextShipCoord.bind(null,[dir,value],{ x, y, dir }),
  }[action]())
});

const moveShip = ([currInstruction, ...navInstructions],currCoord = { x: 0, y: 0, dir: 'E' }) =>
    currInstruction ? moveShip(navInstructions,getNextShipCoord(currInstruction,currCoord)) : currCoord

const getManhattanDistanceToOrigin = ({x,y}) => Math.abs(x) + Math.abs(y);

const part1 = (input) => {
    const navInstructions = prepareData(input);
    const coords = moveShip(navInstructions);
    return getManhattanDistanceToOrigin(coords);
};

const rotateCoord = ([dir,degree],{x,y}) => {
  const turns = degree / 90;
  if(turns === 0){
    return {x, y}
  }
  return rotateCoord([dir, degree - 90], { x: dir === "R" ? y : -y, y: dir === "R" ? -x : x})
}

const getNextShipCoordWithWaypoint = ([action,value],{ x, y, dir },{ wx, wy }) => ({
  x,
  y,
  wx,
  wy,
  dir,
  ...({
    N: () => ({
      wy: wy+value
    }),
    S: () => ({
      wy: wy-value
    }),
    E: () => ({
      wx: wx+value
    }),
    W: () => ({
      wx: wx-value
    }),
    L: () => ({
      wx: rotateCoord([action,value],{ x: wx, y: wy }).x,
      wy: rotateCoord([action,value],{ x: wx, y: wy }).y
    }),
    R: () => ({
      wx: rotateCoord([action,value],{ x: wx, y: wy }).x,
      wy: rotateCoord([action,value],{ x: wx, y: wy }).y
    }),
    F: () => ({
      x: x + (value * wx),
      y: y + (value * wy)
    }),
  }[action]())
});

const moveShipWithWaypoint = ([currInstruction, ...navInstructions],currCoord = { x: 0, y: 0, dir: 'E' },waypoint = { wx: 10, wy: 1 }) =>
{
  if(!currInstruction){
    return currCoord;dir: getNextDir([action,value],dir)
  }
  const { x, y, wx, wy, dir } = getNextShipCoordWithWaypoint(currInstruction,currCoord,waypoint);
  return moveShipWithWaypoint(navInstructions,{ x, y, dir }, { wx, wy });
}

const part2 = (input) => {
  const navInstructions = prepareData(input);
  const coords = moveShipWithWaypoint(navInstructions);
  return getManhattanDistanceToOrigin(coords);
};

exports.getNextDir = getNextDir;
exports.part1 = part1;
exports.part2 = part2;

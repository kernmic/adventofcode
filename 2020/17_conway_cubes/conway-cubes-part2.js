const getKey = ({ x,y,z,w }) => `${x}_${y}_${z}_${w}`;

const mapInputAsDimension = input => {
  const points = new Map();
  input.forEach((xAxis,y) => xAxis.split("").forEach((val,x) => points.set(getKey({ x,y,z:0,w:0 }), { x,y,z:0,w:0, active: val === "#" })))
  return points
}

const range = (startAt = 0, size) => [...Array(size).keys()].map(i => i + startAt);

const getNeighboursOfCube = ({ x, y, z, w }) => {
  const px = range(x-1,3);
  const py = range(y-1,3);
  const pz = range(z-1,3);
  const pw = range(w-1,3);
  const neighbours = [];
  px.forEach(x =>
      py.forEach(y =>
          pz.forEach(z =>
              pw.forEach(w => neighbours.push({ x,y,z,w }))
          )
      ))
  return neighbours.filter(p => !(p.x === x && p.y === y && p.z === z && p.w === w));
}

const getCube = (points, coord) => points.get(getKey(coord)) || ({ ...coord, active: false });

const getNextCycle = (points) => {
  console.time(`cycle`)
  const getCubeCurried = getCube.bind(null, points);
  const existingPoints = [...points.values()];
  const allPointsToConsider = Array.from(new Set([...points.values()].map(getNeighboursOfCube).flat().concat(existingPoints))).map(getCubeCurried);
  const newPoints = new Map();
  allPointsToConsider.forEach(point => {
    const neighboursOfPoint = getNeighboursOfCube(point).map(getCubeCurried);
    const activeNeighbours = neighboursOfPoint.reduce((acc,val) => val.active ? acc + 1 : acc , 0);
    if(point.active && (activeNeighbours === 2 || activeNeighbours === 3)){
      newPoints.set(getKey(point),point);
    }else if(point.active){
      newPoints.set(getKey(point),{
        ...point,
        active: false
      });
    }
    else if(!point.active && activeNeighbours === 3){
      newPoints.set(getKey(point),{
        ...point,
        active: true
      });
    } else {
      newPoints.set(getKey(point),point);
    }
  });
  console.timeEnd(`cycle`)
  return newPoints;
}

const countActivePoints = points => [...points.values()].reduce((acc,{ active }) => active ? acc + 1 : acc, 0);

const conwayCubes = (input) => {
  let points = mapInputAsDimension(input);
  for(let i = 0;i<6;i++){
    points = getNextCycle(points);
  }
  return countActivePoints(points);
};

exports.countActivePoints = countActivePoints;
exports.getNeighboursOfCube = getNeighboursOfCube;
exports.getKey = getKey;
exports.getNextCycle = getNextCycle;
exports.mapInputAsDimension = mapInputAsDimension;
exports.conwayCubes = conwayCubes;

const transformData = input => [+input[0],input[1].split(",").filter(x => x !== "x").map(x => +x).sort((a,b)=>a-b)]

const part1 = (input) => {
  const [depart, laneIds] = transformData(input);

  const { laneId, wait } = laneIds.map(laneId => depart%laneId).map((rest,id) => laneIds[id] - rest).reduce((acc,waitMin,idx) => waitMin < acc.wait ?
      ({
        laneId: laneIds[idx],
        wait: waitMin
      }) : acc , {
    laneId: laneIds[laneIds.length - 1],
    wait: laneIds[laneIds.length - 1]
  });

  return laneId * wait;
};

exports.part1 = part1;

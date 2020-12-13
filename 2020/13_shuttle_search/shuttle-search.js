const part1 = (input) => {
  const [depart, laneIds] = [+input[0],input[1].split(",").filter(x => x !== "x").map(x => +x).sort((a,b)=>a-b)];

  const { laneId, wait } = laneIds
      .map(laneId => depart%laneId)
      .map((rest,id) => laneIds[id] - rest)
      .reduce((acc,waitMin,idx) => waitMin < acc.wait ?
      ({
        laneId: laneIds[idx],
        wait: waitMin
      }) : acc , {
    laneId: laneIds[laneIds.length - 1],
    wait: laneIds[laneIds.length - 1]
  });

  return laneId * wait;
};

// const getOffsetForTimestamp = (t, laneIds) => {
//     return laneIds
//         .map(laneId => isNaN(+laneId) ? laneId : t%laneId)
//         .map((rest,id) => {
//             if()
//             console.log(id);
//             return rest === 0 ? 0 : isNaN(+rest) ? id : laneIds[id] - rest;
//         })
// }

const   getOffsetForTimestamp = (t, laneIds) => {
    return laneIds
        .map((laneId,id) => {
            if(isNaN(+laneId)){
                return id;
            }
            const rest = t%laneId ? (laneIds[id] - (t%laneId)) : 0;
            if(rest !== id){
                throw new Error("not ascending");
            }
            return rest;
        })
}

const part2 = (input) => {
    const laneIds = input[1].split(",").map(x => isNaN(+x) ? x : +x);
    let i = laneIds[0];
    while(true){
        try{
            let b = i%20;
            getOffsetForTimestamp(b,laneIds);
            return i;
        } catch(e){
        } finally {
            i+=laneIds[0];
        }
    }
}

exports.getOffsetForTimestamp = getOffsetForTimestamp;
exports.part1 = part1;
exports.part2 = part2;

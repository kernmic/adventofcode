const getNthNumberSpoken = (nthNr, startingNrs) => {
  let idxMap = new Map();

  startingNrs.forEach((nr,idx) => idxMap.set(nr,[idx]))

  const numbers = [...startingNrs];
  console.time('iteration')
  for(let i=startingNrs.length;i<nthNr;i++){
    const latestNumber = numbers.pop();
    const [oldIdx,recentIdx] = idxMap.get(latestNumber) || [];
    const currentNumber = !recentIdx ? 0 : (recentIdx - oldIdx)
    const [oldIdxOfCurrentNumber,recentIdxOfCurrentNumber] = idxMap.get(currentNumber) || [];
    const newOldIndex = recentIdxOfCurrentNumber || oldIdxOfCurrentNumber;
    idxMap.set(currentNumber,newOldIndex !== undefined ? [newOldIndex,i] : [i])
    numbers.push(currentNumber);
    if(i%(nthNr/10)===0){
      console.timeEnd('iteration')
      console.time(`iteration`)
    }
  }
  console.timeEnd('iteration')
  return numbers[numbers.length - 1];
}

const rambunctiousRecitation = () => {
  return getNthNumberSpoken(2020,[0,13,1,8,6,15]);
};

exports.getNthNumberSpoken = getNthNumberSpoken;
exports.rambunctiousRecitation = rambunctiousRecitation;

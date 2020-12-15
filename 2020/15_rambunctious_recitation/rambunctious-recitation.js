const getNthNumberSpoken = (nthNr, startingNrs) => {
  let idxMap = startingNrs.reduce((acc,nr,idx)=>({
    ...acc,
    [nr]: [idx]
  }),{});
  const numbers = [...startingNrs];
  console.time('iteration')
  for(let i=startingNrs.length;i<nthNr;i++){
    const latestNumber = numbers.pop();
    const [oldIdx,recentIdx] = idxMap[latestNumber] || [];
    const currentNumber = !recentIdx ? 0 : (recentIdx - oldIdx)
    const [oldIdxOfCurrentNumber,recentIdxOfCurrentNumber] = idxMap[currentNumber] || [];
    const newOldIndex = recentIdxOfCurrentNumber || oldIdxOfCurrentNumber;
    idxMap[currentNumber] = newOldIndex !== undefined ? [newOldIndex,i] : [i];
    numbers.push(currentNumber);
    if(i%3000000===0){
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

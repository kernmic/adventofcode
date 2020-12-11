"use strict";
const parseNumbers = input => input.map(x => +x).sort((a,b) => a-b);
const getBuiltInAdapter = numbers => numbers[numbers.length - 1] + 3;

const getDifferences = adapters => adapters.reduce((acc,adapter,currIdx,arr) => {
  const last = arr[currIdx-1] || 0;
  const diff = arr[currIdx]-last;
  if(diff > 3 || diff === 0){
    throw new Error("Adapter cannot be used");
  }
  return {
    ...acc,
    [diff]: (acc[diff] || 0) + 1
  }
},{});

const part1 = (input) => {
  const numbers = parseNumbers(input);
  const builtInAdapter = getBuiltInAdapter(numbers);
  const adapters = [...numbers,builtInAdapter];
  const differences = getDifferences(adapters);
  return Object.values(differences).reduce((acc,val)=>acc*val,1);
};

/**
 * The key is this memoization technique explained here
 * https://www.youtube.com/watch?v=cE88K2kFZn0
 */
let memoizedPathsFrom = {};
const getNumberOfPaths = (adapters, idx = 0) => {
  if(idx === adapters.length - 1){
    return 1;
  }
  if(memoizedPathsFrom[idx] !== undefined){
    return memoizedPathsFrom[idx];
  }
  const adapter = adapters[idx];
  let numPaths = 0;
  for(let i = idx+1;i<=adapters.length;i++){
    if(adapters[i]-adapter<=3){
      numPaths += getNumberOfPaths(adapters,i)
    }
  }
  memoizedPathsFrom[idx] = numPaths;
  return numPaths;
}

const part2 = input => {
  const numbers = parseNumbers(input);
  const builtInAdapter = getBuiltInAdapter(numbers);
  const adapters = [0].concat([...numbers,builtInAdapter]);
  memoizedPathsFrom={};//reset memo
  return getNumberOfPaths(adapters);
};

exports.part1 = part1;
exports.part2 = part2;

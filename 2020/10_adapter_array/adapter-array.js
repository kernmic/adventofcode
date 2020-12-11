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

const getNumberOfPaths = (adapters, idx = 0, paths = 0) => {
  return 2
}

const part2 = input => {
  const numbers = parseNumbers(input);
  const builtInAdapter = getBuiltInAdapter(numbers);
  const adapters = [...numbers,builtInAdapter];
  console.log(getNumberOfPaths(adapters))

};

exports.part1 = part1;
exports.part2 = part2;

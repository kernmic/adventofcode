const parseNumbers = input => input.map(x => +x);

const checkWindowUntilAnyTwoInPreambleWindowResolvesToSum = (preambleWindow,numbers,idx) => {
  const sum = numbers[idx];
  if(sum === undefined){
    throw new Error("End reached");
  }
  const candidates = numbers.slice(idx-preambleWindow,idx);
  let summands = false;
  for(let i = 0;i<candidates.length;i++){
    for(let a = 0;a<candidates.length;a++){
      if(i===a || candidates[i] + candidates[a] !== sum){
        continue;
      }
      summands = true;
      break;
    }
  }
  if(!summands){
    return numbers[idx];
  }
  return checkWindowUntilAnyTwoInPreambleWindowResolvesToSum(preambleWindow,numbers,idx + 1);
}

const part1 = (input, preambleWindow) => {
  const numbers = parseNumbers(input);
  return checkWindowUntilAnyTwoInPreambleWindowResolvesToSum(preambleWindow,numbers,preambleWindow);
};

"use strict";
function findContiguousSums (numbers,searchSum,idx = 0,candidateWindow = 2) {

  let sum = 0;
  for(let i = idx;i<idx+candidateWindow;i++){
    sum += numbers[i];
  }
  if(sum === searchSum){
    return numbers.slice(idx,idx+candidateWindow);
  }
  if(sum > searchSum){
    return findContiguousSums(numbers,searchSum,idx + 1,2);
  }
  // console.log({
  //   searchSum,
  //   idx,
  //   candidateWindow
  // })
  return findContiguousSums(numbers,searchSum,idx,candidateWindow + 1);
}

"use strict";
function part2(input, sum){
  const numbers = parseNumbers(input);
  const contiguousSums = findContiguousSums(numbers,sum).sort((a,b)=>a-b);
  return contiguousSums[0] + contiguousSums[contiguousSums.length - 1];
};

exports.part1 = part1;
exports.part2 = part2;

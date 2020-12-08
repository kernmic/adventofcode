const parseCommands = input => input.map(val => val.split(/\s/)).map(val => [val[0],+val[1]])

const getNextIdxAndAcc = ([command, param],currIdx,currAcc) => {
  switch(command) {
    case "nop":
      return {
        acc: currAcc,
        idx: currIdx + 1
      }
    case "acc":
      return {
        acc: currAcc + param,
        idx: currIdx + 1
      }
    case "jmp":
      return {
        acc: currAcc,
        idx: currIdx + param
      }
  }
}

const executeCommandUntilSameIdxIsCalled = (commands,idx = 0,acc = 0,calledIdx = []) => {
  if(calledIdx.includes(idx) || commands[idx] === undefined){
    return {
      acc,
      terminated: commands[idx] === undefined
    };
  }
  const {
    acc: nextAcc,
    idx: nextIdx
  } = getNextIdxAndAcc(commands[idx],idx,acc);
  return executeCommandUntilSameIdxIsCalled(commands,nextIdx,nextAcc,[...calledIdx, idx]);
}

const part1 = (input) => {
  const commands = parseCommands(input);
  const {acc} = executeCommandUntilSameIdxIsCalled(commands);
  return acc;
};
const part2 = (input) => {
  const commands = parseCommands(input);
  const idxOfJmps = commands.map(([x]) => x).map((x,idx) => x === "jmp" ? idx : false).filter(x => !!x);
  for(let i = 0;i<idxOfJmps.length;i++){
    const newCommands = JSON.parse(JSON.stringify(commands));
    newCommands[idxOfJmps[i]][0] = "nop";
    const {terminated,acc} = executeCommandUntilSameIdxIsCalled(newCommands);
    if(!terminated){
      continue;
    }
    return acc;
  }
};

exports.part1 = part1;
exports.part2 = part2;

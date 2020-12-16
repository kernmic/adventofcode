const Long = require("long");

const parseMemoryLocation = instr => +instr.match(/(\d+)/g);
const applyMask = (mask,val) => {
  const value = Long.fromInt(val);
  const andMask = Long.fromString(mask.replace(/[X]/g,'1'),2);
  const orMask = Long.fromString(mask.replace(/[X]/g,'0'),2);
  let temp = value.or(orMask);
  return temp.and(andMask);
}

const part1 = (input) => {
  const data = input.map(d => d.split(/\s=\s/));
  const reduced = data.reduce(({ acc, mask, memory },[instr, val]) => {
    if(instr === "mask"){
      return {
        acc,
        memory,
        mask: val
      }
    }
    const mem = parseMemoryLocation(instr);
    const calc = applyMask(mask,+val);
    return {
      acc,
      mask,
      memory: {
        ...memory,
        [mem]: calc
      }
    }
  }, {
    mask: 0,
    acc: 0,
    memory: {}
  })
  // console.log(reduced)
  return +Object.values(reduced.memory).reduce((acc,val)=>acc.add(val),Long.fromInt(0)).toString()
};

const applyMaskPart2 = (mask,val) => {
  const value = Long.fromInt(val);
  const orMask = Long.fromString(mask.replace(/[X]/g,'0'),2);
  return value.or(orMask);
}

const replaceAt = (str,idx,repl) => str.substring(0, idx) + repl + str.substring(idx + 1);
const pad = (str,length,val) => `${new Array(length-str.length).fill(val).join("")}${str}`
const getPossibleLocations = (mask,val) => {
  const binaryValue = pad(applyMaskPart2(mask,val).toString(2),mask.length,"0");
  const idxsOfX = mask.split("").map((x,idx) => x === "X" ? idx : undefined).filter(x => x !== undefined);
  const combs = [];
  for(let i = 0;i < Math.pow(2,idxsOfX.length);i++){
    const length = (Math.pow(2,idxsOfX.length) - 1).toString(2).length;
    const padded = pad(i.toString(2),length,"0").split("")
    const reduced = padded.reduce((acc,val,idx) => replaceAt(acc,idxsOfX[idx],val), binaryValue);
    combs.push(reduced);
  }
  return combs.map(comb => +Long.fromString(comb,true,2).toString());
}


const part2 = (input) => {
  const data = input.map(d => d.split(/\s=\s/));
  const reduced = data.reduce(({ acc, mask, memory },[instr, val]) => {
    if(instr === "mask"){
      return {
        acc,
        memory,
        mask: val
      }
    }
    const mem = parseMemoryLocation(instr);
    const possibleLocations = getPossibleLocations(mask,mem);
    return {
      acc,
      mask,
      memory: {
        ...memory,
        ...possibleLocations.reduce((locAcc,currMem) => ({
          ...locAcc,
          [currMem]: +val
        }), {})
      }
    }
  }, {
    mask: 0,
    acc: 0,
    memory: {}
  })
  return +Object.values(reduced.memory).reduce((acc,val)=>acc.add(val),Long.fromInt(0)).toString()
};

exports.getPossibleLocations = getPossibleLocations;
exports.part1 = part1;
exports.part2 = part2;

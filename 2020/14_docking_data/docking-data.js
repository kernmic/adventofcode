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

const getPossibleLocations = (mask,val) => {
  const nrOfX = mask.split("X").length - 1;
  const nrOfCombs = parseInt(new Array(nrOfX).fill("1").join(""),2);
  const combs = [val.toString(2)];
  for(let i = 0;i<=nrOfCombs;i++){
    combs.push(i.toString(2));
  }
  return combs;
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
    const memAfterMask = applyMaskPart2(mask,mem);
    const possibleLocations = getPossibleLocations(mask,memAfterMask);
    console.log({ mem,memAfterMask: memAfterMask.toString(), bin: memAfterMask.toString(2), possibleLocations});
    return {
      acc,
      mask,
      memory: {
        ...memory,
        [mem]: +val
      }
    }
  }, {
    mask: 0,
    acc: 0,
    memory: {}
  })
  console.log(reduced)
  return +Object.values(reduced.memory).reduce((acc,val)=>acc.add(val),Long.fromInt(0)).toString()
};

exports.part1 = part1;
exports.part2 = part2;

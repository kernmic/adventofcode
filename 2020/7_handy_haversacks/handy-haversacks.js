const bagRegex = /^(.*)\sbags contain.*$/;
const bagsRegex = /(\d\s[\w*\s]*)bag/g;

const parseBags = (input) => {
  return input.reduce((acc,line) => {
    const bag = line.match(bagRegex)[1];
    const bags = line.match(bagsRegex)
        ? line.match(bagsRegex)
            .map(x => [+x[0],x.substr(2).replace(/\sbags?/,"")])
        : [];
    return {
      ...acc,
      [bag]: bags.reduce((a,b) => ({
        ...a,
        [b[1]]: b[0]
      }), {})
    }
  }, {});
}

const countLookupBags = (currentBag,allBags,lookupBag) => {
  const containedBagKeys = Object.keys(currentBag);
  if(!containedBagKeys.length){
    return 0;
  }
  const containedLookedUpBags = currentBag[lookupBag] || 0;
  const mappedBags = containedBagKeys.map(key => allBags[key]);
  return containedLookedUpBags + mappedBags.reduce((acc,val) => acc + countLookupBags(val,allBags,lookupBag) , 0)
}

const countAllNestedBags = (currentBag,allBags) => {
  const containedBagKeys = Object.keys(currentBag);
  if(!containedBagKeys.length){
    return 1;
  }
  const mappedBags = containedBagKeys.map(key => ({
    bag: allBags[key],
    count: currentBag[key]
  }));
  return mappedBags.reduce((acc,{ bag, count }) => {
    const nestedBags = countAllNestedBags(bag,allBags);
    return acc + (count * nestedBags)
  } , 1);
}

const lookup = "shiny gold";
const part1 = (input) => {
  const bags = parseBags(input);
  const count = Object.keys(bags)
      .reduce((acc,key) => acc + (!!countLookupBags(bags[key],bags,lookup) ? 1 : 0), 0)
  return count;
};
const part2 = (input) => {
  const bags = parseBags(input);
  return countAllNestedBags(bags[lookup],bags) - 1; //dont count shiny gold
};

exports.part1 = part1;
exports.part2 = part2;

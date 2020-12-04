const mapKeyValues = (input) => Object.values(input.reduce((acc,val) => !val
    ?
    ( {
      ...acc,
      pid: acc.pid + 1
    })
    :
    ({
      ...acc,
      pairs: {
        ...acc.pairs,
        [acc.pid]: !!acc.pairs[acc.pid]
            ? acc.pairs[acc.pid].concat(val.split(/\s/).map(x => x.split(":")))
            : val.split(/\s/).map(x => x.split(":"))
      }
    })
    , {
      pid: 0,
      pairs: {}
    }).pairs);

exports.mapKeyValues = mapKeyValues;

const fieldRegex = /(.*): (\d+)-(\d+) or (\d+)-(\d+)/;

const getFields = input => input
    .map(i => i.match(fieldRegex))
    .filter(i => !!i)
    .map(([,name,min1,max1,min2,max2]) =>
        [
            { name, min: +min1, max: +max1 },
          { name, min: +min2, max: +max2 }
          ]);
const getYourTicket = input => input[input.findIndex(x => x === "your ticket:") + 1].split(",").map(i => +i);
const getNearbyTickets = input => input.slice(input.findIndex(x => x === "nearby tickets:") + 1).map(x => x.split(",").map(i => +i));

const validateNumberAgainstField = ({ min, max}, nr) => nr >= min && nr <= max;

const ticketTranslation = (input) => {
  const allRanges = getFields(input).flat();
  const allNrsFromNearbyTickets = getNearbyTickets(input).flat();
  return allNrsFromNearbyTickets
      .filter(nr => !allRanges.some(range => validateNumberAgainstField(range, nr)))
      .reduce((acc,val) => acc + val, 0);
};

const determineValidRangesForNr = (allRanges, nr) => {
  return allRanges.filter(range => validateNumberAgainstField(range,nr))
}

const determinePossibleRangesForColumn = (tickets,ranges,column) =>
    tickets
        .map(ticket => ticket[column])
        .map(nr => determineValidRangesForNr(ranges,nr))
        .reduce((acc,val) => {
          if(acc === null){
            return val.map(({ name }) => name)
          }
          return acc.filter(a => val.some(({ name }) => name === a))
        } , null);

const determinePossibleFieldsForColumns = (tickets,ranges) =>
    new Array(tickets[0].length)
        .fill(undefined)
        .map((_,idx) => determinePossibleRangesForColumn(tickets,ranges,idx))

const getValidNearbyTickets = (ranges,nearbyTickets) => {
  const allNrsFromNearbyTickets = nearbyTickets.flat();
  const invalidNumbers = allNrsFromNearbyTickets
      .filter(nr => !ranges.some(range => validateNumberAgainstField(range, nr)));
  return nearbyTickets.filter(ticket => !ticket.some(nr => invalidNumbers.includes(nr)));
}

const shakePossibleRangesUntilOnlyOnePossibility = (possibleFields) => {
  if(possibleFields.every(fields => fields.length === 1)){
    return possibleFields.flat()
  }
  const fixedValues = possibleFields.filter(fields => fields.length === 1).map(([name])=>name);
  const newPossibleFields = possibleFields
      .map(fields => (fields.length === 1) ? fields : fields.filter(x => !fixedValues.includes(x)))
  return shakePossibleRangesUntilOnlyOnePossibility(newPossibleFields)
}

const part2 = (input) => {
  const allRanges = getFields(input).flat();
  const yourTicket = getYourTicket(input);
  const nearbyTickets = getNearbyTickets(input);
  const validNearbyTickets = getValidNearbyTickets(allRanges,nearbyTickets);
  const possibleFields = determinePossibleFieldsForColumns(validNearbyTickets,allRanges);
  const fieldNames = shakePossibleRangesUntilOnlyOnePossibility(possibleFields);
  return fieldNames
      .map(x => !!x.match(/^departure.*$/))
      .map((match,idx) => match ? idx : undefined )
      .filter(x => !!x)
      .reduce((acc,idx) => acc * yourTicket[idx] , 1)
};

exports.ticketTranslation = ticketTranslation;
exports.part2 = part2;

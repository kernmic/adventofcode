export const countFreshIngredients = (request) => {
    const lines = request.body.split('\n');
    const separator = lines.findIndex(line => line === '');
    const ranges = lines.slice(0, separator).map(range =>
        range.split('-').map(Number));
    const ingredientIds = lines.slice(separator + 1, lines.length).map(Number);
    return ingredientIds.reduce((acc, val) => {
        if (ranges.some(([start, end]) => val >= start && val <= end)) {
            return acc + 1;
        }
        return acc;
    }, 0);
}

const mergeRanges = (rangesInput) => {
    let ranges = [...rangesInput];
    let merges = undefined;
    while (merges !== 0) {
        merges = 0;
        for (let i = 0; i < ranges.length; i++) {
            const currRangeStart = ranges[i][0];
            const rangesToMerge = ranges.filter(([start, end]) => currRangeStart >= start && currRangeStart <= end);
            const otherRanges = ranges.filter(([start, end]) => currRangeStart < start || currRangeStart > end);
            const mergedRange = rangesToMerge.reduce((acc, val) => [acc[0] < val[0] ? acc[0] : val[0], acc[1] > val[1] ? acc[1] : val[1]], rangesToMerge[0])
            if(rangesToMerge.length > 1){
                merges++;
                ranges = [mergedRange].concat(otherRanges);
                break;
            }
        }
    }
    return ranges;
}

export const countMaxNrOfFreshIngredients = (request) => {
    const lines = request.body.split('\n');
    const separator = lines.findIndex(line => line === '');
    const ranges = lines.slice(0, separator).map(range =>
        range.split('-').map(Number));
    const mergedRanges = mergeRanges(ranges);
    return mergedRanges.reduce((acc,val) => acc + (val[1] - val[0] + 1), 0);
}


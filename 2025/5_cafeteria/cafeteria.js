export const countFreshIngredients = (request) => {
    const lines = request.body.split('\n');
    const separator = lines.findIndex(line => line === '');
    const ranges = lines.slice(0,separator).map(range =>
    range.split('-').map(Number));
    const ingredientIds = lines.slice(separator + 1,lines.length).map(Number);
    return ingredientIds.reduce((acc,val) => {
        if(ranges.some(([start, end]) =>  val >= start && val <= end)){
            return acc + 1;
        }
        return acc;
    }, 0);
}


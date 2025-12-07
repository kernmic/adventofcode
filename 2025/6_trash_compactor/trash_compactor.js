const OP_MULTIPLY = '*';
const OP_ADD = '+';

export const findGrandTotal = async (request) => {
    const lines = request.body.split('\n');
    const operators = lines[lines.length - 1].replaceAll(/\s+/gm, " ")
        .trim()
        .split(' ')
    const verticalLane = lines.slice(0,lines.length - 1).reduce((acc,val) => {
        val.replaceAll(/\s+/gm, " ")
            .trim()
            .split(' ')
            .map((numb, index) => {
                if(!acc[index]){
                    acc[index] = []
                }
                acc[index].push(Number(numb))
            })
        return acc;
    }, []);

    return verticalLane.reduce((acc, val, index) => {
        const operator = operators[index];
        const verticalResult = val.reduce((acc1, val1) => {
            if(operator === OP_MULTIPLY) {
                return acc1 * val1;
            }
            if(operator === OP_ADD) {
                return acc1 + val1;
            }
            return acc1;
        }, operator === OP_MULTIPLY ? 1 : 0);
        return acc + verticalResult;
    }, 0);
}


// 123  328     51  64
// 45   64      387 23
// 6    98      215 314
// *    +       *   +
export const findGrandTotalCephalopodMath = async (request) => {
    const lines = request.body.split('\n').map(line => line.split('').reverse().join(''));
    const numberOfLanes = lines[0].length;
    const lanes = new Array(numberOfLanes).fill(null).map(x => []);
    const operators = lines[lines.length - 1].replaceAll(/\s+/gm, " ")
        .trim()
        .split(' ')
    console.log('lines', lines);
    lines.slice(0, lines.length -1 )
        .map(line => line.split(''))
        .forEach((line) => {
            line.forEach((entry, index) => {
                lanes[index].push(entry)
            })
    })
    const verticalLane = lanes
        .map(lane => lane.filter(val => val !== ' ').join('')
        ).join('-').split('--').map(row => row.split('-').map(Number))
    return verticalLane.reduce((acc, val, index) => {
        const operator = operators[index];
        const verticalResult = val.reduce((acc1, val1) => {
            if(operator === OP_MULTIPLY) {
                return acc1 * val1;
            }
            if(operator === OP_ADD) {
                return acc1 + val1;
            }
            return acc1;
        }, operator === OP_MULTIPLY ? 1 : 0);
        return acc + verticalResult;
    }, 0);
}
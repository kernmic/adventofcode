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
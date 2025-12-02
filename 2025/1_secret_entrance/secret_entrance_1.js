export const secretEntrance1 = async (request, reply) =>  {
    const inputs = request.body.split('\n');
    let position = 50;
    let zeroCount = 0;
    inputs.forEach(turn => {
        const direction = turn[0];
        const multiplier = direction === 'L' ? -1 : 1;
        const clicks = Number(turn.slice(1)) * multiplier;

        position += clicks;

        if(position % 100 === 0){
            zeroCount++;
        }
    })

    return zeroCount
}

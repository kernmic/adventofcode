export const secretEntrance2 = async (request, reply) =>  {
    const inputs = request.body.split('\n');
    let lastPosition = 50;
    let position = 50;
    let zeroCount = 0;
    inputs.forEach(turn => {
        const direction = turn[0];
        const multiplier = direction === 'L' ? -1 : 1;
        const clicks = Number(turn.slice(1)) * multiplier;

        position += clicks;
        position = (100 + position) % 100;


        zeroCount += Math.floor(Math.abs(clicks) / 100)
        if(clicks < 0 && position >= lastPosition){
            zeroCount++;
        }
        if(clicks > 0 && position <= lastPosition) {
            zeroCount++;
        }
        console.log(lastPosition, clicks, position, zeroCount);

        lastPosition = position;
    })

    return zeroCount
}

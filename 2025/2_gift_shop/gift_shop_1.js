export const giftShop1 = async (request, reply) => {

    // 11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
    // 1698522-1698528,446443-446449,38593856-38593862,565653-565659,
    // 824824821-824824827,2121212118-2121212124

    const ranges = request.body.replaceAll('\n','').split(',');
    let invalidSum = 0;
    console.debug(ranges);
    ranges.map(range => range.split('-').map(Number)).forEach(([start, end]) => {
        for(let i = start;i<=end;i++){
            const iStr = `${i}`
            if(iStr.length%2===0){
                const middle = Math.floor(iStr.length / 2);
                if(iStr.slice(0,middle) === iStr.slice(middle, iStr.length)){
                    invalidSum += i;
                }
            }
        }
    })

    return invalidSum
}
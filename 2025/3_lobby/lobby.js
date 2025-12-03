export const findLargestJoltage = (batteryBank) => {
    let leftIndex = 0;
    let leftValue = 0;
    let rightValue = 0;
    for(let i = 0;i<batteryBank.length-1;i++){
        if(+batteryBank[i] > leftValue){
            leftValue = +batteryBank[i];
            leftIndex = i;
        }
    }
    for(let i = leftIndex + 1;i<batteryBank.length;i++){
        if(+batteryBank[i] > rightValue){
            rightValue = +batteryBank[i];
        }
    }
    return +[leftValue,rightValue].join('')
}

export const lobby1 = async (request, reply) => {
    return request.body.split('\n')
        .map(findLargestJoltage)
        .reduce((acc,val) => acc + val, 0)
}

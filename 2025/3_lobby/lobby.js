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

export const findLargestJoltage12 = (batteryBank) => {
    let index = -1;
    const foundValues = [];

    while(foundValues.length < 12){
        let value = 0;
        for(let i = index + 1;i<batteryBank.length - (12 - foundValues.length - 1);i++){
            if(+batteryBank[i] > value){
                value = +batteryBank[i];
                index = i
            }
        }
        foundValues.push(value)
    }
    return +foundValues.join('')
}

export const lobby1 = async (request, reply) => {
    return request.body.split('\n')
        .map(findLargestJoltage)
        .reduce((acc,val) => acc + val, 0)
}

export const lobby2 = async (request, reply) => {
    return request.body.split('\n')
        .map(findLargestJoltage12)
        .reduce((acc,val) => acc + val, 0)
}

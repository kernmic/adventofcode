let _ = require("lodash");

let rotateRight = (array,n) => {
    for(let i = 0;i<n;i++)
        array.splice(0,0,array.pop());
    return array;
}

let rotateLeft = (array,n) => {
    for(let i = 0;i<n;i++)
        array.push(array.splice(0,1)[0]);
    return array;
}

let calculateKnotHash = (input) => {
    let pointer = 0, skipSize = 0, numbers = _.range(256), block = 0;
    input = input.split("").map(e => e.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
    for(let i = 0;i<64;i++){
        input.forEach((length) => {
            numbers = rotateLeft(numbers,pointer);
            let subset = numbers.splice(0,length);
            subset.reverse();
            numbers = subset.concat(numbers);
            numbers = rotateRight(numbers,pointer);

            pointer += length;
            pointer += skipSize++;
            pointer = pointer%numbers.length;
        });
    }
    return numbers.reduce((acc,val,idx) => {
        if(!acc.length){
            acc[block] = val;
            return acc;
        }
        if(idx%16==0)block++;
        acc[block] ^= val;
        return acc;
    },[]).map(e => {
        let hex = e.toString(16);
        return (hex.length < 2) ? "0"+hex : hex;
    }).join("");
}

require("fs").readFile("captcha", "utf8", (err, lengths) => {
    console.log(calculateKnotHash(lengths));
});

module.exports.getKnotHash = calculateKnotHash;
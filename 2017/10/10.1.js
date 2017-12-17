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

require("fs").readFile("captcha", "utf8", (err, lengths) => {
    lengths = lengths.split(",").map(length => Number(length));
    let pointer = 0, skipSize = 0, numbers = _.range(256);

    lengths.forEach((length) => {
        numbers = rotateLeft(numbers,pointer);
        let subset = numbers.splice(0,length);
        subset.reverse();
        numbers = subset.concat(numbers);
        numbers = rotateRight(numbers,pointer);

        pointer += length;
        pointer += skipSize++;
        pointer = pointer%numbers.length;
    });

    console.log(numbers[0]*numbers[1]);
});
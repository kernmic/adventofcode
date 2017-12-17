let advent10 = require("../10/10.2.js");

let countSetBits = (input) => {
    let count = 0;
    for(let i = 1;i<=8;i*=2){
        if((input & i) == i){
            count++;
        }
    }
    return count;
}

require("fs").readFile("captcha", "utf8", (err, keyString) => {
    let squaresUsed = 0;
    for(let i = 0;i<128;i++){
        let knotHash = advent10.getKnotHash(keyString+"-"+i);
        knotHash = knotHash.split("").map(e => parseInt(e,16));
        squaresUsed +=knotHash.reduce((acc,val) => {
            return acc + countSetBits(val);
        },0);
    }

    console.log(squaresUsed);

});
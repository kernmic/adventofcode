let advent10 = require("../10/10.2.js");

let getBinaryArray = (input) => {
    let binary = [];
    for(let i = 1;i<=8;i*=2){
        if((input & i) == i){
            binary.splice(0,0,1);
        }else{
            binary.splice(0,0,0);
        }
    }
    return binary;
}

require("fs").readFile("captcha", "utf8", (err, keyString) => {
    let matrix = [],groupCount = 0;
    for(let i = 0;i<128;i++){
        matrix[i] = [];
        advent10.getKnotHash(keyString+"-"+i).split("").map(e => parseInt(e,16)).forEach(e => {
            matrix[i] = matrix[i].concat(getBinaryArray(e));
        });
    }

    let traverse = (x,y) => {
        if(!matrix[x] || !matrix[x][y]){
            return;
        }
        if(matrix[x][y] == 1){
            matrix[x][y] = -1;
            traverse(x+1,y);
            traverse(x-1,y);
            traverse(x,y+1);
            traverse(x,y-1);
        }
    }

    for(let x = 0;x<128;x++){
        for(let y = 0;y<128;y++){
            if(matrix[x][y] == 1){
                groupCount++;
                traverse(x,y);
            }
        }
    }

    console.log(groupCount);
});
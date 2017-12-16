let _ = require("lodash");
require("fs").readFile("captcha", "utf8", (err, instructions) => {

    instructions = instructions.split(",");
    let letters = _.range(97,97+16).map(e => String.fromCharCode(e));

    let spin = (offset,list) => {
        return list.slice(list.length-offset,list.length).concat(list.slice(0,list.length-offset));
    }

    let swap = (idx1, idx2, list) => {
        let tmp = list[idx1];
        list[idx1] = list[idx2];
        list[idx2] = tmp;
        return list;
    }

    let exchange = (params, list) => {
        let indices = params.split("/");
        return swap(indices[0],indices[1],list);
    }

    let partner = (params, list) => {
        let programs = params.split("/");
        return swap(list.indexOf(programs[0]),list.indexOf(programs[1]),list);
    }

    let commands = {
        "s": spin,
        "x": exchange,
        "p": partner
    }

    let times = 1000000000;
    let cycleDetector = [];
    for(let i = 0;i<times;i++){
        instructions.forEach(instruction => {
            letters = commands[instruction[0]](instruction.substr(1),letters);
        });
        let from = letters.join("");

        if(!cycleDetector[from]){
            cycleDetector[from] = i;
            continue
        }

        let cycle = i - cycleDetector[from];
        for(let i = 2;i<times-Math.floor(times/cycle)*cycle;i++){
            instructions.forEach(instruction => {
                letters = commands[instruction[0]](instruction.substr(1),letters);
            });
        }
        break;
    }


    console.log(letters.join(""));
});
let fs = require("fs");
let programMap = [];

let mapProgram = (programString) => {
    let obj = {};
    obj.name = programString.split(/\s/)[0];
    obj.weight = Number(programString.split(/\s/)[1].replace("(","").replace(")",""));
    obj.children = programString.split("->")[1];
    obj.children = obj.children ? obj.children.split(",").map(dep => dep.trim()) : obj.children;
    Object.defineProperty(obj, 'siblings', {
        get: () => obj.ancestor ? obj.ancestor.children.filter(sibl => sibl != obj.name): []
    });
    return obj;
}

let getTowerWeight = (program, programMap) => {
    if(!program.children){
        return program.weight;
    }
    return program.children.reduce((acc, val) => {
        return acc + getTowerWeight(programMap[val],programMap);
    },program.weight);
}

let getDepth = (program) => {
    if(!program.ancestor){
        return 1;
    }
    return getDepth(program.ancestor) + 1;
}

let getRoot = (program) => !program.ancestor ? program : getRoot(program.ancestor);

fs.readFile("captcha", "utf8", (err, data) => {

    data.split("\n").map(program => mapProgram(program)).map(function(program){
        this[program.name] = program;
        return program;
    },programMap).map(function(program){
        program.towerWeight = program.children ? getTowerWeight(program,programMap) : program.weight;
        return program;
    },programMap).filter(program => program.children).forEach(program => {
        program.children.forEach(child => {
            programMap[child].ancestor = program;
        })
    });

    let deepestUnbalanced = Object.values(programMap).filter(program => {
        return program.siblings.length > 1 && program.siblings.every(dependency => {
            return programMap[dependency].towerWeight != program.towerWeight;
        })
    }).map(e => {
        e.depth = getDepth(e);
        return e;
    }).sort((a,b) => b.depth - a.depth).find(x=>true);

    console.log(deepestUnbalanced.weight + programMap[deepestUnbalanced.siblings[0]].towerWeight - deepestUnbalanced.towerWeight);

});

let fs = require("fs");
let programMap = [];

let mapProgram = (programString) => {
    let obj = {};
    obj.name = programString.split(/\s/)[0];
    obj.weight = Number(programString.split(/\s/)[1].replace("(","").replace(")",""));
    obj.children = programString.split("->")[1];
    obj.children = obj.children ? obj.children.split(", ").map(dep => dep.trim()) : obj.children;
    return obj;
}

let getRoot = (program) => !program.ancestor ? program : getRoot(program.ancestor);

fs.readFile("captcha", "utf8", (err, data) => {
    data.split("\n").map(program => mapProgram(program)).map(function(program){
        this[program.name] = program;
        return program;
    },programMap).filter(program => program.children).forEach(program => {
        program.children.forEach(dependency => {
            programMap[dependency].ancestor = program;
        })
    });
    console.log(getRoot(Object.values(programMap).find(x=>true)).name);
});

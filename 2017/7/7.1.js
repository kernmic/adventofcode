let fs = require("fs");
let programMap = [];


fs.readFile("captcha", "utf8", (err, data) => {
    data.split("\n").map(function(program){
        let obj = {};
        obj.name = program.split(/\s/)[0];
        obj.weight = Number(program.split(/\s/)[1].replace("(","").replace(")",""));
        obj.dependencies = program.split("->")[1];
        obj.dependencies = obj.dependencies ? obj.dependencies.split(", ").map(dep => dep.trim()) : obj.dependencies;
        this[obj.name] = obj;
        return obj;
    },programMap).forEach(program => {
        if(!program.dependencies){
            return;
        }
        program.dependencies.forEach(dependency => {
            programMap[dependency].ancestor = program;
        })
    });

    let root = Object.values(programMap).find(program => !program.hasOwnProperty("ancestor"));

    console.log(root.name);
});

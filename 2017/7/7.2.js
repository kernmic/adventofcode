let fs = require("fs");
let programMap = [];


fs.readFile("captcha", "utf8", (err, data) => {
    data = "pbga (66)\n" +
        "xhth (57)\n" +
        "ebii (61)\n" +
        "havc (66)\n" +
        "ktlj (57)\n" +
        "fwft (72) -> ktlj, cntj, xhth\n" +
        "qoyq (66)\n" +
        "padx (45) -> pbga, havc, qoyq\n" +
        "tknk (41) -> ugml, padx, fwft\n" +
        "jptl (61)\n" +
        "ugml (68) -> gyxo, ebii, jptl\n" +
        "gyxo (61)\n" +
        "cntj (57)";

    data.split("\n").map(function(program){
        let obj = {};
        obj.name = program.split(/\s/)[0];
        obj.weight = Number(program.split(/\s/)[1].replace("(","").replace(")",""));
        obj.dependencies = program.split("->")[1];
        obj.dependencies = obj.dependencies ? obj.dependencies.split(", ").map(dep => dep.trim()) : obj.dependencies;
        this[obj.name] = obj;
        return obj;
    },programMap).map(function(program){
        if(!program.dependencies){
            return program;
        }
        program.dependencyWeight = program.dependencies.reduce((acc,val) => {
           return acc + programMap[val].weight;
        },0);
        program.totalWeight = program.dependencyWeight + program.weight;
        return program;
    },programMap).forEach(program => {
        if(!program.dependencies){
            return;
        }
        program.dependencies.forEach(dependency => {
            programMap[dependency].ancestor = program;
        })
    });

    let unbalanced = Object.values(programMap).find(program => {
        if(!program.ancestor){
            return false;
        }
        return !program.ancestor.dependencies.every(dependency => {
            return programMap[dependency].totalWeight == program.ancestor.dependencies[0].totalWeight;
        })
    });

    console.log(unbalanced);

});

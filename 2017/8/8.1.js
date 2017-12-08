let fs = require("fs");

let replaceOperators = (register) => {
    return register.replace(/\sinc\s/," += ").replace(/\sdec\s/," -= ");
};

let initRegisters = (register) => {
    let name = register[0].split(/\s/)[0];
    let command = ""+name+" = 0;";
    register[2] = name;
    eval(command);
    return register;
}

fs.readFile("captcha", "utf8", (err, data) => {
    let registerMap = [];
    let biggestValue = data.split("\n")
        .map(register => register.split(/\sif\s/))
        .map(register => initRegisters(register))
        .map(register => register.map(reg => replaceOperators(reg)))
        .map(register => {
            if(eval(register[1])){
                registerMap[register[2]] = eval(register[0]);
            }
            return register;
        }).reduce((acc, val) => {
            return registerMap[val[2]] > acc ? registerMap[val[2]] : acc;
        }, 0);
        console.log(biggestValue);
});

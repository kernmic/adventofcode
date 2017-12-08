require("fs").readFile("captcha", "utf8", (err, data) => {
    let registerMap = [];
    console.log(data.split("\n")
        .map(register => register.split(/\sif\s/))
        .map(register => {
            register[2] = register[0].split(/\s/)[0];
            eval(""+register[2]+" = 0;");
            return register;
        })
        .map(register => register.map(reg => reg.replace(/\sinc\s/," += ").replace(/\sdec\s/," -= ")))
        .map(register => {
            if(eval(register[1])) registerMap[register[2]] = eval(register[0]);
            return registerMap[register[2]];
        }).reduce((acc, val) => {
            return val > acc ? val : acc;
        }, 0));
});
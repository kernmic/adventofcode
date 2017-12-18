
let memory = {};
let registers = {};
let recovered = false;

let getRegisterValue = (registerId) => {
    if(!Number.isInteger(Number(registerId)) && registers[registerId] === undefined){
        registers[registerId] = {
            id: registerId,
            val: 0
        }
    }
    return registers[registerId] !== undefined ? Number(registers[registerId].val) : undefined;
}

let snd = (register, val) => {
    console.log(register);
    console.log("play sound with "+register.val+" Hz");
    memory.lastSound = register.val;
}

let set = (register, val) => {
    let regValue = getRegisterValue(val);
    register.val = regValue !== undefined ? regValue : Number(val);
    return register;
}

let add = (register, val) => {
    let regValue = getRegisterValue(val);
    register.val += regValue !== undefined ? regValue : Number(val);
    return register;
}

let mul = (register, val) => {
    let regValue = getRegisterValue(val);
    register.val *= regValue !== undefined ? regValue : Number(val);
    return register;
}

let mod = (register, val) => {
    let regValue = getRegisterValue(val);
    register.val %= regValue !== undefined ? regValue : Number(val);
    return register;
}

let rcv = (register, val) => {
    if(register.val !== 0){
        console.log("Recover "+memory.lastSound);
        recovered = true;
    }
    return register;
}

let commands = {
    mod: mod,
    rcv: rcv,
    mul: mul,
    add: add,
    set: set,
    snd: snd
}

require("fs").readFile("captcha", "utf8", (err, assembly) => {

    assembly = assembly.split(/\n/).map(e => {
        return {
            cmd: e.split("").slice(0,3).join(""),
            reg: e.split("").slice(4,5).join(""),
            val: e.split("").slice(6,e.length).join(""),
        }
    });

    let pos = 0;
    while(pos<assembly.length && !recovered){
        let cmd = assembly[pos];

        if(registers[cmd.reg] === undefined){
            registers[cmd.reg] = {
                id: cmd.reg,
                val: 0
            };
        }

        if(cmd.cmd === 'jgz'){
            if(registers[cmd.reg].val){
                pos += Number(cmd.val);
            }else{
                pos++;
            }
            continue;
        }
        console.log(cmd);
        console.log(registers[cmd.reg]);
        registers[cmd.reg] = commands[cmd.cmd](registers[cmd.reg],cmd.val);
        pos++;
    }

    console.log(memory.lastSound);
});
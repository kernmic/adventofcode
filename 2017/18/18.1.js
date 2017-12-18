
let memory = {};
let registers = {};
let recovered = false;

let snd = (register, val) => {
    console.log(register);
    console.log("play sound with "+register.val+" Hz");
    memory.lastSound = register.val;
}

let set = (register, val) => {
    register.val = Number(val);
    return register;
}

let add = (register, val) => {
    register.val += Number(val);
    return register;
}

let mul = (register, val) => {
    if(registers[val] === undefined){
        registers[val] = {
            val: 0
        }
    }
    register.val *= registers[val].val;
    return register;
}

let mod = (register, val) => {
    register.val = register.val%Number(val);
    if(isNaN(register.val)) register.val = 0;
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

let jgz = ()=> {
    // jgz X Y jumps with an offset of the value of Y,
    //     but only if the value of X is greater than zero.
    // (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
}

require("fs").readFile("captcha", "utf8", (err, assembly) => {

    // assembly = "set a 1\n" +
    //     "add a 2\n" +
    //     "mul a a\n" +
    //     "mod a 5\n" +
    //     "snd a\n" +
    //     "set a 0\n" +
    //     "rcv a\n" +
    //     "jgz a -1\n" +
    //     "set a 1\n" +
    //     "jgz a -2";

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
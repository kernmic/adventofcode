let fs = require("fs");

fs.readFile("captcha", "utf8", (err, data) => {
    let instructions = data.split("\n");
    let pointer = 0;
    let steps = 0;

    while(pointer > -1 && pointer < instructions.length){
        let offset = Number(instructions[pointer]);
        instructions[pointer] = offset + 1;
        pointer = pointer + offset;
        steps++;
    }

    console.log(steps);
});


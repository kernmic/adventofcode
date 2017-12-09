require("fs").readFile("captcha", "utf8", (err, stream) => {
    let garbageStack = [], ignoreStack = [], garbageCount = 0;

    stream.split("").map(char => {
        if (ignoreStack.length) ignoreStack.pop();
        else if (char === '<' && !garbageStack.length) garbageStack.push(char);
        else if (char === '!') ignoreStack.push(char);
        else if(char === '>') garbageStack.pop();
        else if(!garbageStack.length) return char;
        else if(garbageStack.length) garbageCount++;
        return;
    });

    console.log(garbageCount);

});
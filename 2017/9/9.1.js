require("fs").readFile("captcha", "utf8", (err, stream) => {
    let garbageStack = [], ignoreStack = [], depth = 1, score = 0;

    stream.split("").map(char => {
        if (ignoreStack.length) ignoreStack.pop();
        else if (char === '<' && !garbageStack.length) garbageStack.push(char);
        else if (char === '!') ignoreStack.push(char);
        else if(char === '>') garbageStack.pop();
        else if(!garbageStack.length) return char;
        return;
    }).filter(elem => elem !== undefined).map(char => {
        if(char === '{'){
            score += depth;
            depth++;
        }
        if(char === '}'){
            depth--;
        }
    });

    console.log(score);

});
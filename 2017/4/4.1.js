let fs = require("fs");

let isPassphraseValid = (input) => {
    input = input.split(/\s/);
    let wordSet = new Set(input);
    return wordSet.size == input.length ? true : false;
}

let getNumberOfValidPassphrases = (passphrases) =>{
    return passphrases.reduce((acc, val) => {
        return acc + (isPassphraseValid(val) ? 1 : 0);
    }, 0);
}

fs.readFile("captcha", "utf8", (err, data) => {
    let passphrases = data.split("\n");
    console.log(getNumberOfValidPassphrases(passphrases));
});


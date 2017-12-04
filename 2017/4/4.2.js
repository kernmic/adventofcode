let fs = require("fs");

let sameLettersInWords = (word1, word2) => {
    return JSON.stringify(word1.split("").sort()) === JSON.stringify(word2.split("").sort());
}

let isPassphraseValid = (input) => {
    let anagrams = false;
    input.split(/\s/).forEach((word, index, array) => {
        array.forEach((innerWord, wordIndex) => {
            if(wordIndex != index){
                if(sameLettersInWords(word, innerWord)){
                    anagrams = true;
                }
            }
        });

    });
    return !anagrams;
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


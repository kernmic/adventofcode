let fs = require("fs");

fs.readFile("captcha", "utf8", (err, data) => {
    let result = data.split("").filter((element, index, array) => {
        let step = 1;
        let next = (index + step) - array.length;
        return (next >= 0) ?  element == array[next] : element == array[index + step];
    }).reduce((acc, val) => {
        return acc + Number(val);
    }, 0);
    console.log(result);
});





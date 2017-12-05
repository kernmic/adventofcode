let fs = require("fs");

fs.readFile("captcha", "utf8", (err, data) => {
    let result = data.split("\n").map(row => {
        let entries = row.split("\t");
        let result = 0;
        entries.forEach((entry, index) => {
            entries.forEach((inner_entry, inner_index) => {
                if(Number(entry) % Number(inner_entry) == 0 && index !== inner_index){
                    result = Number(entry) / Number(inner_entry);
                }
            });
        });
        return result;
    })
    .reduce((acc, val) => {
        return acc + Number(val);
    }, 0);
    console.log(result);
});

let _ = require("lodash");
require("fs").readFile("captcha", "utf8", (err, lengths) => {
    lengths = lengths.split(",");
    let currentPosition = 0, skipSize = 0, numbers = _.range(255);

    console.log(numbers);

});
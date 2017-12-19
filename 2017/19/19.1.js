require("fs").readFile("captcha", "utf8", (err, networkDiagram) => {
    // networkDiagram = "     |          \n" +
    //     "     |  +--+    \n" +
    //     "     A  |  C    \n" +
    //     " F---|----E|--+ \n" +
    //     "     |  |  |  D \n" +
    //     "     +B-+  +--+ \n";
    let node_char = "+";
    let vertical_char = "|";
    let horizontal_char = "-";
    let dirs = {
        d: {
            row: 1,
            col: 0,
            con: 'u'
        },
        r: {
            row: 0,
            col: 1,
            con: 'l'
        },
        l: {
            row: 0,
            col: -1,
            con: 'r'
        },
        u: {
            row: -1,
            col: 0,
            con: 'd'
        }
    };
    let dir = dirs["d"];
    let visitor = [];
    networkDiagram = networkDiagram.split(/\n/).map(e => e.split(""));
    let start = networkDiagram[0].indexOf(vertical_char);

    for(let row = 0,col = start;row<networkDiagram.length;row+=dir.row,col+=dir.col){
        if(networkDiagram[row][col].charCodeAt(0) > 64 && networkDiagram[row][col].charCodeAt(0) < 91) visitor.push(networkDiagram[row][col]);
        if(networkDiagram[row][col] !== node_char) continue;
        let oldDir = dir;
        for(let key in dirs){
            if(!networkDiagram[row + dirs[key].row]) continue;
            let nextChar = networkDiagram[row + dirs[key].row][col + dirs[key].col];
            if(!nextChar || dirs[key] == dirs[dir.con]) continue;
            if(nextChar == vertical_char || nextChar == horizontal_char){
                dir = dirs[key];
                break;
            }
            if(nextChar.charCodeAt(0) > 64 && nextChar.charCodeAt(0) < 91){
                dir = dirs[key];
                break;
            }
        }
        if(oldDir == dir){
            break;
        }
    }

    console.log(visitor.join(""));
});
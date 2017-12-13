let isCaught = (tick,range) => {
    return (tick-1)%((range-1) * 4) == 0;
}

let getSeverity = (tick,layers) => {
    let visitCount = 0;
    let severity = 0;
    for(let depth = 0;visitCount<Object.keys(layers).length;depth++,tick+=2){
        let range = layers[depth];
        if(range){
            visitCount++;
        }else{
            continue;
        }
        if(isCaught(tick,range) || isCaught(tick+1,range)){
            severity += (range*depth);
        }
    }
    return severity;
}

require("fs").readFile("captcha", "utf8", (err, layers) => {

    layers ="0: 3\n" +
        "1: 2\n" +
        "4: 4\n" +
        "6: 4";


    layers = layers.split(/\n/).map(layer => layer.split(":").map(el => Number(el))).reduce((acc,val) => {
        acc[val.shift()] = val;
        return acc;
    },new Object());

    // for(let depth = 0;visitCount<Object.keys(layers).length;depth++,tick+=2){
    //     let range = layers[depth];
    //     if(range){
    //         visitCount++;
    //     }else{
    //         continue;
    //     }
    //     if(isCaught(tick,range) || isCaught(tick+1,range)){
    //         severity += (range*depth);
    //     }
    // }

    for(let i = 0;true;i++){
        let severity = getSeverity(i,layers);
        if(severity == 0){
            console.log(i);
            break;
        }

    }


});
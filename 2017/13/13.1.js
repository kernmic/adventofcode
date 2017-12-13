require("fs").readFile("captcha", "utf8", (err, layers) => {
    let visitCount = 0;
    let severity = 0;
    let tick = 0;
    let isCaught = (tick,range) => {
        return (tick-1)%((range-1) * 4) == 0;
    }

    layers = layers.split(/\n/).map(layer => layer.split(":").map(el => Number(el))).reduce((acc,val) => {
        acc[val.shift()] = val;
        return acc;
    },new Object());

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

    console.log(severity);
});
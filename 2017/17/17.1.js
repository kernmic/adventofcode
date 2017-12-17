let steps = 359;
let buffer = [];

for(let i=0,pos=0;i<=2017;i++){

    pos += steps;
    pos = pos%buffer.length;
    pos = isNaN(pos) ? 0 : pos + 1;
    buffer.splice(pos,0,i);

}

console.log(buffer[(buffer.indexOf(2017)+1)%buffer.length]);
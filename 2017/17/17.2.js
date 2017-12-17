let steps = 359;
let bufferlength = 0;
let times = 50000000;
let val = 0;

for(let i=0,pos=0;i<=times;i++){

    pos += steps;
    pos = pos%bufferlength;
    pos = isNaN(pos) ? 0 : pos + 1;
    bufferlength++;
    val = pos == 1 ? i : val;

}
console.log(val);

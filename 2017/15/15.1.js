let values = [634, 301], gens = [16807, 48271], divisor = 2147483647, matches = 0;
let mask = Math.pow(2,16) - 1;

for(let i = 0;i<40000000;i++){
    values = values.map((value,index) => {
        return (value*gens[index])%divisor;
    });
    if(values.map(val => val & mask).reduce((acc,val) => {
        return (acc === val) ? acc : false;
    })){
        matches++;
    }
}

console.log(matches);
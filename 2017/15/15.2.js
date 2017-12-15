let values = [634, 301], gens = [16807, 48271], rules=[4,8], divisor = 2147483647, matches = 0;
let mask = Math.pow(2,16) - 1;

for(let i = 0;i<5000000;i++){
    values = values.map((value,index) => {
        do
            value = (value*gens[index])%divisor;
        while(value%rules[index]!=0);
        return value;
    });

    if(values.map(val => val & mask).reduce((acc,val) => {
        return (acc === val) ? acc : false;
    })){
        matches++;
    }
}

console.log(matches);
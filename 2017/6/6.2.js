let fs = require("fs");

let getBankToDistribute = (memoryBanks) => {
    let largestValue = memoryBanks.reduce((acc, val) => {
        return val > acc ? val : acc;
    },0);
    return memoryBanks.findIndex(element => element == largestValue);
}

let distributeBank = (bank, memoryBanks) => {
    let distribute = memoryBanks[bank];
    memoryBanks[bank] = 0;
    while(distribute > 0){
        bank++;
        bank = (bank == memoryBanks.length) ? 0 : bank;
        memoryBanks[bank]++;
        distribute--;
    }
};

fs.readFile("captcha", "utf8", (err, data) => {
    let memoryBankHistory = [];
    let memoryBanks = data.split("\t").map(val => Number(val));
    let steps = 0;
    while(!memoryBankHistory.some(el => {
        return JSON.stringify(el)==JSON.stringify(memoryBanks);
    })){
        memoryBankHistory.push(memoryBanks.slice());
        distributeBank(getBankToDistribute(memoryBanks),memoryBanks);
        steps++;
    }

    console.log(steps - memoryBankHistory.findIndex(el => {
        return JSON.stringify(el)==JSON.stringify(memoryBanks);
    }));
});

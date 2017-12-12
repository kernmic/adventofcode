require("fs").readFile("captcha", "utf8", (err, links) => {
    links = links.split(/\n/)
        .map(link => link.split("<->").join().split(",").map(el => Number(el)))
        .reduce((acc,val) => {
            val.shift();
            acc.push(val);
            return acc;
        },[])

    let groups = new Set(links.map((link,groupId) => {
        let group = new Set();
        let groupSizeHistory = -1;
        while(groupSizeHistory != group.size){
            groupSizeHistory = group.size;
            group = links.reduce((acc,val, index) => {
                if(!acc.size && index == groupId)return new Set(val);
                if(acc.has(index) || val.some(el => acc.has(el))){
                    val.forEach(el => acc.add(el));
                }
                return acc;
            },group);
        }
        return JSON.stringify(Array.from(group).sort());
    }));

    console.log(groups.size);
});
require("fs").readFile("captcha", "utf8", (err, particles) => {
    let ticks = 23;
    let idxCount = 0;
    let pos = ['p', 'v', 'a'].reduce(function (acc, attr) {
        acc[attr] = {
            x: idxCount++,
            y: idxCount++,
            z: idxCount++
        };
        return acc;
    }, {p: {}, v: {}, a: {}});

    particles = particles.split(/\n/).map(e => {
        return e.replace("a", "")
            .replace("v", "")
            .replace("p", "")
            .split(/\s/).join("")
            .split("=").join("")
            .split("<").join("")
            .split(">").join("")
            .split(",").map(e => Number(e));
    });

    let oldEl = 0, newEl = 1, counter =20;
    while (newEl != oldEl || counter) {
        let history = new Set();
        let duplicates = [];
        newEl = particles.length;
        particles = particles.map(particle => {
            ['x', 'y', 'z'].forEach(dir => {
                particle[pos.v[dir]] += particle[pos.a[dir]];
                particle[pos.p[dir]] += particle[pos.v[dir]];
            });
            let posVec = particle.slice(0,3).join(",");
            if(history.has(posVec)){
                duplicates.push(posVec);
            }
            history.add(posVec);
            return particle;
        }).filter(particle => duplicates.indexOf(particle.slice(0,3).join(",")) == -1);
        oldEl = particles.length;
        if(oldEl == newEl){
            counter--;
        }
    }
    console.log(particles.length);

});
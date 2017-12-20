require("fs").readFile("captcha", "utf8", (err, particles) => {
    let ticks = 10000;
    let idxCount = 0;
    let pos = ['p', 'v', 'a'].reduce(function (acc, attr) {
        acc[attr] = {
            x: idxCount++,
            y: idxCount++,
            z: idxCount++
        };
        return acc;
    }, {p: {}, v: {}, a: {}});

    // particles = "p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>\n" +
    //     "p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0> ";
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

    for (let i = 0; i < ticks; i++) {
        particles.map(particle => {
            ['x', 'y', 'z'].forEach(dir => {
                particle[pos.v[dir]] += particle[pos.a[dir]];
                particle[pos.p[dir]] += particle[pos.v[dir]];
            });
            return particle;
        });
    }

    let closestParticle = particles.reduce((acc, val, idx) => {
        let distance = Math.abs(val[pos.p.x]) + Math.abs(val[pos.p.y]) + Math.abs(val[pos.p.z]);
        if(!acc || acc.distance > distance){
            return {
                idx: idx,
                distance: distance
            }
        }
        return acc;
    }, null);

    console.log(closestParticle);

});
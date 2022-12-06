const fs = require('fs');

const fillInterval = ([start, end]) => {
    let res = [];
    for(let i=parseInt(start); i<=parseInt(end); i++){
        res.push(i);
    }
    return res;
};

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;

    const pairs = data.toString()
        .split("\n")
        .map(line => line.split(","))
        .map(pair => pair.map(elf => fillInterval(elf.split("-"))));

    // Part 1
    const fullyOverlap = ([first, second]) => first.every(isle => second.includes(isle));
    const fullyOverlappingAssignments = pairs.filter((elves) => 
        fullyOverlap( elves.sort((a,b)=>a.length-b.length) )
    );
    console.log('Part 1', fullyOverlappingAssignments.length);

    //Part 2
    const anyOverlappingAssignments = pairs.filter(([first, second]) => first.some(isle => second.includes(isle)));
    console.log('Part 2', anyOverlappingAssignments.length);
});


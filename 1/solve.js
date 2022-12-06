const fs = require('fs');

const SUM = (a,c) => a+parseInt(c);

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const blocks = data.toString().split("\n\n");
    const elves = blocks.map( (calories) => calories.split("\n").reduce(SUM, 0) );

    //Part 1
    const maxCount = Math.max(...elves);
    console.log('Part 1: ', maxCount );

    //Part 2
    const top3sum = elves.sort((a,b) => a-b).reverse().slice(0,3).reduce(SUM, 0);
    console.log('Part 2: ', top3sum);
});


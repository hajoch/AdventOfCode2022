const fs = require('fs');

// Methods
const copy = (stacks) => stacks.map(s=>[...s]);
const readTop = (stacks) => stacks
    .filter(stack => stack.length>0)
    .reduce((acc, stack) => acc+stack[stack.length-1],'');

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    
    const lines = data.toString().split("\n");
    const stackData = lines.splice(0,9).map(l =>l.split("")).reverse();
    const stackIndices = stackData.splice(0,1)[0];

    // Set up initial warehouse
    const warehouse = new Array(10).fill(null).map( () => [] ); //Adding an extra stack to avoid subtracting 1 from every index
    stackIndices.forEach( (val, index) => {
        if(' ' != val) {
            let stackIndex = parseInt(val);
            stackData.forEach( line => {
                if(line[index] != ' ') {
                    warehouse[stackIndex].push(line[index]);
                }
            });
        }
    });

    // Structure instruction set
    const instructions = lines.map(line => 
        line.split(" ")
            .filter(token => !isNaN(token))
            .map(num=>parseInt(num))
    );
    instructions.shift(); //Remove empty line

    let stacks;
    //Part 1
    stacks = copy(warehouse);
    instructions.forEach(([amount,source,destination]) => {
        //Pop and push on at the time
        [...Array(amount)].forEach(()=> stacks[destination].push(stacks[source].pop()))
    });
    console.log('Part 1:', readTop(stacks));

    // Part 2
    stacks = copy(warehouse);
    instructions.forEach(([amount,source,destination]) => {
        let sourceSize = stacks[source].length;
        // Splice all the crates, then push to the top
        stacks[destination].push(...stacks[source].splice(sourceSize-amount, sourceSize));
    });
    console.log('Part 2:', readTop(stacks));
});


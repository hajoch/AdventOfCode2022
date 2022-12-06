const fs = require('fs');

// Methods
const getCompartments = (line) => {
    let middleIdx = Math.floor(line.length/2);
    return [line.slice(0,middleIdx), line.slice(middleIdx, line.length)];
}
const findDuplicates = ([first, second, ...rest]) => {
    let dupl = first.split("").filter( ch => second.split("").includes(ch)).join("");
    return rest.length ? findDuplicates([dupl,...rest]) : dupl;
}; 
const getPriority = (ch) => {
    let code = ch.charCodeAt(0);
    return (code > 96 ? code-96 : code-38);
}

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const rugsacks = data.toString().split("\n");

    //Part 1
    const duplicateSum = rugsacks
        .map( line => findDuplicates(getCompartments(line)))
        .reduce( (acc, dupl) => acc + getPriority(dupl), 0);
    console.log('Part 1',duplicateSum);

    // Part 2
    const groups = [];
    while (rugsacks.length > 0) {
        groups.push(rugsacks.splice(0, 3));
    }
    const groupsSum = groups.reduce((acc, group) => acc + getPriority(findDuplicates(group)), 0);
    console.log('Part 2', groupsSum);
});
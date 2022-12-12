const fs = require('fs');

const COPY = ({items, ...rest}) => Object.assign({items: [...items]}, rest);

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    // Set ut up the initial data structures
    const parseMonkey = ([number, items, operation, test, ifTrue, ifFalse]) => {
        let monkey = {
            id: number.split(/[\s:]+/)[1],
            items: items.split(": ")[1].split(",").map(i => parseInt(i)),
            operation: operation.split(" = ").pop(),
            divisibleBy: parseInt(test.split(" ").filter(Boolean).pop()),
            ifMonkey: parseInt(ifTrue.split(" ").filter(Boolean).pop()),
            elseMonkey: parseInt(ifFalse.split(" ").filter(Boolean).pop()),
            inspections: 0
        };
        return monkey;
    };
    const initialState = data.toString().split("\n\n").map((raw) => parseMonkey(raw.split("\n")));

    // They're all primes, so there's no need for any more advanced calculation
    const LCM = initialState.reduce((product, monkey) => product*monkey.divisibleBy, 1);

    // Simulate the monkey inspecting all its items
    const inspect = (monkey, monkeys, reliefDivider) => {
        while(monkey.items.length) {
            monkey.inspections++;
            let item = monkey.items.shift();
            let equation = monkey.operation.replaceAll('old', item+'');
            let newItem = Math.floor(eval(equation)/reliefDivider) % LCM;
            let truthy = (newItem % monkey.divisibleBy === 0);
            monkeys[(truthy ? monkey.ifMonkey : monkey.elseMonkey)].items.push(newItem);
        }
    };

    // Set the parameters of the rounds.
    const monkeyBusiness = (rounds, reliefDivider) => {
        let monkeys = initialState.map(COPY);
        for(let round=0; round<rounds; round++) {
            monkeys.forEach(monkey => inspect(monkey, monkeys, reliefDivider));
        }
        let [first, second] = monkeys.sort((a,b) => b.inspections - a.inspections);
        return first.inspections*second.inspections;
    }

    // Part 1 
    console.log('Part 1', monkeyBusiness(20, 3));

    // Part 2 
    console.log('Part 2', monkeyBusiness(10000, 1));
});
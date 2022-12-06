const fs = require('fs');

const SUM = (a,c) => a+c;
// Outcome table. Key represents the opponent move, index the outcome, value of index the move played for that outcome
const graph = { 
    0: [1,0,2],
    1: [2,1,0],
    2: [0,2,1]
};

class Game {
    constructor(input) {
        const [a,b] = input.split(" ");
        this.first = a.charCodeAt(0) - 65; // A
        this.second = b.charCodeAt(0) - 88; // X
    }
    rig(){
        //Interpret the second parameter as the outcome, and find the desired hand to play
        this.second = [...graph[this.first]].reverse()[this.second];
        return this;
    }
    get score() {
        let outcome = graph[this.second].indexOf(this.first); // win = 2, draw = 1, lose = 0
        let handScore = this.second + 1; // Rock = 1, Paper = 2, Scissors = 3
        return (outcome * 3) + handScore;
    }
}

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const gamesplayed = data.toString().split("\n").map( (row) => new Game(row));
    
    // Part 1
    const totalScore = gamesplayed.map( g => g.score).reduce(SUM, 0);
    console.log('Part 1', totalScore);

    // Part 2
    const totalScoreRigged = gamesplayed.map(g => g.rig().score).reduce(SUM, 0);
    console.log('Part 2', totalScoreRigged);
});

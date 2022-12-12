const fs = require('fs');

const translateDir = (direction) => {
    switch (direction.toString()) {
        case [1,0].toString() : return '>';
        case [-1,0].toString() : return '<';
        case [0,-1].toString() : return '^';
        case [0,1].toString() : return 'v';
    }
}
const moves = [
    [1,0],
    [-1,0],
    [0,-1],
    [0,1]
];


fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const heightmap = data.toString().split("\n").map((row) => row.split(""));

    const maxX = heightmap[0].length;
    const maxY = heightmap.length;
    const distances = {};
    const visual = new Array(maxY)
        .fill(null)
        .map(() => new Array(maxX).fill('.'));

    const possibleMoves = ([x,y]) => {
        let height = getHeight([x,y]);
        return moves.map(([xx, yy]) => [[x+xx, y+yy], translateDir([xx,yy])]).filter(([destination]) => {
            if(destination[0] < 0 || destination[0] > maxX-1 || destination[1]< 0 || destination[1]>maxY-1) {
                return false
            }
            return ((getHeight(destination) - height) <= 1);
        });
    }
    const getHeight = ([x,y]) => {
        let letter = heightmap[y][x];
        if(letter === 'S') letter = 'a';
        if(letter === 'E') letter = 'z';
        return letter.charCodeAt(0);
    }
    
    const search = (from, position, distanceTraveled, symbol) => {
        let key = position.toString();
        //Part 2 - Does not evaluate all starting positions, but works for the input
        if(heightmap[position[1]][position[0]] === 'a') distanceTraveled = 0;

        if(distances.hasOwnProperty(key)){
            if(distances[key] > distanceTraveled) {
                distances[key] = distanceTraveled;
                if(from) visual[from[1]][from[0]] = symbol;
            } else {
                return;
            }
        } else {
            distances[key] = distanceTraveled;
            if(from) visual[from[1]][from[0]] = symbol;
        }
        let canMove = possibleMoves(position).filter(([dest]) => dest.toString() != from.toString());
        canMove.forEach(([destination, symbol]) => {
            let newDistance = distanceTraveled+1;
            search(position, destination, newDistance, symbol);
        });
    }

    let goal;
    let start;
    heightmap.forEach((row, y) => {
        let xE = row.findIndex(v => v === 'E');
        let xS = row.findIndex(v => v === 'S');
        if(xE != -1) { goal = [xE,y]; }
        if(xS != -1) { start = [xS,y]; }
    });

    search('', start, 0, 'O');

    const goalkey = distances[goal.toString()];
    console.log('Shortest Path', goalkey);
    console.log(heightmap[goal[1]][goal[0]]);
    visual.forEach(row => {
//        console.log(row.join(""));
    });
    // > 450
    // < 465
    //
});

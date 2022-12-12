const fs = require('fs');

const translateDir = (direction) => {
    switch (direction) {
        case 'R': return [1,0];
        case 'L': return [-1,0];
        case 'U': return [0,-1];
        case 'D': return [0,1];
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

    console.dir(heightmap);
    const maxX = heightmap[0].length;
    const maxY = heightmap.length;

    let s = [1,0];

    const distances = {};

    const visual = new Array(maxY).fill(new Array(maxX).fill('.'));

    const possibleMoves = ([x,y]) => {
        let height = getHeight([x,y]);
        return moves.map(([xx, yy]) => [x+xx, y+yy]).filter((destination) => {
            if(destination[0] < 0 || destination[0] > maxX-1 || destination[1]< 0 || destination[1]>maxY-1) {
                return false
            }
            return (Math.abs(height - getHeight(destination)) < 2);
        });
    }
    const getHeight = ([x,y]) => {
        let letter = heightmap[y][x];
        if(letter === 'S') letter = 'a';
        if(letter === 'E') letter = 'z';
        return letter.charCodeAt(0);
    }
    
    const search = (from, position, distanceTraveled) => {
        let key = position.toString();
        if(distances.hasOwnProperty(key)){
            if(distances[key] > distanceTraveled) distances[key] = distanceTraveled;
            else {
                return;
            }
        } else {
            distances[key] = distanceTraveled;            
        }
        let canMove = possibleMoves(position).filter((dest) => dest.toString() != from.toString());
        canMove.forEach(destination => {
            search(position, destination, ++distanceTraveled);
        });
    }
    search('', [0,0], 0);
    console.dir(distances);

    const goalkey = distances[[5,2].toString()];
    console.log('Part 1', goalkey);
    console.log(heightmap[2][5]);
});

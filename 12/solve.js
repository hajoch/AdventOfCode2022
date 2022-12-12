const fs = require('fs');

const moves = [ [1,0],[-1,0],[0,-1],[0,1] ];

const PART_2 = true; // Toggle part 2

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const heightmap = data.toString().split("\n").map((row) => row.split(""));
    const maxX = heightmap[0].length;
    const maxY = heightmap.length;

    // dic of the shortest paths
    const distances = {};

    const getHeight = ([x,y]) => {
        let letter = heightmap[y][x];
        if(letter === 'S') letter = 'a';
        if(letter === 'E') letter = 'z';
        return letter.charCodeAt(0);
    }
    const possibleMoves = ([x,y]) => {
        return moves.map(([xx, yy]) => [x+xx, y+yy]).filter((destination) => {
            if(destination[0] < 0 || destination[0] > maxX-1 || destination[1]< 0 || destination[1]>maxY-1) {
                return false
            }
            return ((getHeight(destination) - getHeight([x,y])) <= 1);
        });
    }
    
    const search = (from, position, distanceTraveled) => {
        let key = position.toString();
        //Part 2 - Does not evaluate all starting positions, but works for my input
        if(PART_2 && heightmap[position[1]][position[0]] === 'a') distanceTraveled = 0;

        if(distances.hasOwnProperty(key) && distances[key] <= distanceTraveled) return;        

        distances[key] = distanceTraveled;
        
        let canMove = possibleMoves(position).filter((dest) => dest.toString() != from.toString());
        canMove.forEach((destination) => {
            search(position, destination, (distanceTraveled+1));
        });
    }

    // Lots of ugliness but don't care, all tasks are solved
    let goal;
    let start;
    heightmap.forEach((row, y) => {
        let xE = row.findIndex(v => v === 'E');
        let xS = row.findIndex(v => v === 'S');
        if(xE != -1) { goal = [xE,y]; }
        if(xS != -1) { start = [xS,y]; }
    });

    // Do the search
    search('', start, 0, 'O');

    const distance = distances[goal.toString()];
    console.log('Shortest Path', distance);
});

const fs = require('fs');

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const moves = data.toString().split("\n").map((row) => row.split(" "));

    const head = { x:0,y:0 };
    const tail = { x:0,y:0 };
    const knots = [];
    for(let i=0; i<9;i++) {
        knots.push({ x:0,y:0 });
    }

    const tailVisited = new Set();

    const moveTail = () => {
        const distX = head.x - tail.x;
        const distY = head.y - tail.y;
        const shouldMove = Math.max(Math.abs(distX), Math.abs(distY)) > 1;
        if(shouldMove) {
            if(Math.abs(distX) > Math.abs(distY)) {
                tail.x = tail.x + (distX > 0 ? 1 : -1);
                tail.y = head.y;
            } else {
                tail.y = tail.y + (distY > 0 ? 1 : -1);
                tail.x = head.x;
            }
        }
        tailVisited.add(tail.x+'/'+tail.y);
    }

    const translateDir = (direction) => {
        switch (direction) {
            case 'R': return [1,0];
            case 'L': return [-1,0];
            case 'U': return [0,-1];
            case 'D': return [0,1];
        }
    }
    const move = ([direction, amount]) => {
        let [x, y] = translateDir(direction);
        for(let i=0; i<parseInt(amount);i++) {
            head.x = head.x+x;
            head.y = head.y+y;
            moveTail();
        }
    }


    moves.forEach( m => {
        move(m);
    });
    console.log('Part 1', tailVisited.size);

});
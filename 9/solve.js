const fs = require('fs');

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const moves = data.toString().split("\n").map((row) => row.split(" "));

    const head = { x:0,y:0 };
    const knots = [];
    for(let i=0; i<9;i++) {
        knots.push({ x:0,y:0 });
    }

    const tailVisited = new Set();

    const moveTail = (prev, knot) => {
        const distX = prev.x - knot.x;
        const distY = prev.y - knot.y;
        const shouldMove = Math.max(Math.abs(distX), Math.abs(distY)) > 1;
        if(shouldMove) {
            if(Math.abs(distX) > Math.abs(distY)) {
                knot.x = knot.x + (distX > 0 ? 1 : -1);
                knot.y = prev.y;
            } else {
                knot.y = knot.y + (distY > 0 ? 1 : -1);
                knot.x = prev.x;
            }
        }
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
            knots.forEach((knot, index) => {
                let prev = (index === 0 ? head : knots[index-1]);
                moveTail(prev, knot);
                if(index >= knots.length-1) {
                    tailVisited.add(knot.x+'/'+knot.y);
                }
            });
        }
    }

    let maxDir = 0;
    moves.forEach( m => {
        move(m);
        let currentMax = Math.max(Math.abs(head.x), Math.abs(head.y));
        if(currentMax > maxDir) maxDir = currentMax;
    });
    console.log(maxDir);
    console.log('Part 2', tailVisited.size);

/*
    let vis = new Array(maxDir+100).fill(null).map(()=> new Array(maxDir+100).fill('-'));
    console.dir(vis);
    tailVisited.forEach(item => {
        let [x, y] = item.split("/");
        vis[parseInt(y)+maxDir][parseInt(x)+maxDir] = '#';
    });
    vis.forEach(row => {
        console.log(row.join(''));
    });
*/
});
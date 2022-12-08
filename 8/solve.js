const fs = require('fs');

// Methods

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const rows = data.toString().split("\n").map((row) => row.split("").map(tree => parseInt(tree)));

    const getViews = (x, y) => {
        let row = [...rows[y]];
        let column = rows.map(row => row[x]);
        return [...getRowView(row, x), ...getRowView(column,y)];
    }

    const getRowView = (row, index)  => {
        let left = row.splice(0,index).reverse();
        row.shift();
        return [left, row];
    }

    const isVisible = (tree, x,y) => {
        let views = getViews(x,y);
        return views.some(view => {
            let visible = view.every(area => area < tree);
            return visible;
        });
    }

    // Part 1
    let numberOfVisibleTrees = 0;
    rows.forEach((row, y) => {
        row.forEach((tree, x) => {
            numberOfVisibleTrees += (isVisible(tree,x,y) ? 1 : 0);
        });
    });
    console.log('Part 1',numberOfVisibleTrees);

    // Part 2
    let highestScenicScore = 0;
    rows.forEach((row, y) => {
        row.forEach((tree, x) => {
            let scores = getViews(x,y).map((view) => {
                let score = view.findIndex(area => area >= tree);
                return score == -1 ? view.length : score;
            });
            let scenicScore = scores.reduce((acc, score) => acc*score, 1);
            if(scenicScore > highestScenicScore) {
                highestScenicScore = scenicScore;
                console.log(scenicScore, scores);
            }
        });
    });
    console.log('Part 2', highestScenicScore);
});


/*


    const dimensions = {
        x: rows[0].length,
        y: rows.length
    };

    const isEdge = (x,y) => {
        if(x === 0 || x === dimensions.x) return true;
        if(y === 0 || y === dimensions.y) return true;
        return false;
    }
*/
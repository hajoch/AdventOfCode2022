const fs = require('fs');

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const rows = data.toString().split("\n").map((row) => row.split("").map(tree => parseInt(tree)));
    // Methods
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
        return views.some(view => view.every(area => area < tree));
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
                return score == -1 ? view.length : score+1;
            });
            let scenicScore = scores.reduce((acc, score) => acc*score, 1);
            if(scenicScore > highestScenicScore) {
                highestScenicScore = scenicScore;
            }
        });
    });
    console.log('Part 2', highestScenicScore);
});
const fs = require('fs');

// Methods

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const rows = data.toString().split("\n").map((row) => row.split("").map(tree => parseInt(tree)));

    const isVisible = (height, x, y) => {
        let row = [...rows[y]];
        let column = rows.map(row => row[x]);
        return isVisibleRow(height, x, row) || isVisibleRow(height,y, column);        
    }

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

    const isVisibleRow = (height, index, row) => {
        let first = row.splice(0,index);
        row.shift();

        let firstBlocked = first.some((tree) => {
            return tree >= height;
        });
        let secondBlocked = row.some(tree => {
            return tree >= height;
        });
        return !firstBlocked || !secondBlocked; 
    }

    const testVisible = (tree, x,y) => {
        let views = getViews(x,y);
        return views.some(view => {
            let visible = view.every(area => area < tree);
            return visible;
        });
    }

    let numberOfVisibleTrees = 0;
    let numberOfVisibleTrees2 = 0;
    rows.forEach((row, y) => {
        row.forEach((tree, x) => {
            numberOfVisibleTrees += (isVisible(tree,x,y) ? 1 : 0);
            numberOfVisibleTrees2 += (testVisible(tree,x,y) ? 1 : 0);
        });
    })


    console.log('Part 1',numberOfVisibleTrees);
    console.log('Part 1',numberOfVisibleTrees2);

    console.dir(testVisible(1, 5, 0));

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
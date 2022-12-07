const fs = require('fs');

const cd = (node,path,parameter) => {
    switch(parameter) {
        case '..': path.pop(); return;
        case '/': path = []; return;
    }
    path.push(parameter);
    if(! node[parameter]) { 
        node[parameter] = {};
    }
}

const ls = (node, lines) => {
    lines.forEach(([property, name]) => {
        if(!node[name] && name) {
            node[name] = (property === 'dir' ? {} : parseInt(property));
        }
    });
}

const findSize = (node) => {
    if(!isNaN(node)){
        return node;
    }
    let size = 0;
    for (const key in node) {
        if (Object.hasOwnProperty.call(node, key)) {
            const element = node[key];
            size += findSize(element);
        }
    }
    return size;
}

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const commands = data.toString().split("$");

    const filesystem = {};
    commands.reduce((path, lines) => {
        let directory = path.reduce((node, dir) => node[dir], filesystem);        

        let [[command, parameter], ...result] = lines
            .split("\n")
            .map((l) => l.split(' ').filter(token => token != ''));

        switch(command) {
            case 'cd': cd(directory,path, parameter); break;
            case 'ls': ls(directory, result); break;
            default: console.log('WTF??', {path, lines});
        }
        return path;
    },[]);

    // Scan filesystem and map out folder sizes
    const folderSizes = {};
    const scanFiles = (node) => {
        if(!isNaN(node)) {
            return;
        }
        for (const key in node) {
            if (Object.hasOwnProperty.call(node, key)) {
                const element = node[key];
                if(isNaN(element)){
                    folderSizes[key+''] = findSize(element);
                }
                scanFiles(element);
            }
        }
    }
    scanFiles(filesystem);

    // Part 1

    const limit = 100000;

    /// DEBUG
    for (const key in folderSizes) {
        if (Object.hasOwnProperty.call(folderSizes, key)) {
            const element = folderSizes[key];
            if(element <= limit) {
                console.log(key, element);
            }
        }
    }
    const foldersUnderLimit = Object.values(folderSizes).filter(v => v <= limit);
    const sumOfFoldersUnderLimit = foldersUnderLimit.reduce((a,c) => a+c, 0);
    console.log('Part 1', sumOfFoldersUnderLimit);

});

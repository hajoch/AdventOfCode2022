const fs = require('fs');

// Methods
let isMarker = (packet) => !packet.some((val, i) => packet.indexOf(val) !== i);

let findMarker = (transmission, sequenceLenght) => transmission
    .findIndex((val, index) => {
        if(index < sequenceLenght) return false; 
        let packet = transmission.slice(index-sequenceLenght, index);
        return isMarker(packet);
    });

fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const signal = data.toString().split("");
    
    // Part 1
    console.log('Part 1', findMarker(signal, 4));

    // Part 2
    console.log('Part 2', findMarker(signal, 14));
});


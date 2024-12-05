// 
// https://adventofcode.com/2024/day/4#part2
// 
// This is intended to be run in the browser console on the input page.
// 
// Bruteforce method to find 'X-MAS' in a square of text.
// 

let square = [
    ".M.S......",
    "..A..MSMS.",
    ".M.S.MAA..",
    "..A.ASMSM.",
    ".M.S.M....",
    "..........",
    "S.S.S.S.S.",
    ".A.A.A.A..",
    "M.M.M.M.M.",
    ".........."
];
let hightlightStr = 'a';

// Are we in a browser console?
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    square = document.body.innerText.trim().split('\n');
    hightlightStr = '<span style="color: lime;">A</span>';
}

// Check if a position in the square is an XMAS
// x=0, y=0 is the top-left corner
function isX_MAS(square, x, y) {
    // too close to the edge
    if (x <= 0 || x >= square[0].length - 1 || y <= 0 || y >= square.length - 1) {
        return false;
    }
    // not an `A`
    if (square[y]?.[x] !== 'A') return false;

    const diagonals = [
        square[y - 1]?.[x - 1] + square[y + 1]?.[x + 1],
        square[y - 1]?.[x + 1] + square[y + 1]?.[x - 1]
    ];

    // console.log(`Coordinates: (${x}, ${y}) - Diagonals: ${diagonals}`);

    if (diagonals.every(diagonal => diagonal === 'MS' || diagonal === 'SM')) {
        return true;
    }

    return false;
}

const allFound = [];

let count = 0;
for (let y = 0; y < square.length; y++) {
    for (let x = 0; x < square[y]?.length; x++) {
        if (isX_MAS(square, x, y)) {
            count++;
            allFound.push({ x, y });
        }
        // console.log(`Position (${x}, ${y}): ${square[y][x]} - ${isX_MAS(square, x, y)}`);
    }
}
console.log(`'X-MAS' occurs ${count} times.`);

let squareCopy = [...square];

allFound.forEach(({ x, y }) => {
    squareCopy[y] = squareCopy[y].substring(0, x) + 'a' + squareCopy[y].substring(x + 1);
    squareCopy[y - 1] = squareCopy[y - 1].substring(0, x - 1) + squareCopy[y - 1][x - 1].toLowerCase() + squareCopy[y - 1].substring(x);
    squareCopy[y + 1] = squareCopy[y + 1].substring(0, x + 1) + squareCopy[y + 1][x + 1].toLowerCase() + squareCopy[y + 1].substring(x + 2);
    squareCopy[y - 1] = squareCopy[y - 1].substring(0, x + 1) + squareCopy[y - 1][x + 1].toLowerCase() + squareCopy[y - 1].substring(x + 2);
    squareCopy[y + 1] = squareCopy[y + 1].substring(0, x - 1) + squareCopy[y + 1][x - 1].toLowerCase() + squareCopy[y + 1].substring(x);
});

// do some fancy highlighting if we are in the browser
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const preElement = document.createElement('pre');
    preElement.style.color = 'grey';
    preElement.style.wordWrap = 'break-word';
    preElement.style.whiteSpace = 'pre-wrap';
    document.body.innerHTML = '';
    document.body.appendChild(preElement);

    squareCopy.forEach(row => {
        // Swap the characters for the highlight, otherwise the s in the span tags recursively replaced
        row = row.replace(/a/g, '1')
            .replace(/s/g, '2')
            .replace(/m/g, '3');
        row = row.replace(/1/g, '<span style="color: lime;">A</span>')
            .replace(/2/g, '<span style="color: white;">S</span>')
            .replace(/3/g, '<span style="color: white;">M</span>');
        preElement.innerHTML += row + '\n';
    });
}

// squareCopy.forEach(row => console.log(row));

// square.forEach(row => console.log(row));

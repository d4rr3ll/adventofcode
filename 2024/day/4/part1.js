// 
// https://adventofcode.com/2024/day/4
// 
// This is intended to be run in the browser console on the input page.
// 
// The method is to take the square of text and keep rotating it 90 degrees
// clockwise and then search for the word 'XMAS' in all the combinations.
// The diagonals are also extracted at each rotation and added to the search.
// 

// Example usage:
let square = [
    "....XXMAS.",
    ".SAMXMS...",
    "...S..A...",
    "..A.A.MS.X",
    "XMASAMX.MM",
    "X.....XA.A",
    "S.S.S.S.SS",
    ".A.A.A.A.A",
    "..M.M.M.MM",
    ".X.X.XMASX"
];

// Are we in a browser console?
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    square = document.body.innerText.trim().split('\n');
}

// Rotate a square matrix by 90 degrees clockwise
function rotateSquare(square) {
    const n = square.length;
    const rotatedSquare = [];

    for (let i = 0; i < n; i++) {
        let newRow = '';
        for (let j = n - 1; j >= 0; j--) {
            newRow += square[j][i];
        }
        rotatedSquare.push(newRow);
    }

    return rotatedSquare;
}

// Find all the top-left to bottom-right diagonals in a square matrix
function getDiagonals(square, minLength = 4) {
    const n = square.length;
    const diagonals = [];

    // Get top-left to bottom-right diagonals
    for (let d = 0; d < n * 2 - 1; d++) {
        let diagonal = '';
        for (let i = 0; i < n; i++) {
            let j = d - i;
            if (j >= 0 && j < n) {
                diagonal += square[i][j];
            }
        }
        if (diagonal.length >= minLength) diagonals.push(diagonal);
    }
    return diagonals;
}


const allCombinations = [...square];
allCombinations.push(...getDiagonals(square));

// Rotate and append the square and diagonals 3 times
for (let i = 0; i < 3; i++) {
    square = rotateSquare(square);
    allCombinations.push(...square);
    allCombinations.push(...getDiagonals(square));
}

// Count the number of times 'XMAS' occurs
const count = allCombinations.reduce((acc, str) => acc + (str.match(/XMAS/g) || []).length, 0);
console.log(`The word 'XMAS' occurs ${count} times.`);


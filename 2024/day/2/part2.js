// 
// https://adventofcode.com/2024/day/2#part2
// 
// This is intended to be run in the browser console on the input page.
//
// Recursive function to enforce the rules of the sequence.  
// This version has a dampener that removes one number from the sequence and tries again until one is found that works.
//

let loggingEnabled = true;

let pageInput = [
    "7 6 4 2 1",
    "1 2 7 8 9",
    "9 7 6 2 1",
    "1 3 2 4 5",
    "8 6 4 4 1",
    "1 3 6 7 9",
    "84 82 83 84 85 88 90"
];

// Are we in a browser console?
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    pageInput = document.body.innerText.trim().split('\n');
    loggingEnabled = false;

}

function log(...args) {
    if (loggingEnabled) {
        console.log(...args);
    }
}

function compareNumbers(input, index = 1, increasing = undefined) {
    if (typeof input === 'string') {
        input = input.split(' ').map(Number).flat();
    }

    if (index >= input.length) {
        log(`Sequence is safe`);
        return true;
    }

    // if direction is undefined, set it to the direction of the first comparison
    if (increasing === undefined) {
        log(`Checking ${input}`);
        increasing = input[index] > input[index - 1];
        // increasing is true if the numbers are increasing, false otherwise
    }

    log(`Comparing ${input[index]} with ${input[index - 1]} in ${increasing ? 'increasing' : 'decreasing'} order.`);

    if (increasing && input[index] < input[index - 1]) {
        log(`The numbers are not in increasing order.`);
        return false;
    } else if (!increasing && input[index] > input[index - 1]) {
        log(`The numbers are not in decreasing order.`);
        return false;
    }

    if (Math.abs(input[index] - input[index - 1]) < 1 || Math.abs(input[index] - input[index - 1]) > 3) {
        log(`The absolute difference between ${input[index]} and ${input[index - 1]} is not between 1 and 3.`);
        return false;
    }

    return compareNumbers(input, index + 1, increasing);
}

function compareNumbersWithDampener(input) {
    if (typeof input === 'string') {
        input = input.split(' ').map(Number).flat();
    }

    log(`Checking with Dampener ${input}`);

    if (compareNumbers(input)) {
        return true;
    }

    for (let i = 0; i < input.length; i++) {
        let modifiedInput = input.slice();
        modifiedInput.splice(i, 1);
        log(`Checking with Dampener ${modifiedInput} but removed ${input[i]}`);
        if (compareNumbers(modifiedInput)) {
            return true;
        }
    }
    return false;
}

const pageInputResults = pageInput.map(numbers => compareNumbersWithDampener(numbers));
const countSafe = pageInputResults.filter(result => result === true).length;

console.log(`Number of safe reports: ${countSafe}`);

log(`Results:`, pageInputResults);

// do some fancy highlighting if we are in the browser
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const preElement = document.createElement('pre');
    preElement.style.color = 'grey';
    preElement.style.wordWrap = 'break-word';
    preElement.style.whiteSpace = 'pre-wrap';
    document.body.innerHTML = '';
    document.body.appendChild(preElement);

    pageInput.forEach((row, index) => {
        if (pageInputResults[index]) {
            row = `<span style="color: lime;">${row}</span>`;
        }
        preElement.innerHTML += row + '\n';
    });
}

// 
// https://adventofcode.com/2024/day/3
// 
// This is intended to be run in the browser console on the input page.
//
// Use some regex to find all the mul() matches and then multiply the numbers in each match.
// 

let pageInput = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"

// Are we in a browser console?
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    pageInput = document.body.innerText;
}

const mulTotal =
    pageInput
        .match(/mul\(\d+,\d+\)/gm)
        .reduce((sum, match) => sum + match.match(/\d+/g).reduce((a, b) => a * b), 0);

console.log(`The total of all the mul() matches is ${mulTotal}.`);
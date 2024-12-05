// 
// https://adventofcode.com/2024/day/3#part2
// 
// This is intended to be run in the browser console on the input page.
//
// Regex replace everything that is between don't() and do() with an empty string.
// Also remove any don't() that don't have a matching do(), this covers of any straggles at the end.
// Then match all the mul() calls and reduce them by multiplying the numbers in each match.
// 

let pageInput = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

// Are we in a browser console?
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    pageInput = document.body.innerText;
}

mulTotal = pageInput
    .replace(/don't\(\)[\s\S]+?do\(\)/gm, '')
    .replace(/don't\(\)(?![\s\S]*don't\(\)).*$/gm, '')
    .match(/mul\(\d+,\d+\)/gm)
    .reduce((sum, match) => sum + match.match(/\d+/g)
        .reduce((a, b) => a * b), 0);

console.log(`The total of all the mul() matches is ${mulTotal}.`);
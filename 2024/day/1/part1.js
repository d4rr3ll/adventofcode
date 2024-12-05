// 
// https://adventofcode.com/2024/day/1
// 
// This is intended to be run in the browser console on the input page.
//
// The method is to take the list of numbers and split them into two lists.
// Then sort both lists and compare the elements at each index.
// The sum of the absolute differences is the answer.
//

let pageInput = [
    "3   4",
    "4   3",
    "2   5",
    "1   3",
    "3   9",
    "3   3"    
]

// Are we in a browser console?
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    pageInput = document.body.innerText.trim().split('\n');
}

const [list1, list2] = pageInput.reduce(([l1, l2], line) => {
    const [num1, num2] = line.trim().split(/\s+/).map(Number);
    return [[...l1, num1], [...l2, num2]];
}, [[], []]);

// Sort the lists
list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

const distance = list1.reduce((acc, num, index) => acc + Math.abs(num - list2[index]), 0);
console.log(`The total distance is ${distance}.`);
// 
// https://adventofcode.com/2024/day/1#part2
// 
// This is intended to be run in the browser console on the input page.
//
// This is mostly the same as part 1, but with a few changes.
// This aggregates the second list into an object with the counts of each number.
// Then it reduces the list to count how many times the number in the left list is in the right list.
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

// --- new code from here...

// aggregate list2
const list2_agg = list2.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
}, {});

const similarity = list1.reduce((acc, num) => acc + (num * (list2_agg[num] || 0)), 0);
console.log(`The similarity is ${similarity}.`);
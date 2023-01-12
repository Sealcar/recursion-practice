/***********************************************************************
Write a recursive solution called `isSorted` to determine if the input array
is sorted in ascending order.

Examples:

isSorted([1, 2, 3, 4, 5]); // true
isSorted([1, 2, 4, 3, 5]); // false
isSorted([2, 4, 6, 7, 8]); // true
isSorted([5, 4, 3, 2, 1]); // false
***********************************************************************/

// your code here

function isSorted(array) {
  if (array.length <= 1) {
    return true;
  } else if (array.length === 2) {
    return (array[0] < array[1]);
  } else {
    let firstHalf = array.slice(0, Math.round(array.length / 2));
    let secondHalf = array.slice(Math.round(array.length / 2));
    return (isSorted(firstHalf) && isSorted(secondHalf)) && firstHalf[firstHalf.length - 1] < secondHalf[0];
  }
}

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = isSorted;
} catch (e) {
  module.exports = null;
}

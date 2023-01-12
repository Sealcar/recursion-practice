/***********************************************************************
Write a recursive method permutations(array) that calculates all the
permutations of the given array. For an array of length n there are n! different
permutations. So for an array with three elements we will have 3 * 2 * 1 = 6
different permutations.

Examples:

permutations([1, 2]) // [[1, 2], [2, 1]]
permutations([1, 2, 3]) // [[1, 2, 3], [1, 3, 2],
                        // [2, 1, 3], [2, 3, 1],
                        // [3, 1, 2], [3, 2, 1]]
***********************************************************************/

// your code here
function permutations(array) {
  if (array.length < 2) {
    return [array];
  } else if (array.length === 2) {
    return [array, [array[1], array[0]]];
  } else {
    let perms = array.reduce((acc, ele1, index, array) => {
      let rest = [...array.slice(0, index), ...array.slice(index + 1)]
      let restPerms = permutations(rest);
      let permsArray = restPerms.map(ele2 => {
        return [ele1, ...ele2];
      })
      return [...acc, ...permsArray];
    }, []);
    return perms;
  }
}

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = permutations;
} catch (e) {
  module.exports = null;
}

/***********************************************************************
Write a recursive function that will find the best way to make change from a
given set of coin values for a given amount of money. The set of coin values
should default to using pennies (1 cent), nickels (5 cents), dimes (10 cents),
and quarters (25 cents). Return `null` if there are no possible ways to make
change for the given target amount.

Examples:

makeChange(21); // [1, 10, 10]
makeChange(75); // [25, 25, 25]
makeChange(33, [15, 3]); // [3, 15, 15]
makeChange(34, [15, 3]); // null
makeChange(24, [10, 7, 1]) // [7, 7, 10]

Here's a game plan for solving the problem:

First, write a 'greedy' version called `greedygreedyMakeChange`:

Take as many of the biggest coin as possible and add them to your result.
Add to the result by recursively calling your method on the remaining amount,
leaving out the biggest coin, until the remainder is zero.
Once you have a working greedy version, talk with your partner about refactoring
this to `makeBetterChange`. What's wrong with `greedygreedyMakeChange`?

Consider the case of `greedygreedyMakeChange(24, [10,7,1])`. Because it takes as many
10 pieces as possible, `greedygreedyMakeChange` misses the correct answer of
`[10,7,7]` (try it in node).

To `makeBetterChange`, we only take one coin at a time and never rule out
denominations that we've already used. This allows each coin to be available
each time we get a new remainder. By iterating over the denominations and
continuing to search for the best change, we assure that we test for
'non-greedy' uses of each denomination.

Discuss the following game plan and then work together to implement your
new method:

- Iterate over each coin.
- Grab only one of that one coin and recursively call `makeBetterChange` on the
  remainder using coins less than or equal to the current coin.
- Add the single coin to the change returned by the recursive call. This will be
  a possible solution, but maybe not the best one.
- Keep track of the best solution and return it at the end.

N.B. Don't generate every possible permutation of coins and then compare them.
Remember that a permutation is not the same thing as a combination - we will
need to check every combination of coins that add up to our target, we just
don't want to check the same combination in different orders. If you get stuck
you can start by writing a solution that calculates and compares all of the
permutations without storing them in an array. Then go back and refactor your
solution so that it only calculates and compares all of the different
combinations.
***********************************************************************/

function mod(n, m) {
  return ((n % m) + m) % m;
}

const sumArray = (array, sum = 0) => {
  if (array.length === 0) {
    return 0;
  } else {
    sum += array[0] + sumArray(array.slice(1));
    return sum;
  }
}

function greedyMakeChange(target, coins = [25, 10, 5, 1]) {
  // no tests for greedygreedyMakeChange so make sure to test this on your own
  // your code here
  let lowestCoin = coins.reduce((acc, ele) => {
    if (acc < ele) {
      return acc;
    } else {
      return ele;
    }
  });

  if (target < lowestCoin && target > 0) {
    return null;
  } else if (target === 0) {
    return [];
  } else {
    let coinsLess = coins.filter(ele => {return ele <= target});
    let newChange = greedyMakeChange(target - coinsLess[0], coinsLess);
    if (coinsLess.length === 0) {
      return [];
    } else if (newChange === null) {
      return null;
    } else {
      return [coinsLess[0], ...newChange];
    }
  }
}

function makeBetterChange(target, coins = [25, 10, 5, 1]) {
  // your code here
  if (target % coins[0] === 0) {
    return greedyMakeChange(target, coins);
  }
  let doable = coins.reduce((acc, ele) => {
    return mod(acc, ele);
  }, target);

  if (doable !== 0) {
    return null;
  } else {
    let all = [];
    coins.forEach(ele => {
      if (target >= ele) {
      all.push([ele, ...makeBetterChange(target - ele, coins)]);
      }
    });
      let best = all.reduce((acc, ele) => {
        if ((ele.length < acc.length && ele.length > 0) || acc.length === 0) {
          return ele;
        } else {
          return acc;
        }
      }, []);
      return best;
    }
}

let a = makeBetterChange(21); // [1, 10, 10]
debugger
let b = makeBetterChange(75); // [25, 25, 25]
let c = makeBetterChange(33, [15, 3]); // [3, 15, 15]
let d = makeBetterChange(34, [15, 3]); // null
let e = makeBetterChange(24, [10, 7, 1]) // [7, 7, 10]

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = makeBetterChange
} catch (e) {
  module.exports = null;
}

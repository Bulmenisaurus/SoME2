// Testing of all the functions for correctness

const countBitsIterative = (x) => {
    let numBits = 0n;
    while (x > 0n) {
        numBits += x & 1n;
        x = x >> 1n;
    }
    return numBits;
};

const countBitsDecreasing = (x) => {
    let num = x;
    let numBits = 0n;
    while (num > 0n) {
        num &= num - 1n;
        numBits += 1n;
    }
    return numBits;
};

const countBitsConstant = (x) => {
    let num = x;
    for (let i = 1n; i < 32n; i++) {
        num -= x >> i;
    }
    return num;
};

const tests = [0, 1, 2, 3, 2 ** 10 - 1, 2 ** 31, 2 ** 31 - 1, 2 ** 32 - 1];

for (let i = 0; i < 100; i++) {
    tests.push(Math.floor(Math.random() * 2 ** 32));
}

// taken to be THE correct value
const correctCountBits = (x) => {
    return x
        .toString(2)
        .split('')
        .filter((d) => d === '1').length;
};

const err = (n, i, a, e) =>
    console.error(`error with ${n} for ${i}: expected \`${e}\`, got \`${a}\``);

for (const i of tests) {
    let testCase = BigInt(i);

    let bI = countBitsIterative(testCase);
    let bD = countBitsDecreasing(testCase);
    let bC = countBitsConstant(testCase);

    let correct = BigInt(correctCountBits(testCase));

    if (correct !== bI) err('iterative', i, bI, correct);
    if (correct !== bD) err('decreasing', i, bD, correct);
    if (correct !== bC) err('constant', i, bC, correct);
}
console.log(`Test case done, ${tests.length} values tested.`);

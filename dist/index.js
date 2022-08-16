"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const removeAllChildren = (n) => {
    while (n.firstChild) {
        n.removeChild(n.lastChild);
    }
};
const numberOfOnes = (n) => {
    return n
        .toString(2)
        .split('')
        .reduce((a, b) => a + (b === '1' ? 1 : 0), 0);
};
const binaryDemo = (numberInput, binaryOutput, numberOnesOutput) => {
    const update = () => {
        let value = BigInt(0);
        try {
            value = BigInt(numberInput.value);
        }
        catch (_a) { }
        if (value < BigInt(0)) {
            value = BigInt(0);
        }
        binaryOutput.innerText = value.toString(2);
        numberOnesOutput.innerText = numberOfOnes(value).toString();
    };
    update();
    numberInput.addEventListener('input', update);
};
const iterationDemo = (numberInput, binaryOutput, numberOnesOutput, stepsInput) => {
    const update = () => {
        const step = parseInt(stepsInput.value);
        let value = BigInt(0);
        try {
            value = BigInt(numberInput.value);
        }
        catch (_a) { }
        if (value <= BigInt(0)) {
            value = BigInt(0);
        }
        if (isNaN(step)) {
            throw new Error('steps is undefined');
        }
        const binary = value.toString(2);
        stepsInput.max = (binary.length - 1).toString();
        let nOnes = 0;
        removeAllChildren(binaryOutput);
        for (let i = 0; i < binary.length; i++) {
            let char = binary[i];
            let reversedI = binary.length - i - 1;
            if (reversedI <= step && char === '1') {
                nOnes += 1;
            }
            if (reversedI === step) {
                const mark = document.createElement('mark');
                mark.classList.add(char === '1' ? 'y' : 'b');
                mark.innerText = char;
                char = mark;
            }
            binaryOutput.append(char);
        }
        numberOnesOutput.innerText = nOnes.toString();
    };
    update();
    numberInput.addEventListener('input', update);
    stepsInput.addEventListener('input', update);
};
const decreaseDemo = (numberInput, binaryOutput, numberOnesOutput, stepsInput) => {
    const update = () => {
        const step = parseInt(stepsInput.value);
        let value = BigInt(0);
        try {
            value = BigInt(numberInput.value);
        }
        catch (_a) { }
        if (value <= BigInt(0)) {
            value = BigInt(0);
        }
        if (isNaN(step)) {
            throw new Error('steps is undefined');
        }
        stepsInput.max = numberOfOnes(value).toString();
        const nOnes = step;
        removeAllChildren(binaryOutput);
        let res = value;
        for (let i = 0; i < step; i++) {
            res &= res - BigInt(1);
        }
        binaryOutput.innerText = res.toString(2);
        numberOnesOutput.innerText = nOnes.toString();
    };
    update();
    numberInput.addEventListener('input', update);
    stepsInput.addEventListener('input', update);
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const binaryInput = document.querySelector('#binary-demo input');
    const binaryOutput = document.querySelector('#binary-demo .binary');
    const nOnesOutput = document.querySelector('#binary-demo .ones');
    if (binaryInput === null || binaryOutput === null || nOnesOutput === null) {
        console.error('unable to find binary input, binaryoutput');
        return;
    }
    binaryDemo(binaryInput, binaryOutput, nOnesOutput);
    const iterationBinaryInput = document.querySelector('#iteration input[type="number"]');
    const iterationBinaryOutput = document.querySelector('#iteration .binary');
    const iterationNOnesOutput = document.querySelector('#iteration .ones');
    const iterationStepsInput = document.querySelector('#iteration input[type="range"]');
    if (iterationBinaryInput === null ||
        iterationBinaryOutput === null ||
        iterationNOnesOutput === null ||
        iterationStepsInput === null) {
        console.error('unable to find iteration demo elements');
        return;
    }
    iterationDemo(iterationBinaryInput, iterationBinaryOutput, iterationNOnesOutput, iterationStepsInput);
    const decreaseBinaryInput = (document.querySelector('#decrease-demo input[type="number"]'));
    const decreaseBinaryOutput = document.querySelector('#decrease-demo .binary');
    const decreaseNOnesOutput = document.querySelector('#decrease-demo .ones');
    const decreaseStepsInput = document.querySelector('#decrease-demo input[type="range"]');
    if (decreaseBinaryInput === null ||
        decreaseBinaryOutput === null ||
        decreaseNOnesOutput === null ||
        decreaseStepsInput === null) {
        console.error('unable to find decrease demo elements');
        return;
    }
    decreaseDemo(decreaseBinaryInput, decreaseBinaryOutput, decreaseNOnesOutput, decreaseStepsInput);
});
main();
//# sourceMappingURL=index.js.map
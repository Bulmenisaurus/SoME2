const removeAllChildren = (n: HTMLElement) => {
    while (n.firstChild) {
        n.removeChild(n.lastChild!);
    }
};

const numberOfOnes = (n: bigint) => {
    return n
        .toString(2)
        .split('')
        .reduce((a, b) => a + (b === '1' ? 1 : 0), 0);
};

const binaryDemo = (
    numberInput: HTMLInputElement,
    binaryOutput: HTMLElement,
    numberOnesOutput: HTMLElement
) => {
    const update = () => {
        let value = BigInt(0);
        try {
            value = BigInt(numberInput.value);
        } catch {}

        if (value < BigInt(0)) {
            value = BigInt(0);
        }

        binaryOutput.innerText = value.toString(2);
        numberOnesOutput.innerText = numberOfOnes(value).toString();
    };

    update();
    numberInput.addEventListener('input', update);
};

const iterationDemo = (
    numberInput: HTMLInputElement,
    binaryOutput: HTMLElement,
    numberOnesOutput: HTMLElement,
    stepsInput: HTMLInputElement
) => {
    const update = () => {
        const step = parseInt(stepsInput.value);

        let value = BigInt(0);
        try {
            value = BigInt(numberInput.value);
        } catch {}

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
            let char: string | HTMLElement = binary[i];
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

const decreaseDemo = (
    numberInput: HTMLInputElement,
    binaryOutput: HTMLElement,
    numberOnesOutput: HTMLElement,
    stepsInput: HTMLInputElement
) => {
    const update = () => {
        const step = parseInt(stepsInput.value);

        let value = BigInt(0);
        try {
            value = BigInt(numberInput.value);
        } catch {}

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

const main = async () => {
    type N<X> = X | null;
    type Input = N<HTMLInputElement>;
    type Span = N<HTMLSpanElement>;

    const binaryInput = <Input>document.querySelector('#binary-demo input');
    const binaryOutput = <Span>document.querySelector('#binary-demo .binary');
    const nOnesOoutput = <Span>document.querySelector('#binary-demo .ones');

    if (binaryInput === null || binaryOutput === null || nOnesOoutput === null) {
        console.error('unable to find binary input, binaryoutput');
        return;
    }
    binaryDemo(binaryInput, binaryOutput, nOnesOoutput);

    const iterationBinaryInput = <Input>document.querySelector('#iteration input[type="number"]');
    const iterationBinaryOutput = <Input>document.querySelector('#iteration .binary');
    const iterationNOnesOoutput = <Input>document.querySelector('#iteration .ones');
    const interationStepsInput = <Input>document.querySelector('#iteration input[type="range"]');

    if (
        iterationBinaryInput === null ||
        iterationBinaryOutput === null ||
        iterationNOnesOoutput === null ||
        interationStepsInput === null
    ) {
        console.error('unable to find iteration demo elements');
        return;
    }

    iterationDemo(
        iterationBinaryInput,
        iterationBinaryOutput,
        iterationNOnesOoutput,
        interationStepsInput
    );

    const decreaseBinaryInput = <Input>(
        document.querySelector('#decrease-demo input[type="number"]')
    );
    const decreaseBinaryOutput = <Input>document.querySelector('#decrease-demo .binary');
    const decreaseNOnesOoutput = <Input>document.querySelector('#decrease-demo .ones');
    const decreaseStepsInput = <Input>document.querySelector('#decrease-demo input[type="range"]');

    if (
        decreaseBinaryInput === null ||
        decreaseBinaryOutput === null ||
        decreaseNOnesOoutput === null ||
        decreaseStepsInput === null
    ) {
        console.error('unable to find decrease demo elements');
        return;
    }

    decreaseDemo(
        decreaseBinaryInput,
        decreaseBinaryOutput,
        decreaseNOnesOoutput,
        decreaseStepsInput
    );
};

main();

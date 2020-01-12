const bubbleSortHelper = (arr: number[]) => {
    const sortedArray = [...arr];
    const immediateResult: number[][] = [];
    const animations: number[][] = [];
    while (true) {
        let swapped = false;
        for (let i = 0; i < sortedArray.length - 1; ++i) {
            immediateResult.push([...sortedArray]);
            animations.push([i, i + 1]);
            if (sortedArray[i] > sortedArray[i + 1]) {
                const temp = sortedArray[i];
                sortedArray[i] = sortedArray[i + 1];
                sortedArray[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return {
        sortedArray: sortedArray,
        immediateResult: immediateResult,
        animations: animations,
    };
};

export default bubbleSortHelper;
const insertionSortHelper = (arr: Array<number>) => {
    const sortedArray = [...arr];
    const immediateResult: number[][] = [];
    const animations: number[][] = [];
    for (let i = 1; i < sortedArray.length; ++i) {
        const key = sortedArray[i];
        let j = i - 1;
        while (j >= 0 && (sortedArray[j] > key)) {
            sortedArray[j + 1] = sortedArray[j];
            immediateResult.push([...sortedArray]);
            animations.push([j + 1, j]);
            j--;
        }
        sortedArray[j + 1] = key;
        immediateResult.push([...sortedArray]);
        animations.push([i, j + 1]);
    }
    return {
        sortedArray: sortedArray,
        immediateResult: immediateResult,
        animations: animations,
    };
};

export default insertionSortHelper;
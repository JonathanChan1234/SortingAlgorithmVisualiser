const insertionSortHelper = (arr: Array<number>) => {
    const sortedArray = [...arr];
    const immediateResult: number[][] = [];
    for (let i = 1; i < sortedArray.length; ++i) {
        const key = sortedArray[i];
        let j = i - 1;
        while (j >= 0 && (sortedArray[j] > key)) {
            sortedArray[j + 1] = sortedArray[j];
            immediateResult.push([...sortedArray]);
            j--;
        }
        sortedArray[j + 1] = key;
        immediateResult.push([...sortedArray]);
    }
    return {
        sortedArray: sortedArray,
        immediateResult: immediateResult,
    };
};

export default insertionSortHelper;
const selectionSortHelper = (arr: number[]) => {
    const sortedArray = [...arr];
    const immediateResult: number[][] = [];
    for (let i = 0; i < sortedArray.length - 1; ++i) {
        let minIndex = i;
        for (let j = i + 1; j < sortedArray.length; ++j) {
            if (sortedArray[j] < sortedArray[minIndex]) minIndex = j;
        }
        // Swap the elements
        const temp = sortedArray[i];
        sortedArray[i] = sortedArray[minIndex];
        sortedArray[minIndex] = temp;
        immediateResult.push([...sortedArray]);
    }
    return {
        sortedArray: sortedArray,
        immediateResult: immediateResult,
    };
};

export default selectionSortHelper;
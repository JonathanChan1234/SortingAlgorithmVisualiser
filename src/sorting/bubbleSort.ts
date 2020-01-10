const bubbleSortHelper = (arr: number[]) => {
    const sortedArray = [...arr];
    const immediateResult : number[][] = [];
    while (true) {
        let swapped = false;
        for (let i = 0; i < sortedArray.length - 1; ++i) {
            if (sortedArray[i] > sortedArray[i + 1]) {
                const temp = sortedArray[i];
                sortedArray[i] = sortedArray[i + 1];
                sortedArray[i + 1] = temp;
                swapped = true;
                immediateResult.push([...sortedArray]);
            }
        }
        if (!swapped) break;
    }
    return {
        sortedArray: sortedArray,
        immediateResult: immediateResult,
    };
};

export default bubbleSortHelper;
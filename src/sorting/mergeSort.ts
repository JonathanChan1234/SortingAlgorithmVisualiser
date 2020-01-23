const mergeSortHelper = (arr: number[]) => {
    const sortedArray = [...arr];
    const immediateResult: number[][] = [];
    const animations: number[][] = [];
    mergeSort(0, sortedArray.length - 1, sortedArray, immediateResult, animations);
    return {
        sortedArray: sortedArray,
        immediateResult: immediateResult,
        animations: animations,
        algorithm: "merge",
    };
};

const mergeSort = (
    low: number,
    high: number,
    arr: Array<number>,
    immediateResult: number[][],
    animations: number[][]) => {
    if (low < high) {
        const middle = low + Math.floor((high - low) / 2);
        mergeSort(low, middle, arr, immediateResult, animations);
        mergeSort(middle + 1, high, arr, immediateResult, animations);
        merge(low, middle, high, arr, immediateResult, animations);
    }
};

const merge = (
    low: number,
    middle: number,
    high: number,
    arr: number[],
    immediateResult: number[][],
    animations: number[][]) => {
    let i = low;
    let j = middle + 1;
    let k = low;
    const helperArray = [...arr];
    while (i <= middle && j <= high) {
        if (helperArray[i] < helperArray[j]) {
            arr[k] = helperArray[i];
            i++;
        } else {
            arr[k] = helperArray[j];
            j++;
        }
        animations.push([i, j]);
        immediateResult.push([...arr]);
        k++;
    }
    while (i <= middle) {
        arr[k] = helperArray[i];
        animations.push([i]);
        immediateResult.push([...arr]);
        i++;
        k++;
    }
    while (j <= high) {
        arr[k] = helperArray[j];
        animations.push([j]);
        immediateResult.push([...arr]);
        j++;
        k++;
    }
};

export default mergeSortHelper;
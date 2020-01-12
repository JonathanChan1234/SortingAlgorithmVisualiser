const quickSortHelper = (arr: number[]) => {
    const sortedArray = [...arr];
    const immediateResult: number[][] = [];
    const animations: number[][] = [];
    quickSort(0, sortedArray.length - 1, sortedArray, immediateResult, animations);
    return {
        sortedArray: sortedArray,
        immediateResult: immediateResult,
        animations: animations,
    };
};

const quickSort = (
        low: number, 
        high: number, 
        arr: number[], 
        immediateResult: number[][],
        animations: number[][]) => {
    if (low < high) {
        const p = partition(low, high, arr, immediateResult, animations);
        quickSort(low, p - 1, arr, immediateResult, animations);
        quickSort(p + 1, high, arr, immediateResult, animations);
    }
};

/**
 * 1. Put the number element smaller than pivot to the left
 * 2. Put the number element larger than pivot to the right
 * 3. Return the new index of the pivot
 * @param low start index of the array
 * @param high end index of the array 
 * @param arr arr to be partitioned
 */
const partition = (
        low: number, 
        high: number, 
        arr: number[], 
        immediateResult: number[][],
        animations: number[][]) => {
    const pivot = arr[high];
    let j = low - 1;
    for (let i = low; i < high; ++i) {
        if (arr[i] < pivot) {
            j++;
            swapElement(i, j, arr);
            immediateResult.push([...arr]);
            animations.push([i, j, high]);
        }
    }
    swapElement(j + 1, high, arr);
    immediateResult.push([...arr]);
    animations.push([j + 1, high]);
    return j + 1;
};

const swapElement = (i: number, j: number, arr: number[]) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

export default quickSortHelper;
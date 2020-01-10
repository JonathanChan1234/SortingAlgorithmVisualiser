const quickSortHelper = (arr: number[]) => {
    const sortedArray = [...arr];
    const immediateResult: number[][] = [];
    quickSort(0, sortedArray.length - 1, sortedArray, immediateResult);
    return {
        sortedArray: sortedArray,
        immediateResult: immediateResult
    };
};

const quickSort = (low: number, high: number, arr: number[], immediateResult: number[][]) => {
    if (low < high) {
        const p = partition(low, high, arr, immediateResult);
        quickSort(low, p - 1, arr, immediateResult);
        quickSort(p + 1, high, arr, immediateResult);
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
const partition = (low: number, high: number, arr: number[], immediateResult: number[][]) => {
    const pivot = arr[high];
    let j = low - 1;
    for (let i = low; i < high; ++i) {
        if (arr[i] < pivot) {
            j++;
            const temp1 = arr[i];
            arr[i] = arr[j];
            arr[j] = temp1;
            immediateResult.push([...arr]);
        }
    }
    const temp2 = arr[j + 1];
    arr[j + 1] = arr[high];
    arr[high] = temp2;
    immediateResult.push([...arr]);
    return j + 1;
};

export default quickSortHelper;
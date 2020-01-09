const mergeSortHelper = (arr: Array<number>) => {
    const sortedArr = [...arr];
    const immediateResult: Array<Array<number>> = [[]];
    mergeSort(0, sortedArr.length - 1, sortedArr, immediateResult);
    return {sortedArr: sortedArr, immediateResult: immediateResult};
};

const mergeSort = (low: number, high: number, arr: Array<number>, immediateResult: Array<Array<number>>) => {
    if (low < high) {
        const middle = low + Math.floor((high - low) / 2);
        mergeSort(low, middle, arr, immediateResult);
        mergeSort(middle + 1, high, arr, immediateResult);
        merge(low, middle, high, arr, immediateResult);
    }
};

const merge = (low: number, middle: number, high: number, arr: Array<number>, immediateResult: Array<Array<number>>) => {
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
        k++;
    }
    while (i <= middle) {
        arr[k] = helperArray[i];
        i++;
        k++;
    }
    while (j <= high) {
        arr[k] = helperArray[j];
        j++;
        k++;
    }
    immediateResult.push([...arr]);
};
// mergeSort(0, 6)
// console.log(immediateResult);

export default mergeSortHelper;
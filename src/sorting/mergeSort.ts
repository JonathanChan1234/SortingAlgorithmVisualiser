const arr = [4, 0, 6, 1, 5, 2, 3];
const immediateResult: Array<number[]> = [];

const mergeSort = (low: number, high: number) => {
    if (low < high) {
        const middle = low + Math.floor((high - low) / 2);
        mergeSort(low, middle);
        mergeSort(middle + 1, high);
        merge(low, middle, high)
    }
};

const merge = (low: number, middle: number, high: number) => {
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
}
mergeSort(0, 6)
console.log(immediateResult);

export default mergeSort;
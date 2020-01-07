export const selectionSortByIndex = (index: number, arr: Array<number>) => {
    let minIndex = index;
    for (let j = index + 1; j < arr.length; ++j) {
        if (arr[j] < arr[minIndex]) minIndex = j;
    }
    const temp = arr[index];
    arr[index] = arr[minIndex];
    arr[minIndex] = temp;
    return arr;
};
export const insertionSortByIndex =  (index: number, arr: Array<number>) => {
    const key = arr[index];
    let j = index - 1;
    while (j >= 0 && (arr[j] > key)) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
    return arr;
};
export interface SortingResult {
    sortedArray: number[];
    immediateResult: number[][];
    animations: number[][];
    algorithm: string;
}

export interface SortElements {
    [algorithm: string]: {
        sortArray: number[];
        animations: number[];
        comparison: number;
    };
}
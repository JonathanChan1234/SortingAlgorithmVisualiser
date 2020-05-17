import { HEAP_SORT } from '../utils/constants';

const heapSortHelper = (arr: number[]) => {
	const sortedArray: number[] = [...arr];
	const immediateResult: number[][] = [];
	const animation: number[][] = [];
	heapSort(sortedArray, immediateResult, animation);
	return {
		sortedArray: sortedArray,
		immediateResult: immediateResult,
		animations: animation,
		algorithm: HEAP_SORT,
	};
};

const heapSort = (arr: number[], immediateResult: number[][], animation: number[][]) => {
	// build the max heap of the array
	for (let index = Math.floor(arr.length / 2) - 1; index >= 0; --index) {
		heapify(arr, arr.length, index, immediateResult, animation);
	}

	// swap the first and the last element
	for (let index = arr.length - 1; index > 0; --index) {
		swap(arr, 0, index);
		updateImmediateResult(arr, [0, index], immediateResult, animation);
		heapify(arr, index, 0, immediateResult, animation);
	}
};

const heapify = (
	arr: number[],
	arraySize: number,
	index: number,
	immediateResult: number[][],
	animation: number[][]
) => {
	let largest = index;
	const left_index = index * 2 + 1;
	const right_index = index * 2 + 2;

	if (left_index < arraySize && arr[left_index] > arr[largest]) {
		largest = left_index;
		updateImmediateResult(arr, [left_index, largest], immediateResult, animation);
	}

	if (right_index < arraySize && arr[right_index] > arr[largest]) {
		largest = right_index;
		updateImmediateResult(arr, [right_index, largest], immediateResult, animation);
	}

	if (largest !== index) {
		swap(arr, largest, index);
		updateImmediateResult(arr, [index, largest], immediateResult, animation);
		heapify(arr, arraySize, largest, immediateResult, animation);
	}
};

const swap = (arr: number[], first: number, second: number) => {
	if (first >= arr.length || second >= arr.length) {
		throw Error('index out of range in swap');
	}
	const temp = arr[first];
	arr[first] = arr[second];
	arr[second] = temp;
};

const updateImmediateResult = (
	result: number[],
	comparedElement: number[],
	immediateResult: number[][],
	animation: number[][]
) => {
	immediateResult.push([...result]);
	animation.push(comparedElement);
};

export default heapSortHelper;

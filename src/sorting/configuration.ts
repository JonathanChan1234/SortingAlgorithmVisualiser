import heapSortHelper from './heapSort';
import bubbleSortHelper from './bubbleSort';
import insertionSortHelper from './insertionSort';
import mergeSortHelper from './mergeSort';
import quickSortHelper from './quickSort';
import selectionSortHelper from './selectionSort';

type ConfigurationType = {
	[key: string]: {
		name: string;
		value: string;
		sort: (
			arr: number[]
		) => {
			sortedArray: number[];
			immediateResult: number[][];
			animations: number[][];
			algorithm: string;
		};
	};
};

export const sortingConfiguration: ConfigurationType = {
	bubble: {
		name: 'Bubble Sort',
		value: 'bubble',
		sort: bubbleSortHelper,
	},
	heap: {
		name: 'Heap Sort',
		value: 'heap',
		sort: heapSortHelper,
	},
	insertion: {
		name: 'Insertion Sort',
		value: 'insertion',
		sort: insertionSortHelper,
	},
	merge: {
		name: 'Merge Sort',
		value: 'merge',
		sort: mergeSortHelper,
	},
	quick: {
		name: 'Quick Sort',
		value: 'quick',
		sort: quickSortHelper,
	},
	selection: {
		name: 'Selection Sort',
		value: 'selection',
		sort: selectionSortHelper,
	},
};

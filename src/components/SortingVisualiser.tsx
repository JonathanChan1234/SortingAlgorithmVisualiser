import React, { useState, useEffect } from 'react';

// UI Components
import { Box } from '@material-ui/core';
import SortingOption from './SortingOption';
import SortingBar from './SortingBar';

// Sorting Algorithm Helper Module
import insertionSortHelper from '../sorting/insertionSort';
import selectionSortHelper from '../sorting/selectionSort';
import mergeSortHelper from '../sorting/mergeSort';
import quickSortHelper from '../sorting/quickSort';
import bubbleSortHelper from '../sorting/bubbleSort';

// Constants and Utils
import { generateRandomArray } from '../utils/utils';
import { 
    animationColor, 
    defaultColor,
    QUICK_SORT, 
    INSERTION_SORT, 
    SELECTION_SORT, 
    MERGE_SORT, 
    BUBBLE_SORT } from '../utils/constants';
import { SortingResult } from '../types/type';

type SortElements = {
    sortArray: number[],
    animations: number[],
};

const animationTimeout: NodeJS.Timeout[] = [];

const SortingVisualiser: React.FC = () => {
    const [sortingMethod, setSortingMethod] = useState(QUICK_SORT);
    const [numberOfElement, setNumberOfElement] = useState<number>(20);
    const [sortElements, setSortElements] = useState<SortElements>({ sortArray: [], animations: [] });
    const [sortInProgress, setSortInProgress] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSortElements({
                sortArray: generateRandomArray(numberOfElement),
                animations: []
            });
        }, 200);
        return () => {
            clearTimeout(timeout);
        };
    }, [numberOfElement]);

    useEffect(() => {
        animationTimeout.length = 0;
        return () => {
            animationTimeout.forEach(timeout => clearTimeout(timeout));
        };
    }, []);

    const renderSortingBar = (): Array<JSX.Element> => {
        let color = 0;
        const { sortArray, animations } = sortElements;
        return sortArray.map((element, index) => (
            <SortingBar
                key={index}
                numberOfElement={numberOfElement}
                height={element}
                color={(animations.includes(index)) ? animationColor[(color++ % 3)] : defaultColor} />
        ));
    };

    const sort = async () => {
        setSortInProgress(true);
        let sortingResult: SortingResult = {
            sortedArray: [],
            animations: [],
            immediateResult: [],
            algorithm: "",
        };
        const { sortArray } = sortElements;
        switch (sortingMethod) {
            case INSERTION_SORT:
                sortingResult = insertionSortHelper(sortArray);
                break;
            case SELECTION_SORT:
                sortingResult = selectionSortHelper(sortArray);
                break;
            case MERGE_SORT:
                sortingResult = mergeSortHelper(sortArray);
                break;
            case QUICK_SORT:
                sortingResult = quickSortHelper(sortArray);
                break;
            case BUBBLE_SORT:
                sortingResult = bubbleSortHelper(sortArray);
                break;
            default:
                break;
        }
        const { sortedArray, immediateResult, animations } = sortingResult;
        for (let i = 0; i < immediateResult.length; ++i) {
            await sortingAnimation(immediateResult[i], animations[i]);
        }
        await sortingAnimation(sortedArray, []);
        setSortInProgress(false);
    };

    const sortingAnimation = (sortArray: number[], animations: number[]): Promise<number[]> => {
        return new Promise(resolve => {
            const timeout = setTimeout(() => {
                setSortElements({ sortArray: sortArray, animations: animations });
                resolve();
            }, Math.ceil(1000 / numberOfElement));
            animationTimeout.push(timeout);
        });
    };

    return (
        <>
            <SortingOption
                defaultNumberOfNumber={20}
                minNumberOfElement={10}
                maxNumberOfElement={100}
                sortingMethod={sortingMethod}
                sortInProgress={sortInProgress}
                numberOfElement={numberOfElement}
                sort={() => sort()}
                updateSortingMethod={(method) => setSortingMethod(method)}
                updateSortingElement={(number) => setNumberOfElement(number)}
                resetArray={() => setSortElements({
                    sortArray: generateRandomArray(numberOfElement),
                    animations: []
                })} />
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center">
                <Box
                    flexDirection="row"
                    display="flex"
                    style={{ width: "80%", height: 200 }}>
                    {renderSortingBar()}
                </Box>
            </Box>
        </>
    );
};

export default SortingVisualiser;
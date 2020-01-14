import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

import { DEFAULT_NUMBER_OF_ELEMENT } from '../utils/constants';
import { generateRandomArray } from '../utils/utils';
import SortingCompetitionOption from './SortingCompetitionOption';
import SortingModel from './SortingModel';
import mergeSortHelper from '../sorting/mergeSort';
import insertionSortHelper from '../sorting/insertionSort';
import selectionSortHelper from '../sorting/selectionSort';
import quickSortHelper from '../sorting/quickSort';
import bubbleSortHelper from '../sorting/bubbleSort';

const sortingAlgorithms = ["insertion", "selection", "bubble", "merge", "quick"];
const SortingCompetition: React.FC = () => {
    const [numberOfElement, setNumberOfElement] = useState<number>(DEFAULT_NUMBER_OF_ELEMENT);
    const [sortElements, setSortElements] = useState<{
        algorithm: string,
        sortArray: number[],
        animations: number[]
    }[]>(sortingAlgorithms.map(sortingAlgorithm => {
        return {
            algorithm: sortingAlgorithm,
            sortArray: generateRandomArray(numberOfElement),
            animations: [],
        };
    }));
    const [sortInProgress, setSortInProgress] = useState<boolean>(false);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSortElements(sortingAlgorithms.map(sortingAlgorithm => {
                return {
                    algorithm: sortingAlgorithm,
                    sortArray: generateRandomArray(numberOfElement),
                    animations: [],
                };
            }));
            return () => {
                clearTimeout(timeout);
            };
        }, 200);
    }, [numberOfElement, reset]);

    const renderSortingModel = () => {
        return sortElements.map(sortElement => (
            <SortingModel
                key={sortElement.algorithm}
                algorithm={sortElement.algorithm}
                numberOfElement={numberOfElement}
                sortArray={sortElement.sortArray}
                animations={sortElement.animations} />
        ));
    };

    const sortCompetitionStart = () => {
        setSortInProgress(true);
        const sortingResult: any = {};
        for (const algorithm of sortingAlgorithms) {
            const sortArray =
                sortElements.find(sortElement => sortElement.algorithm === algorithm)?.sortArray || [];
            switch (algorithm) {
                case "merge":
                    sortingResult[algorithm] = mergeSortHelper(sortArray);
                    break;
                case "insertion":
                    sortingResult[algorithm] = insertionSortHelper(sortArray);
                    break;
                case "selection":
                    sortingResult[algorithm] = selectionSortHelper(sortArray);
                    break;
                case "quick":
                    sortingResult[algorithm] = quickSortHelper(sortArray);
                    break;
                case "bubble":
                    sortingResult[algorithm] = bubbleSortHelper(sortArray);
                    break;
            }
        }
        setSortInProgress(false);
        console.log(sortingResult);
        return sortingResult;
    };

    const sortAnimation = (arr: number[], animation: number[], algorithm: string) => {
        return new Promise(resolve => {
            setTimeout(() => {                
                resolve();
            }, 100);
        });
    };

    return (
        <Box display="flex" flexDirection="column">
            <SortingCompetitionOption
                numberOfElement={numberOfElement}
                sortInProgress={sortInProgress}
                sort={() => sortCompetitionStart()}
                updateSortingElement={(number) => setNumberOfElement(number)}
                resetArray={() => setReset(!reset)} />
            <Box
                justifySelf="center"
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                style={{ width: "100%" }}
                m={1}>
                {renderSortingModel()}
            </Box>
        </Box>
    );
};

export default SortingCompetition;
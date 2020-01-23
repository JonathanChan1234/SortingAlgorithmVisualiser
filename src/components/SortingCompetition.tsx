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
import { SortingResult } from '../types/type';

const sortingAlgorithms = ["insertion", "selection", "bubble", "merge", "quick"];
interface SortElement {
    sortArray: number[];
    animations: number[];
}
type SortElements = {
    [algorithm: string]: SortElement
};

const SortingCompetition: React.FC = () => {
    const [numberOfElement, setNumberOfElement] = useState<number>(DEFAULT_NUMBER_OF_ELEMENT);
    const [sortElements, setSortElements] = useState<SortElements>();
    const [sortInProgress, setSortInProgress] = useState<boolean>(false);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newRandomSortElements: SortElements = {};
            sortingAlgorithms.forEach(sortingAlgorithm => {
                newRandomSortElements[sortingAlgorithm] = {
                    sortArray: generateRandomArray(numberOfElement),
                    animations: [],
                };
            });
            setSortElements(newRandomSortElements);
            return () => {
                clearTimeout(timeout);
            };
        }, 200);
    }, [numberOfElement, reset]);

    const renderSortingModel = () => {
        if (!sortElements) return;
        return Object.keys(sortElements).map(algorithm => (
            <SortingModel
                key={algorithm}
                algorithm={algorithm}
                numberOfElement={numberOfElement}
                sortArray={sortElements[algorithm].sortArray}
                animations={sortElements[algorithm].animations} />
        ));
    };

    const sortCompetitionStart = () => {
        setSortInProgress(true);
        if (!sortElements) return;
        const sortingResult: SortingResult[] = [];
        Object.keys(sortElements).forEach(algorithm => {
            const sortArray = sortElements[algorithm].sortArray;
            switch (algorithm) {
                case "merge":
                    sortingResult.push({ ...mergeSortHelper(sortArray), algorithm: "merge" });
                    break;
                case "insertion":
                    sortingResult.push({ ...insertionSortHelper(sortArray), algorithm: "insertion" });
                    break;
                case "selection":
                    sortingResult.push({ ...selectionSortHelper(sortArray), algorithm: "selection" });
                    break;
                case "quick":
                    sortingResult.push({ ...quickSortHelper(sortArray), algorithm: "quick" });
                    break;
                case "bubble":
                    sortingResult.push({ ...bubbleSortHelper(sortArray), algorithm: "bubble" });
                    break;
                default:
                    sortingResult.push({ ...bubbleSortHelper(sortArray), algorithm: "buble" });
                    break;
            }
        });
        startAnimation(sortingResult)
            .then(() => {
                setSortInProgress(false);
            })
            .catch(err => alert(err.message));
    };

    const startAnimation = async (sortingResult: SortingResult[]) => {
        const maxIteration = Math.max(...sortingResult.map(result => result.immediateResult.length));
        let newSortArray: SortElements = {};
        for (let i = 0; i < maxIteration; ++i) {
            for (const sortingResultByAlgorithm of sortingResult) {
                if (i < sortingResultByAlgorithm.immediateResult.length - 1) {
                    newSortArray = {
                        ...newSortArray,
                        [sortingResultByAlgorithm.algorithm]: {
                            sortArray: sortingResultByAlgorithm.immediateResult[i],
                            animations: sortingResultByAlgorithm.animations[i],
                        }
                    };
                }
                if (i === sortingResultByAlgorithm.immediateResult.length - 1) {
                    newSortArray = {
                        ...newSortArray,
                        [sortingResultByAlgorithm.algorithm]: {
                            sortArray: sortingResultByAlgorithm.immediateResult[sortingResultByAlgorithm.immediateResult.length - 1],
                            animations: [],
                        }
                    };
                }
            }
            await sortAnimation(newSortArray);
        }
    };

    const sortAnimation = (newSortElements: SortElements) => {
        return new Promise(resolve => {
            setTimeout(() => {
                setSortElements(newSortElements);
                resolve();
            }, 10);
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
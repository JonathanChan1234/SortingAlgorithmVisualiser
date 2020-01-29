import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

import { generateRandomArray } from '../utils/utils';
import { SortingResult, SortElements } from '../types/type';
// Components
import SortingCompetitionOption from './SortingCompetitionOption';
import SortingModel from './SortingModel';
import SortingCompetitionTable from './SortingCompetitionTable';
// Sorting Algorithm Helper
import mergeSortHelper from '../sorting/mergeSort';
import insertionSortHelper from '../sorting/insertionSort';
import selectionSortHelper from '../sorting/selectionSort';
import quickSortHelper from '../sorting/quickSort';
import bubbleSortHelper from '../sorting/bubbleSort';
import {
    MERGE_SORT,
    INSERTION_SORT,
    SELECTION_SORT,
    QUICK_SORT,
    BUBBLE_SORT
} from '../utils/constants';
import _ from 'lodash';

const sortingAlgorithms = [INSERTION_SORT, SELECTION_SORT, BUBBLE_SORT, MERGE_SORT, QUICK_SORT];
const animationTimeout: NodeJS.Timeout[] = [];

const SortingCompetition: React.FC = () => {
    const [numberOfElement, setNumberOfElement] = useState<number>(20);
    const [sortElements, setSortElements] = useState<SortElements>();
    const [sortInProgress, setSortInProgress] = useState<boolean>(false);

    useEffect(_.throttle(() => {
        const randomArray = generateRandomArray(numberOfElement);
        const newSortElements: SortElements = {};
        sortingAlgorithms.forEach(sortingAlgorithm => {
            newSortElements[sortingAlgorithm] = {
                sortArray: randomArray,
                animations: [],
                comparison: 0,
            };
        });
        setSortElements(newSortElements);
    }, 100), [numberOfElement]);

    useEffect(() => {
        animationTimeout.length = 0;
        return () => {
            animationTimeout.forEach(timeout => clearTimeout(timeout));
        };
    }, []);

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
                case MERGE_SORT:
                    sortingResult.push({ ...mergeSortHelper(sortArray) });
                    break;
                case INSERTION_SORT:
                    sortingResult.push({ ...insertionSortHelper(sortArray) });
                    break;
                case SELECTION_SORT:
                    sortingResult.push({ ...selectionSortHelper(sortArray) });
                    break;
                case QUICK_SORT:
                    sortingResult.push({ ...quickSortHelper(sortArray) });
                    break;
                case BUBBLE_SORT:
                    sortingResult.push({ ...bubbleSortHelper(sortArray) });
                    break;
                default:
                    sortingResult.push({ ...bubbleSortHelper(sortArray) });
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
                const immediateResultLength = sortingResultByAlgorithm.immediateResult.length;
                // If the sorting is not yet finished, update the immediate result and animation
                if (i < immediateResultLength - 1) {
                    newSortArray = {
                        ...newSortArray,
                        [sortingResultByAlgorithm.algorithm]: {
                            comparison: i,
                            sortArray: sortingResultByAlgorithm.immediateResult[i],
                            animations: sortingResultByAlgorithm.animations[i],
                        }
                    };
                }
                // Once the sorting is finished, clear the animation
                if (i === immediateResultLength - 1) {
                    newSortArray = {
                        ...newSortArray,
                        [sortingResultByAlgorithm.algorithm]: {
                            comparison: i,
                            sortArray: sortingResultByAlgorithm.immediateResult[i],
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
            const timeoutId = setTimeout(() => {
                setSortElements(newSortElements);
                resolve();
            }, 10);
            animationTimeout.push(timeoutId);
        });
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            style={{ width: "100%" }}
            alignItems="center"
            justifyContent="center">
            <SortingCompetitionOption
                minNumberOfElement={10}
                maxNumberOfElement={30}
                defaultNumberOfElement={20}
                numberOfElement={numberOfElement}
                sortInProgress={sortInProgress}
                sort={() => sortCompetitionStart()}
                updateSortingElement={(number) => setNumberOfElement(number)}
                resetArray={() => setNumberOfElement(numberOfElement)} />
            <SortingCompetitionTable sortElements={sortElements} />
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                style={{ width: "80%" }}
                m={1}>
                {renderSortingModel()}
            </Box>
        </Box>
    );
};

export default SortingCompetition;
import React, { useState, useEffect } from 'react';

// UI Components
import { Box } from '@material-ui/core';
import SortingOption from './SortingOption';
import SortingBar from '../SortingBar';

// Constants and Utils
import { generateRandomArray } from '../../utils/utils';
import { animationColor, defaultColor } from '../../utils/constants';
import useThrottleEffect from '../../hook/throttle';
import { sortingConfiguraiton } from '../../sorting/configuration';

type SortElements = {
    sortArray: number[];
    animations: number[];
};

const animationTimeout: NodeJS.Timeout[] = [];
const DEFAULT_OPTION = 'quick';
const DEFAULT_NUMBER_OF_ELEMENT = 70;
const MIN_NUMBER_OF_ELEMENT = 10;
const MAX_NUMBER_OF_ELEMENT = 100;

const SortingVisualiser: React.FC = () => {
    const [sortingMethod, setSortingMethod] = useState(DEFAULT_OPTION);
    const [numberOfElement, setNumberOfElement] = useState<number>(
        DEFAULT_NUMBER_OF_ELEMENT
    );
    const [sortElements, setSortElements] = useState<SortElements>({
        sortArray: [],
        animations: [],
    });
    const [sortInProgress, setSortInProgress] = useState<boolean>(false);
    const throttleItem = useThrottleEffect(
        numberOfElement,
        DEFAULT_NUMBER_OF_ELEMENT,
        800
    );

    useEffect(() => {
        setSortElements({
            sortArray: generateRandomArray(throttleItem),
            animations: [],
        });
    }, [throttleItem]);

    useEffect(() => {
        animationTimeout.length = 0;
        return () =>
            animationTimeout.forEach((timeout) => clearTimeout(timeout));
    }, []);

    const renderSortingBar = (): Array<JSX.Element> => {
        let color = 0;
        const { sortArray, animations } = sortElements;
        return sortArray.map((element, index) => (
            <SortingBar
                key={index}
                numberOfElement={numberOfElement}
                height={element}
                color={
                    animations.includes(index)
                        ? animationColor[color++ % 3]
                        : defaultColor
                }
            />
        ));
    };

    const sort = async () => {
        setSortInProgress(true);
        const { sortArray } = sortElements;
        if (!sortingConfiguraiton[sortingMethod]) {
            throw Error(`Invalid Sorting Algorithm option ${sortingMethod}`);
        }
        const sortingResult = sortingConfiguraiton[sortingMethod].sort(
            sortArray
        );
        const { sortedArray, immediateResult, animations } = sortingResult;
        for (
            let iteration = 0;
            iteration < immediateResult.length;
            ++iteration
        ) {
            await sortingAnimation(
                immediateResult[iteration],
                animations[iteration]
            );
        }
        await sortingAnimation(sortedArray, []);
        setSortInProgress(false);
    };

    const sortingAnimation = (
        sortArray: number[],
        animations: number[]
    ): Promise<number[]> => {
        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                setSortElements({
                    sortArray: sortArray,
                    animations: animations,
                });
                resolve();
            }, Math.ceil(1000 / numberOfElement));
            animationTimeout.push(timeout);
        });
    };

    return (
        <>
            <SortingOption
                defaultNumberOfNumber={DEFAULT_NUMBER_OF_ELEMENT}
                minNumberOfElement={MIN_NUMBER_OF_ELEMENT}
                maxNumberOfElement={MAX_NUMBER_OF_ELEMENT}
                sortingMethod={sortingMethod}
                sortInProgress={sortInProgress}
                numberOfElement={numberOfElement}
                sort={() => sort()}
                updateSortingMethod={(method) => setSortingMethod(method)}
                updateSortingElement={(number) => setNumberOfElement(number)}
                resetArray={() =>
                    setSortElements({
                        sortArray: generateRandomArray(numberOfElement),
                        animations: [],
                    })
                }
            />
            <Box display='flex' alignItems='center' justifyContent='center'>
                <Box
                    flexDirection='row'
                    display='flex'
                    style={{ width: '80%', height: 200 }}>
                    {renderSortingBar()}
                </Box>
            </Box>
        </>
    );
};

export default SortingVisualiser;

import React, { useState, useEffect } from 'react';
import './App.css';

// UI Components
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import SortingOption from './components/SortingOption';
import SortingBar from './components/SortingBar';

// Sorting Algorithm Helper Module
import insertionSortHelper from './sorting/insertionSort';
import selectionSortHelper from './sorting/selectionSort';
import mergeSortHelper from './sorting/mergeSort';
import quickSortHelper from './sorting/quickSort';
import bubbleSortHelper from './sorting/bubbleSort';

// Constants and Utils
import { generateRandomArray } from './utils/utils';
import { DEFAULT_NUMBER_OF_ELEMENT, animationColor, defaultColor } from './utils/constants';
import { SortingResult, SortElements } from './types/type';

const App: React.FC = () => {
    const [sortingMethod, setSortingMethod] = useState("quick");
    const [numberOfElement, setNumberOfElement] = useState<number>(DEFAULT_NUMBER_OF_ELEMENT);
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
            immediateResult: []
        };
        const { sortArray } = sortElements;
        switch (sortingMethod) {
            case "insertion":
                sortingResult = insertionSortHelper(sortArray);
                break;
            case "selection":
                sortingResult = selectionSortHelper(sortArray);
                break;
            case "merge":
                sortingResult = mergeSortHelper(sortArray);
                break;
            case "quick":
                sortingResult = quickSortHelper(sortArray);
                break;
            case "bubble":
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
            setTimeout(() => {
                setSortElements({ sortArray: sortArray, animations: animations });
                resolve();
            }, Math.ceil(1000 / numberOfElement));
        });
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Sorting Algorithm Visualiser
                    </Typography>
                </Toolbar>
            </AppBar>
            <SortingOption
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
        </div>
    );
};

export default App;

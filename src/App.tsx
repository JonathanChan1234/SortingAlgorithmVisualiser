import React, { useState, useEffect } from 'react';
import './App.css';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';

// UI Components
import SortingOption from './components/SortingOption';
import SortingBar from './components/SortingBar';

// Sorting Algorithm Helper Module
import insertionSortHelper from './sorting/insertionSort';
import selectionSortHelper from './sorting/selectionSort';
import mergeSortHelper from './sorting/mergeSort';

// Constants and Utils
import { generateRandomArray } from './utils/utils';
import { DEFAULT_NUMBER_OF_ELEMENT } from './utils/constants';
import quickSortHelper from './sorting/quickSort';
import bubbleSortHelper from './sorting/bubbleSort';

const App: React.FC = () => {
    const [sortingMethod, setSortingMethod] = useState("insertion");
    const [numberOfElement, setNumberOfElement] = useState<number>(DEFAULT_NUMBER_OF_ELEMENT);
    const [sortElements, setSortElements] = useState<Array<number>>([]);
    const [sortInProgress, setSortInProgress] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSortElements(generateRandomArray(numberOfElement));
        }, 200);
        return () => {
            clearTimeout(timeout);
        };
    }, [numberOfElement]);

    const renderSortingBar = (): Array<JSX.Element> => {
        return sortElements.map((sortElement, i) => (
            <SortingBar
                key={i}
                numberOfElement={numberOfElement}
                height={sortElement}
                active={false} />
        ));
    };

    const sort = async () => {
        setSortInProgress(true);
        let immediateResult: number[][] = [[]];
        switch (sortingMethod) {
            case "insertion":
                immediateResult = insertionSortHelper(sortElements).immediateResult;
                break;
            case "selection":
                immediateResult = selectionSortHelper(sortElements).immediateResult;
                break;
            case "merge":
                immediateResult = mergeSortHelper(sortElements).immediateResult;
                break;
            case "quick":
                immediateResult = quickSortHelper(sortElements).immediateResult;
                break;
            case "bubble":
                immediateResult = bubbleSortHelper(sortElements).immediateResult;
                break;
            default:
                break;
        }
        for (let i = 0; i < immediateResult.length; ++i) {
            await sortingAnimation(i, immediateResult);
        }
        setSortInProgress(false);
    };

    const sortingAnimation = (step: number, arr: number[][]): Promise<number[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                setSortElements(arr[step]);
                resolve();
            }, 10);
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
                resetArray={() => setSortElements(generateRandomArray(numberOfElement))} />
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

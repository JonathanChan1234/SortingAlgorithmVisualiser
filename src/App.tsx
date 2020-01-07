import React, { useState, useEffect } from 'react';
import './App.css';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';

import SortingOption from './components/SortingOption';
import SortingBar from './components/SortingBar';
import { generateRandomArray } from './utils/utils';
import { DEFAULT_NUMBER_OF_ELEMENT } from './utils/constants';
import { insertionSortByIndex } from './sorting/insertionSort';
import { selectionSortByIndex } from './sorting/selectionSort';

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
        switch (sortingMethod) {
            case "insertion":
                await insertionSort();
                break;
            case "selection":
                await selectionSort();
                break;
            case "merge":
                break;
            default:
                break;
        }
        setSortInProgress(false);
    };

    const insertionSort = async () => {
        const insertionSortIteration = (i: number, newArr: Array<number>): Promise<number[]> => {
            return new Promise(resolve => {
                setTimeout(() => {
                    const updatedArray = insertionSortByIndex(i, [...newArr]);
                    setSortElements(updatedArray);
                    resolve(updatedArray);
                }, 10);
            });
        };
        setSortInProgress(true);
        let arr = [...sortElements];
        for (let i = 1; i < numberOfElement; ++i) {
            arr = await insertionSortIteration(i, arr);
        }
    };

    const selectionSort = async () => {
        const selectionSortIteration = (i: number, newArr: Array<number>): Promise<number[]> => {
            return new Promise(resolve => {
                setTimeout(() => {
                    const updatedArray = selectionSortByIndex(i, [...newArr]);
                    setSortElements(updatedArray);
                    resolve(updatedArray);
                }, 10);
            });
        };
        let arr = [...sortElements];
        for (let i = 0; i < numberOfElement - 1; ++i) {
            arr = await selectionSortIteration(i, arr);
        }
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Sorting Algorithm Visualiser
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <SortingOption
                sortingMethod={sortingMethod}
                sortInProgress={sortInProgress}
                numberOfElement={numberOfElement}
                sort={() => sort()}
                updateSortingMethod={(method) => setSortingMethod(method)}
                updateSortingElement={(number) => setNumberOfElement(number)} />
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

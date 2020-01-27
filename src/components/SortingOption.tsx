import * as React from 'react';
import Box from '@material-ui/core/Box';
import { Slider, Button, Select, MenuItem } from '@material-ui/core';

type SortingOptionProp = {
    minNumberOfElement: number;
    maxNumberOfElement: number;
    defaultNumberOfNumber: number;
    numberOfElement: number;
    sortInProgress: boolean;
    sortingMethod: string;
    updateSortingElement: (numberOfElement: number) => void;
    updateSortingMethod: (method: string) => void;
    resetArray: () => void;
    sort: () => void;
};

const SortingOption: React.FC<SortingOptionProp> = ({
    maxNumberOfElement,
    minNumberOfElement,
    defaultNumberOfNumber,
    numberOfElement,
    sortingMethod,
    sortInProgress,
    sort,
    updateSortingMethod,
    updateSortingElement,
    resetArray,
}) => {
    return (
        <Box
            flexDirection="column"
            display="flex">
            <Box>
                <h2>Sorting Algorithm Visualiser</h2>
                <h3>Options</h3>
            </Box>
            <Box
                flexDirection="row"
                display="flex"
                alignItems="center"
                justifyContent="center">
                <Box p={1}>
                    <Button
                        disabled={sortInProgress}
                        onClick={() => resetArray()}>
                        Reset Array</Button>
                </Box>
                <Box p={1}>
                    <p>Number of Element: {numberOfElement}</p>
                    <Slider
                        getAriaValueText={(value: number) => { return value + ""; }}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        onChange={(event, value) => updateSortingElement(value as number)}
                        value={numberOfElement}
                        defaultValue={defaultNumberOfNumber}
                        min={minNumberOfElement}
                        max={maxNumberOfElement}
                        disabled={sortInProgress} />
                </Box>
                <Box p={1}>
                    <Select
                        disabled={sortInProgress}
                        onChange={(event) => updateSortingMethod(event.target.value as string)}
                        value={sortingMethod}>
                        <MenuItem value="insertion">Insertion Sort</MenuItem>
                        <MenuItem value="merge">Merge Sort</MenuItem>
                        <MenuItem value="selection">Selection Sort</MenuItem>
                        <MenuItem value="quick">Quick Sort</MenuItem>
                        <MenuItem value="bubble">Bubble Sort</MenuItem>
                    </Select>
                </Box>
                <Box p={1}>
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={sortInProgress}
                        onClick={() => sort()}>Sort</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SortingOption;
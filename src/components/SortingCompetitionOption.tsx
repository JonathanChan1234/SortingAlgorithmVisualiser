import * as React from 'react';
import { Box, Button, Slider } from '@material-ui/core';

type SortingCompetitionOptionProps = {
    defaultNumberOfElement: number,
    minNumberOfElement: number,
    maxNumberOfElement: number,
    sortInProgress: boolean,
    numberOfElement: number,
    resetArray: () => void,
    updateSortingElement: (number: number) => void,
    sort: () => void,
};

const SortingCompetitionOption: React.FC<SortingCompetitionOptionProps> = ({
    defaultNumberOfElement,
    minNumberOfElement,
    maxNumberOfElement,
    sortInProgress,
    numberOfElement,
    resetArray,
    updateSortingElement,
    sort,
}) => {
    return (
        <Box
            flexDirection="column"
            display="flex">
            <Box>
                <h2>Sorting Algorithm Competition</h2>
                <h3>Option</h3>
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
                        defaultValue={defaultNumberOfElement}
                        min={minNumberOfElement}
                        max={maxNumberOfElement}
                        disabled={sortInProgress} />
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

export default SortingCompetitionOption;
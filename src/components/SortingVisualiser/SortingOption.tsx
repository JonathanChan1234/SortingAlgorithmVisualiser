import * as React from 'react';
import Box from '@material-ui/core/Box';
import { Slider, Button, Select, MenuItem } from '@material-ui/core';
import { sortingConfiguraiton } from '../../sorting/configuration';

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
        <Box flexDirection='column' display='flex'>
            <h2 style={{ margin: 0 }}>Sorting Algorithm Visualiser</h2>
            <Box
                flexDirection='row'
                display='flex'
                alignItems='center'
                justifyContent='center'>
                <Box p={1}>
                    <Button
                        disabled={sortInProgress}
                        onClick={() => resetArray()}>
                        Reset Array
                    </Button>
                </Box>
                <Box p={1}>
                    <p>Number of Element: {numberOfElement}</p>
                    <Slider
                        getAriaValueText={(value: number) => {
                            return value + '';
                        }}
                        aria-labelledby='discrete-slider'
                        valueLabelDisplay='auto'
                        onChange={(event, value) =>
                            updateSortingElement(value as number)
                        }
                        value={numberOfElement}
                        defaultValue={defaultNumberOfNumber}
                        min={minNumberOfElement}
                        max={maxNumberOfElement}
                        disabled={sortInProgress}
                    />
                </Box>
                <Box p={1}>
                    <Select
                        disabled={sortInProgress}
                        onChange={(event) =>
                            updateSortingMethod(event.target.value as string)
                        }
                        value={sortingMethod}>
                        {Object.keys(sortingConfiguraiton).map((method) => (
                            <MenuItem
                                value={sortingConfiguraiton[method].value}>
                                {sortingConfiguraiton[method].name}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box p={1}>
                    <Button
                        variant='contained'
                        color='secondary'
                        disabled={sortInProgress}
                        onClick={() => sort()}>
                        Sort
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SortingOption;

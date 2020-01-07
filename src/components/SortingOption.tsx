import * as React from 'react';
import Box from '@material-ui/core/Box';
import { Slider, Button, makeStyles, Theme, createStyles, Select, MenuItem } from '@material-ui/core';
import { MIN_NUMBER_OF_ELEMENT, DEFAULT_NUMBER_OF_ELEMENT, MAX_NUMBER_OF_ELEMENT } from '../utils/constants';

type SortingOptionProp = {
    numberOfElement: number;
    sortInProgress: boolean;
    sortingMethod: string;
    updateSortingElement: (numberOfElement: number) => void;
    updateSortingMethod: (method: string) => void;
    sort: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.down('sm')]: {
                width: 100,
            },
            [theme.breakpoints.up('md')]: {
                width: 300,
            },
            [theme.breakpoints.up('lg')]: {
                width: 400,
            },
        },
        select: {
            minWidth: 100,
        }
    }),
);

const SortingOption: React.FC<SortingOptionProp> = ({
    numberOfElement,
    sortingMethod,
    sortInProgress,
    sort,
    updateSortingMethod,
    updateSortingElement,
}) => {
    const classes = useStyles();
    return (
        <Box
            flexDirection="row"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={1} m={1}>
            <Box p={1}>
                <h3>Sorting Options</h3>
            </Box>
            <Box p={1}>
                <p>Number of Element: {numberOfElement}</p>
                <Slider
                    className={classes.root}
                    defaultValue={DEFAULT_NUMBER_OF_ELEMENT}
                    getAriaValueText={(value: number) => { return value + ""; }}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    onChange={(event, value) => updateSortingElement(value as number)}
                    value={numberOfElement}
                    min={MIN_NUMBER_OF_ELEMENT}
                    max={MAX_NUMBER_OF_ELEMENT}
                    disabled={sortInProgress} />
            </Box>
            <Box p={1}>
                <Select
                    onChange={(event) => updateSortingMethod(event.target.value as string)}
                    value={sortingMethod}
                    className={classes.select}>
                    <MenuItem value="insertion">Insertion Sort</MenuItem>
                    <MenuItem value="merge">Merge Sort</MenuItem>
                    <MenuItem value="selection">Selection Sort</MenuItem>
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
    );
};

export default SortingOption;
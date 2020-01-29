import React from 'react';
import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Paper,
    makeStyles,
    Theme
} from '@material-ui/core';
import { SortElements } from '../types/type';

const useStyles = makeStyles((theme: Theme) => ({
    comparisonTable: {
        [theme.breakpoints.down('md')]: {
            width: "85%",
            height: 100,
        },
        [theme.breakpoints.up('lg')]: {
            minWidth: 600,
            maxWidth: 750,
        },
    }
}));

type SortingCompetitionTableProp = {
    sortElements?: SortElements
};

const SortingCompetitionTable: React.FC<SortingCompetitionTableProp> = ({ sortElements }) => {
    const classes = useStyles();
    const renderTableRow = () => {
        if (!sortElements) return;
        return Object.keys(sortElements).map(sortElementKey => (
            <TableRow key={sortElementKey}>
                <TableCell component="th" scope="row">{sortElementKey}</TableCell>
                <TableCell>{sortElements[sortElementKey].comparison}</TableCell>
            </TableRow>
        ));
    };

    return (
        <TableContainer component={Paper} className={classes.comparisonTable}>
            <Table size="small" className={classes.comparisonTable}>
                <TableHead>
                    <TableRow>
                        <TableCell>Sorting Method</TableCell>
                        <TableCell>Comparison</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderTableRow()}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SortingCompetitionTable;
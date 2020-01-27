import React from 'react';
import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Paper,
    makeStyles
} from '@material-ui/core';
import { SortElements } from '../types/type';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        maxWidth: 700
    }
});

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
        <TableContainer component={Paper} className={classes.table}>
            <Table size="small" className={classes.table}>
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
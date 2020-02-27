import React, { useReducer } from 'react';
import { makeStyles, createStyles, Button, Box } from '@material-ui/core';
import PathFinderBlock from './PathFinderBlock';
import { reducer } from './reducer';
import {
    ROW_INCREMENT,
    ROW_DECREMENT,
    COLUMN_INCREMENT,
    COLUMN_DECREMENT,
    PathFinderProps
} from './type';

const initState: PathFinderProps = {
    blockColumn: 10,
    blockRow: 10,
    obstacleCoordinate: {}
};

const PathFinder: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    const useStyles = makeStyles(() =>
        createStyles({
            blockRow: {
                display: 'flex',
                flexDirection: 'row'
            },
            numberText: {
                margin: 5
            },
            titleText: {
                size: 14,
                margin: 10
            }
        })
    );
    const classes = useStyles();

    const renderBlockArea = () => {
        const blockArea = [];
        const { blockColumn, blockRow } = state;
        for (let i = 0; i < blockRow; ++i) {
            const columnBlock = [];
            for (let j = 0; j < blockColumn; ++j) {
                columnBlock.push(
                    <PathFinderBlock key={j} column={j} row={i} />
                );
            }
            blockArea.push(
                <div className={classes.blockRow} key={i}>
                    {columnBlock}
                </div>
            );
        }
        return blockArea;
    };

    const onBlockMouseDown = () => {};

    const onBlockMouseUp = () => {};

    const onBlockMouseHover = () => {};

    return (
        <Box display='flex' alignItems='center' flexDirection='column'>
            <p>React reducer test</p>
            <Box display='flex' flexDirection='row' m={1}>
                <p className={classes.titleText}>Row</p>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => dispatch({ type: ROW_INCREMENT })}>
                    +
                </Button>
                <p className={classes.numberText}>{state.blockRow}</p>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => dispatch({ type: ROW_DECREMENT })}>
                    -
                </Button>
            </Box>
            <Box display='flex' flexDirection='row' m={1}>
                <p className={classes.titleText}>Column</p>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => dispatch({ type: COLUMN_INCREMENT })}>
                    +
                </Button>
                <p className={classes.numberText}>{state.blockColumn}</p>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => dispatch({ type: COLUMN_DECREMENT })}>
                    -
                </Button>
            </Box>
            <Box display='flex' flexDirection='column'>
                {renderBlockArea()}
            </Box>
        </Box>
    );
};

export default PathFinder;

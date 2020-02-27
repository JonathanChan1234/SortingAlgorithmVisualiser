import React from 'react';
import { Tooltip, makeStyles, createStyles } from '@material-ui/core';

type ReactReducerBlockProps = {
    column: number;
    row: number;
};

const PathFinderBlock: React.FC<ReactReducerBlockProps> = ({ column, row }) => {
    const useStyles = makeStyles(() =>
        createStyles({
            block: {
                height: 25,
                width: 25,
                backgroundColor: 'white',
                border: `1px solid black`,
                userSelect: 'none'
            }
        })
    );
    const classes = useStyles();
    return (
        <Tooltip title={`(${column}, ${row})`} placement='top'>
            <div
                className={classes.block}
                onMouseDown={() =>
                    console.log(`on mouse down: (${row}, ${column})`)
                }
                onMouseUp={() =>
                    console.log(`on mouse up: (${row}, ${column})`)
                }
                onMouseEnter={() =>
                    console.log(`on hover: (${row}, ${column})`)
                }></div>
        </Tooltip>
    );
};

export default PathFinderBlock;

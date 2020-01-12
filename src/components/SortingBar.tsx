import * as React from 'react';
import { makeStyles, Theme, createStyles, Tooltip } from '@material-ui/core';

type SortingBarProp = {
    color: string;
    height: number;
    numberOfElement: number;
};

const SortingBar: React.FC<SortingBarProp> = ({ color, height, numberOfElement }) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            bar: {
                width: `calc(100% / ${numberOfElement})`,
                height: `calc(100% * ${height} / 10000)`,
                backgroundColor: color,
                border: `1px solid`,
            }
        }),
    );
    const classes = useStyles();

    return (
        <>
            <Tooltip title={`${height}`} placement="top">
                <div className={classes.bar}></div>
            </Tooltip>
        </>
    );
};

export default SortingBar;
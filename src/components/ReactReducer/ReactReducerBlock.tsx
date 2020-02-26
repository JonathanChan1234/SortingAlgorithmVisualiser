import React from 'react';
import { Tooltip, makeStyles, createStyles } from '@material-ui/core';

type ReactReducerBlockProps = {
	column: number;
	row: number;
};

const ReactReducerBlock: React.FC<ReactReducerBlockProps> = ({
	column,
	row
}) => {
	const useStyles = makeStyles(() =>
		createStyles({
			block: {
				height: 25,
				width: 25,
				backgroundColor: 'white',
				border: `1px solid black`
			}
		})
	);
	const classes = useStyles();
	return (
		<Tooltip title={`(${column}, ${row})`} placement='top'>
			<div className={classes.block}></div>
		</Tooltip>
	);
};

export default ReactReducerBlock;

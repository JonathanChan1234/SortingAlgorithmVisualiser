import * as React from 'react';
import { makeStyles, Theme, createStyles, Tooltip } from '@material-ui/core';
import { ELEMENT_MAX_SIZE } from '../utils/utils';

type SortingBarProp = {
	color: string;
	height: number;
	numberOfElement: number;
};

const SortingBar: React.FC<SortingBarProp> = ({ color, height, numberOfElement }) => {
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			bar: {
				height: `calc(100% * ${height} / ${ELEMENT_MAX_SIZE})`,
				width: `calc(100% / ${numberOfElement})`,
				backgroundColor: color,
				border: `1px solid`,
			},
		})
	);
	const classes = useStyles();

	return (
		<>
			<Tooltip title={`${height}`} placement='top'>
				<div className={classes.bar}></div>
			</Tooltip>
		</>
	);
};

export default SortingBar;

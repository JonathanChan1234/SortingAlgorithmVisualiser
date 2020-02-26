import React, { useReducer } from 'react';
import ReactReducerBlock from './ReactReducerBlock';
import { makeStyles, createStyles, Button, Box } from '@material-ui/core';
import { ReactReducerProps, ActionType } from './type';

const initState: ReactReducerProps = {
	blockColumn: 10,
	blockRow: 10
};

const COLUMN_INCREMENT = 'COLUMN_INCREMENT';
const COLUMN_DECREMENT = 'COLUMN_DECREMENT';
const ROW_INCREMENT = 'ROW_INCREMENT';
const ROW_DECREMENT = 'ROW_DECREMENT';

const reducer = (state: ReactReducerProps, action: ActionType) => {
	console.log(state);
	switch (action.type) {
		case COLUMN_INCREMENT:
			return {
				...state,
				blockColumn: state.blockColumn + 1
			};
		case COLUMN_DECREMENT:
			return {
				...state,
				blockColumn: state.blockColumn - 1
			};
		case ROW_INCREMENT:
			return {
				...state,
				blockRow: state.blockRow + 1
			};
		case ROW_DECREMENT:
			return {
				...state,
				blockRow: state.blockRow - 1
			};
		default:
			return state;
	}
};

const ReactReducerTest: React.FC = () => {
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
					<ReactReducerBlock key={j} column={j} row={i} />
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

export default ReactReducerTest;

import React, { useState } from 'react';
import { Box, Button, Slider } from '@material-ui/core';

type SortingCompetitionOptionProps = {
	defaultNumberOfElement: number;
	minNumberOfElement: number;
	maxNumberOfElement: number;
	sortInProgress: boolean;
	resetArray: () => void;
	updateSortingElement: (number: number) => void;
	sort: () => void;
};

const SortingCompetitionOption: React.FC<SortingCompetitionOptionProps> = ({
	defaultNumberOfElement,
	minNumberOfElement,
	maxNumberOfElement,
	sortInProgress,
	resetArray,
	updateSortingElement,
	sort
}) => {
	const [numberOfElement, setNumberOfElement] = useState<number>(20);
	return (
		<Box flexDirection='column' display='flex'>
			<h2 style={{ margin: 0 }}>Sorting Algorithm Competition</h2>
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
				<Box style={{ margin: 0 }}>
					<p>Number of Element: {numberOfElement}</p>
					<Slider
						getAriaValueText={value => value + ''}
						aria-labelledby='discrete-slider'
						valueLabelDisplay='auto'
						onChange={(event, number) => {
							setNumberOfElement(number as number);
							updateSortingElement(number as number);
						}}
						value={numberOfElement}
						defaultValue={defaultNumberOfElement}
						min={minNumberOfElement}
						max={maxNumberOfElement}
						disabled={sortInProgress}
					/>
				</Box>
				<Box p={1}>
					<Button
						variant='contained'
						color='secondary'
						disabled={sortInProgress}
						onClick={() => sort()}>
						Start Sorting
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default SortingCompetitionOption;

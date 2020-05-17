import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

import { generateRandomArray } from '../../utils/utils';
import { SortingResult, SortElements } from '../../types/type';
// Components
import SortingCompetitionOption from './SortingCompetitionOption';
import SortingModel from './SortingModel';
import SortingCompetitionTable from './SortingCompetitionTable';

import useThrottleEffect from '../../hook/throttle';
import { sortingConfiguration } from '../../sorting/configuration';

const animationTimeout: NodeJS.Timeout[] = [];

const SortingCompetition: React.FC = () => {
	const [numberOfElement, setNumberOfElement] = useState<number>(20);
	const [sortElements, setSortElements] = useState<SortElements>();
	const [sortInProgress, setSortInProgress] = useState<boolean>(false);
	const [reset, setReset] = useState<boolean>(false);
	const throttleItem = useThrottleEffect(numberOfElement, 20, 2000);

	useEffect(() => {
		initSortElements(throttleItem);
	}, [throttleItem, reset]);

	useEffect(() => {
		animationTimeout.length = 0;
		return () => animationTimeout.forEach((timeout) => clearTimeout(timeout));
	}, []);

	const initSortElements = (number: number) => {
		const randomArray = generateRandomArray(number);
		const newSortElements: SortElements = {};
		Object.keys(sortingConfiguration).forEach((sortingAlgorithm) => {
			newSortElements[sortingAlgorithm] = {
				sortArray: [...randomArray],
				animations: [],
				comparison: 0,
			};
		});
		setSortElements(newSortElements);
	};

	const renderSortingModel = () => {
		if (!sortElements) return;
		return Object.keys(sortElements).map((algorithm) => (
			<SortingModel
				key={algorithm}
				algorithm={algorithm}
				numberOfElement={throttleItem}
				sortArray={sortElements[algorithm].sortArray}
				animations={sortElements[algorithm].animations}
			/>
		));
	};

	const sortCompetitionStart = () => {
		setSortInProgress(true);
		if (!sortElements) return;
		const sortingResult: SortingResult[] = [];
		Object.keys(sortElements).forEach((algorithm) => {
			const sortArray = sortElements[algorithm].sortArray;
			sortingResult.push({ ...sortingConfiguration[algorithm].sort(sortArray) });
		});
		startAnimation(sortingResult)
			.then(() => setSortInProgress(false))
			.catch((err) => alert(err.message));
	};

	const startAnimation = async (sortingResult: SortingResult[]) => {
		// Find the maximum number of immediate result among all sorting results
		let maxIteration = 0;
		sortingResult.forEach((result) => {
			if (result.immediateResult.length > maxIteration)
				maxIteration = result.immediateResult.length;
		});

		let newSortArray: SortElements = {};
		for (let iteration = 0; iteration < maxIteration; ++iteration) {
			for (const sortingResultByAlgorithm of sortingResult) {
				const iterationLength = sortingResultByAlgorithm.immediateResult.length;
				// If the sorting is not yet finished, update the immediate result and animation
				if (iteration < iterationLength) {
					newSortArray = {
						...newSortArray,
						[sortingResultByAlgorithm.algorithm]: {
							comparison: iteration,
							sortArray: sortingResultByAlgorithm.immediateResult[iteration],
							animations: sortingResultByAlgorithm.animations[iteration],
						},
					};
				}

				// Once the sorting is finished, clear the animation
				if (iteration === iterationLength - 1) {
					newSortArray = {
						...newSortArray,
						[sortingResultByAlgorithm.algorithm]: {
							comparison: iteration,
							sortArray: sortingResultByAlgorithm.immediateResult[iteration],
							animations: [],
						},
					};
				}
			}
			await sortAnimation(newSortArray);
		}
	};

	const sortAnimation = (newSortElements: SortElements) => {
		return new Promise((resolve) => {
			const timeoutId = setTimeout(() => {
				console.log(`sorting aniamtion called`);
				setSortElements(newSortElements);
				resolve();
			}, 10);
			animationTimeout.push(timeoutId);
		});
	};

	return (
		<Box
			display='flex'
			flexDirection='column'
			style={{ width: '100%' }}
			alignItems='center'
			justifyContent='center'>
			<SortingCompetitionOption
				minNumberOfElement={10}
				maxNumberOfElement={30}
				defaultNumberOfElement={20}
				sortInProgress={sortInProgress}
				sort={() => sortCompetitionStart()}
				updateSortingElement={(number) => setNumberOfElement(number)}
				resetArray={() => setReset(!reset)}
			/>
			<SortingCompetitionTable sortElements={sortElements} />
			<Box display='flex' flexDirection='row' flexWrap='wrap' style={{ width: '80%' }} m={1}>
				{renderSortingModel()}
			</Box>
		</Box>
	);
};

export default SortingCompetition;

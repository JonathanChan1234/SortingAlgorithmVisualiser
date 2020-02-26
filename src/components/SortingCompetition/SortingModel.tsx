import * as React from 'react';
import SortingBar from '../SortingBar';
import { animationColor, defaultColor } from '../../utils/constants';
import { Box, makeStyles, Theme } from '@material-ui/core';

type SortingModelProps = {
	algorithm: string;
	numberOfElement: number;
	sortArray: number[];
	animations: number[];
};

const useStyle = makeStyles((theme: Theme) => ({
	sortingModelContainer: {
		[theme.breakpoints.down('sm')]: {
			width: '40%'
		},
		[theme.breakpoints.up('md')]: {
			width: '30%'
		},
		[theme.breakpoints.up('lg')]: {
			width: '20%'
		}
	},
	sortingModel: {
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			height: 80
		},
		[theme.breakpoints.up('md')]: {
			height: 150
		},
		[theme.breakpoints.up('lg')]: {
			height: 200
		}
	}
}));

const SortingModel: React.FC<SortingModelProps> = ({
	algorithm,
	numberOfElement,
	sortArray,
	animations
}) => {
	const styles = useStyle();
	const renderSortingBar = (): Array<JSX.Element> => {
		let color = 0;
		return sortArray.map((element, index) => (
			<SortingBar
				key={index}
				numberOfElement={numberOfElement}
				height={element}
				color={
					animations.includes(index)
						? animationColor[color++ % 3]
						: defaultColor
				}
			/>
		));
	};

	return (
		<Box m={1} className={styles.sortingModelContainer}>
			<h6>{algorithm}</h6>
			<Box
				flexDirection='row'
				display='flex'
				className={styles.sortingModel}>
				{renderSortingBar()}
			</Box>
		</Box>
	);
};

export default SortingModel;

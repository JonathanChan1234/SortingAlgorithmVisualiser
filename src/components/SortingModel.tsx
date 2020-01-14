import * as React from 'react';
import SortingBar from './SortingBar';
import { animationColor, defaultColor } from '../utils/constants';
import { Box } from '@material-ui/core';

type SortingModelProps = {
    algorithm: string
    numberOfElement: number,
    sortArray: number[],
    animations: number[],
};

const SortingModel: React.FC<SortingModelProps> = ({
    algorithm,
    numberOfElement,
    sortArray,
    animations,
}) => {
    const renderSortingBar = (): Array<JSX.Element> => {
        let color = 0;
        return sortArray.map((element, index) => (
            <SortingBar
                key={index}
                numberOfElement={numberOfElement}
                height={element}
                color={(animations.includes(index)) ? animationColor[(color++ % 3)] : defaultColor} />
        ));
    };

    return (
        <Box m={1} style={{ width: "30%" }}>
            <h6>{algorithm}</h6>
            <Box
                flexDirection="row"
                display="flex"
                style={{ height: 200, width: "100%" }}>
                {renderSortingBar()}
            </Box>
        </Box>
    );
};

export default SortingModel;
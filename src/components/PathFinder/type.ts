export type PathFinderProps = {
    blockColumn: number;
    blockRow: number;
    obstacleCoordinate: {
        start?: {
            row: number;
            column: number;
        };
        end?: {
            row: number;
            column: number;
        };
    };
};

export const COLUMN_INCREMENT = 'COLUMN_INCREMENT';
export const COLUMN_DECREMENT = 'COLUMN_DECREMENT';
export const ROW_INCREMENT = 'ROW_INCREMENT';
export const ROW_DECREMENT = 'ROW_DECREMENT';
export const SET_OBSTACLE_START_COOR = 'SET_OBSTACLE_START_COOR';
export const SET_OBSTACLE_END_COOR = 'SET_OBSTACLE_END_COOR';

interface columnIncrementAction {
    type: typeof COLUMN_INCREMENT;
}

interface columnDecrementAction {
    type: typeof COLUMN_DECREMENT;
}

interface rowIncrementAction {
    type: typeof ROW_INCREMENT;
}

interface rowDecrementAction {
    type: typeof ROW_DECREMENT;
}

interface setObstacleStartCoorAction {
    type: typeof SET_OBSTACLE_START_COOR;
    row: number;
    column: number;
}

interface setObstacleEndCoorAction {
    type: typeof SET_OBSTACLE_END_COOR;
    row: number;
    column: number;
}

export type ActionType =
    | columnDecrementAction
    | columnIncrementAction
    | rowIncrementAction
    | rowDecrementAction
    | setObstacleEndCoorAction
    | setObstacleStartCoorAction;

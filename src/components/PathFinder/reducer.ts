import {
    ActionType,
    PathFinderProps,
    COLUMN_INCREMENT,
    COLUMN_DECREMENT,
    ROW_INCREMENT,
    ROW_DECREMENT
} from './type';

export const reducer = (state: PathFinderProps, action: ActionType) => {
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

import {FETCH_USER_INFO} from './../actions/types';

const initialState = {
    details: {}
};


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_INFO:
            return {
                ...state,
                details: action.payload
            };
        default:
            return state;
    }
}

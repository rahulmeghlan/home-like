import {FETCH_REPO_LIST} from './../actions/types';

const initialState = {
    repos: {}
};


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REPO_LIST:
            return {
                ...state,
                repos: action.payload
            };
        default:
            return state;
    }
}

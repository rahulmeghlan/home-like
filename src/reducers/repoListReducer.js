import {FETCH_REPO_LIST} from './../actions/types';

const initialState = {
    reposList: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REPO_LIST:
            console.log('>>>> ', state);
            console.log('>>>> ', action);
            return {
                ...state,
                repoList: action.payload
            };
        default:
            return state;
    }
}

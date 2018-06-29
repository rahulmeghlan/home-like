import {combineReducers} from 'redux';
import repoListReducer from './repoListReducer';
// import userInfoReducer from './userInfoReducer';


export default combineReducers({
    repoList: repoListReducer,
})

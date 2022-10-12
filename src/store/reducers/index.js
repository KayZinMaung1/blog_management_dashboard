import { combineReducers } from 'redux';
import auth from './auth';
import error from "./error";
import status from './status';
import blog from "./blog";

const reducers = combineReducers({
    auth,
    error,
    status,
    blog,
});
export default reducers;
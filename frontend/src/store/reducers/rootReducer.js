import { combineReducers } from 'redux';
// import authReducer from './authReducer';

// export default combineReducers({
//     auth: authReducer,
// });

const initState = {
    items: []
}

const rootReducer = (state = initState, action) => {
    return state;
}

export default rootReducer;
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {appReducer} from "./appReducer";
import {formularReducer} from "./formularReducer";

let reducers = combineReducers({
    appMain: appReducer,
    formular : formularReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;


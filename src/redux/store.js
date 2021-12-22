import { createStore, combineReducers, applyMiddleware } from "redux";
import taskReducer from "./reducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({taskReducer})

export const store = createStore(rootReducer,applyMiddleware(thunk))
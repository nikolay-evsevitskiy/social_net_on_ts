import { combineReducers } from 'redux';
import {createStore} from 'redux';
import profilePageReducer from "./profilePageReducer";
import dialogPageReducer from "./dialogsPageReducer";
import sideBarReducer from "./sideBarReducer";
import {StoreType} from "./store";

let reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogPage: dialogPageReducer,
    sideBar: sideBarReducer
})

let store: StoreType = createStore(reducers);

export default store

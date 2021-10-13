import { combineReducers } from 'redux';
import {createStore} from 'redux';
import profilePageReducer from "./profilePageReducer";
import dialogPageReducer from "./dialogsPageReducer";
import sideBarReducer from "./sideBarReducer";

export const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogPage: dialogPageReducer,
    sideBar: sideBarReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);


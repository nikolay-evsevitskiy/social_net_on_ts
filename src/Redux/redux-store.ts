import {combineReducers} from 'redux';
import {createStore} from 'redux';
import profilePageReducer from "./profilePageReducer";
import dialogPageReducer from "./dialogsPageReducer";
import sideBarReducer from "./sideBarReducer";
import usersReducer from "./usersPageReducer";
import authReducer from "./auth-reducer";
import {applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

export const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogPage: dialogPageReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


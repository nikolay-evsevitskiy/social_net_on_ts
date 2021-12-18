import {combineReducers} from 'redux';
import {createStore} from 'redux';
import profilePageReducer from "./profilePageReducer";
import dialogPageReducer from "./dialogsPageReducer";
import sideBarReducer from "./sideBarReducer";
import usersReducer from "./usersPageReducer";
import authReducer from "./auth-reducer";
import {applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";


export const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogPage: dialogPageReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


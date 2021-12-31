import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";

type SetUserDataType = ReturnType<typeof setAuthUserData>
export type GetAuthUserDataType = ReturnType<typeof getAuthUserData>


type ActionType = SetUserDataType
export type InitialStateAuthDataType = {
    data: {
        id: string | null
        email: string | null
        logIn: string | null
        isAuth: boolean
    }
}

const initialState: InitialStateAuthDataType = {
    data: {
        email: null,
        id: null,
        logIn: null,
        isAuth: false
    }
}

const authReducer = (state: InitialStateAuthDataType = initialState, action: ActionType): InitialStateAuthDataType => {
    switch (action.type) {
        case 'social-network/auth-reducer/SET-USER-DATA':
            return {
                ...state,
                data: {...action.data},
            }
        default:
            return state;
    }
};


const setAuthUserData = (email: string | null, id: string | null, logIn: string | null, isAuth: boolean) => {
    return {
        type: 'social-network/auth-reducer/SET-USER-DATA', data: {email, id, logIn, isAuth} as const
    }
}

export const getAuthUserData = () => async (dispatch: Dispatch<ActionType>) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(response.data.data.email, response.data.data.id, response.data.data.login, true))
    }
};
export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch<any>) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages : 'Some error';
        dispatch(stopSubmit('login', {_error: message}))
    }
};
export const logout = () => async (dispatch: Dispatch<ActionType>) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export default authReducer;
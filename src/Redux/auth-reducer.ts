import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

type SetUserDataType = ReturnType<typeof setAuthUserData>

type ActionType = SetUserDataType
type DataType = {
    id: number | null
    email: string | null
    login: string | null
}
export type InitialStateAuthDataType = {
    data: DataType
    messages: []
    fieldsErrors: []
    resultCode: 0 | 1
    isAuth: boolean
}

const initialState: InitialStateAuthDataType = {
    data: {
        id: null,
        email: null,
        login: null
    },
    messages: [],
    fieldsErrors: [],
    resultCode: 0,
    isAuth: false,

}

const authReducer = (state: InitialStateAuthDataType = initialState, action: ActionType): InitialStateAuthDataType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state,
                data: {...action.data},
                isAuth: action.isAuth
            }
        default:
            return state;
    }
};

const setAuthUserData = (email: string | null, id: number | null, login: string | null, isAuth: boolean) => {
    return {type: 'SET-USER-DATA', data: {email, id, login}, isAuth} as const
};
export const getAuthUserData = () => {
    return (dispatch: any) => {
        authAPI.me().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(response.data.data.email, response.data.data.id, response.data.data.login, true))
            }
        })
    }
};
export const login = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: any) => {
        authAPI.login(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                let action = stopSubmit('login')
                dispatch(action, {_error: 'Email is wrong'})
            }
        })
    }
};
export const logout = () => {
    return (dispatch: any) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            })
    }
};

export default authReducer
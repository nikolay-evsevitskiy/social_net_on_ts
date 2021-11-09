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
                isAuth: true
            }
        default:
            return state;
    }
};

export const setAuthUserData = (email: string | null, id: number | null, login: string | null) => {
    return {type: 'SET-USER-DATA', data: {email, id, login}} as const
};
export default authReducer
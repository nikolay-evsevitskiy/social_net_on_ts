type SetUserDataType = ReturnType<typeof setAuthUserData>

type ActionType = SetUserDataType
type DataType = {
    id: number
    email: string
    login: string
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
        id: 2,
        email: '',
        login: ''
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
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
};

export const setAuthUserData = (id: number, email: string, login: string) => {
    return {type: 'SET-USER-DATA', data: {id, email, login}} as const
};
export default authReducer
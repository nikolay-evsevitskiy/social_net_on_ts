import {getAuthUserData} from "./auth-reducer";


type InitializedSuccessType = ReturnType<typeof initializedSuccessAC>
type ActionType = InitializedSuccessType
export type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
};

const initializedSuccessAC = () => {
    return {type: 'INITIALIZED-SUCCESS'} as const
}

export const initializedApp = () => (dispatch: any) => {
    dispatch(getAuthUserData())
        .then(()=> {
            dispatch(initializedSuccessAC())
        })


};


export default appReducer
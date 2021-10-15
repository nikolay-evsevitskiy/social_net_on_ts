type FollowActionType = ReturnType<typeof followAC>
type UnfollowActionType = ReturnType<typeof unfollowAC>
type UsersActionType = ReturnType<typeof setUsersAC>
export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: UserLocationType
}
type UserLocationType = {
    country: string
    city: string
}
export type InitialStateTypeUsersPage = {
    users: Array<UserType>
}


const initialState: InitialStateTypeUsersPage = {
    users: []
}

const usersReducer = (state: InitialStateTypeUsersPage = initialState, action: FollowActionType | UnfollowActionType | UsersActionType): InitialStateTypeUsersPage => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(t => {
                    if (t.id === action.userId) {
                        return {...t, followed: true}
                    }
                    return t;
                })
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(t => {
                    if (t.id === action.userId) {
                        return {...t, followed: false}
                    }
                    return t;
                })
            }
        case 'SET-USERS':
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
            return state;
    }
};

export const followAC = (userId: number) => {
    return {type: "FOLLOW", userId} as const
};
export const unfollowAC = (userId: number) => {
    return {type: "UNFOLLOW", userId} as const
};
export const setUsersAC = (users: UserType[]) => {
    return {type: "SET-USERS", users} as const
};

export default usersReducer
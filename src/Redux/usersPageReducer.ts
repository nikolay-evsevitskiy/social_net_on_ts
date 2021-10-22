type FollowActionType = ReturnType<typeof followAC>
type UnfollowActionType = ReturnType<typeof unfollowAC>
type UsersActionType = ReturnType<typeof setUsersAC>
type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>
type SetTotalUserCountType = ReturnType<typeof setTotalUserCountAC>
type ActionType = FollowActionType | UnfollowActionType | UsersActionType | SetCurrentPageType | SetTotalUserCountType

export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    name: string
    status: string
    location: UserLocationType
}
type UserLocationType = {
    country: string
    city: string
}
export type InitialStateTypeUsersPage = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
}


const initialState: InitialStateTypeUsersPage = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
}

const usersReducer = (state: InitialStateTypeUsersPage = initialState, action: ActionType): InitialStateTypeUsersPage => {
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
                users: [...action.users]
            }
        case 'SET-CURRENT-PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET-TOTAL-USER-COUNT':
            return {
                ...state,
                totalUsersCount: action.totalCount
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
export const setCurrentPageAC = (currentPage: number) => {
    return {type: "SET-CURRENT-PAGE", currentPage} as const
}
export const setTotalUserCountAC = (totalCount: number) => {
    return {type: "SET-TOTAL-USER-COUNT", totalCount} as const
}

export default usersReducer
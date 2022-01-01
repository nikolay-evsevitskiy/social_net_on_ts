import {FollowType, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {UpdateObjectInArray} from "../utils/object-helper";

type FollowActionType = ReturnType<typeof followSuccess>
type UnfollowActionType = ReturnType<typeof unfollowSuccess>
type UsersActionType = ReturnType<typeof setUsers>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetTotalUserCountType = ReturnType<typeof setTotalUserCount>
type ToggleIsFetchingType = ReturnType<typeof toggleIsFetching>
type ToggleIsFollowingProgress = ReturnType<typeof toggleIsFollowingProgress>
type ActionType =
    FollowActionType
    | UnfollowActionType
    | UsersActionType
    | SetCurrentPageType
    | SetTotalUserCountType
    | ToggleIsFetchingType
    | ToggleIsFollowingProgress

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
    isFetching: boolean
    followingInProgress: number[]
}


const initialState: InitialStateTypeUsersPage = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state: InitialStateTypeUsersPage = initialState, action: ActionType): InitialStateTypeUsersPage => {
    switch (action.type) {
        case 'social-network/users-reducer/FOLLOW':
            return {
                ...state,
                users: UpdateObjectInArray(state.users, action.userId, {followed: true})
            }
        case 'social-network/users-reducer/UNFOLLOW':
            return {
                ...state,
                users: UpdateObjectInArray(state.users, action.userId, {followed: false})
            }
        case 'social-network/users-reducer/SET-USERS':
            return {
                ...state,
                users: [...action.users]
            }
        case 'social-network/users-reducer/SET-CURRENT-PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'social-network/users-reducer/SET-TOTAL-USER-COUNT':
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case 'social-network/users-reducer/TOGGLE-IS-FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'social-network/users-reducer/TOGGLE-IS-FOLLOWING-PROGRESS':
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};

export const followSuccess = (userId: number) => {
    return {type: 'social-network/users-reducer/FOLLOW', userId} as const
};
export const unfollowSuccess = (userId: number) => {
    return {type: 'social-network/users-reducer/UNFOLLOW', userId} as const
};
export const setUsers = (users: UserType[]) => {
    return {type: 'social-network/users-reducer/SET-USERS', users} as const
};
export const setCurrentPage = (currentPage: number) => {
    return {type: 'social-network/users-reducer/SET-CURRENT-PAGE', currentPage} as const
}
export const setTotalUserCount = (totalCount: number) => {
    return {type: 'social-network/users-reducer/SET-TOTAL-USER-COUNT', totalCount} as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {type: 'social-network/users-reducer/TOGGLE-IS-FETCHING', isFetching} as const
}
export const toggleIsFollowingProgress = (userId: number, followingInProgress: boolean) => {
    return {type: 'social-network/users-reducer/TOGGLE-IS-FOLLOWING-PROGRESS', followingInProgress, userId} as const
}

export const getUser = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    let response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUserCount(response.totalCount))
}
type ActionCreatorFollowUnfollowType = (userId: number) => FollowActionType | UnfollowActionType
type ApiMethodType = (id: number) => Promise<FollowType>

const followUnfollowFlow = async (userId: number, dispatch: Dispatch, apiMethod: ApiMethodType, actionCreator: ActionCreatorFollowUnfollowType) => {
    dispatch(toggleIsFollowingProgress(userId, true))
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(userId, false))

}

export const follow = (userId: number) => async (dispatch: any) => {
    await followUnfollowFlow(userId, dispatch, usersAPI.follow.bind(usersAPI), followSuccess)
}

export const unfollow = (userId: number) => async (dispatch: any) => {
    await followUnfollowFlow(userId, dispatch, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
}

export default usersReducer
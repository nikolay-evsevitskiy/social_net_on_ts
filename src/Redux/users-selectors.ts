import {AppStateType} from "./redux-store";
import {InitialStateTypeUsersPage} from "./users-reducer";


export const getUsersPage = (state: AppStateType): InitialStateTypeUsersPage => {
    return state.usersPage
}
export const getPageSize = (state: AppStateType): number => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType): number => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType): number => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType): boolean => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType): number[] => {
    return state.usersPage.followingInProgress
}
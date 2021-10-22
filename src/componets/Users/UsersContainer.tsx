import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
    followAC,
    InitialStateTypeUsersPage,
    setCurrentPageAC, setTotalUserCountAC,
    setUsersAC,
    unfollowAC,
    UserType
} from "../../Redux/usersPageReducer";
import {AppStateType} from "../../Redux/redux-store";
import React from "react";
import axios from "axios";
import Users from './Users'

type MapStateToPropsType= {
    usersPage: InitialStateTypeUsersPage
    pageSize: number
    totalUsersCount: number
    currentPage: number
}
type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users:  UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUserCount: (totalCount: number) => void
}
type UsersAPIComponentType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    usersPage: InitialStateTypeUsersPage
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUserCount: (totalCount: number) => void
}

class UsersAPIComponent extends React.Component<UsersAPIComponentType> {
    componentDidMount() {
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUserCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render () {
        return <Users usersCount={this.props.usersPage.totalUsersCount}
                      pageSize={this.props.pageSize}
                      onPageChanged={this.onPageChanged}
                      currentPage={this.props.currentPage}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
                      usersPage={this.props.usersPage}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }

}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users:  Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUserCount: (totalCount: number) => {
            dispatch(setTotalUserCountAC(totalCount))
        }

    }

}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)
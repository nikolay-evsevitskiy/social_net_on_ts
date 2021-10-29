import {connect} from 'react-redux';
import {
    follow,
    InitialStateTypeUsersPage,
    setCurrentPage, setTotalUserCount,
    setUsers, toggleIsFetching,
    unfollow,
    UserType
} from '../../Redux/usersPageReducer';
import {AppStateType} from '../../Redux/redux-store';
import React from 'react';
import Users from './Users';
import {Preloader} from "../Common/Preloader/Preloader";
import {getUsers} from "../../api/api";

type MapStateToPropsType = {
    usersPage: InitialStateTypeUsersPage
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
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
    toggleIsFetching: (isFetching: boolean) => void
}

class UsersAPIComponent extends React.Component<UsersAPIComponentType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)

        getUsers(this.props.usersPage.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
            this.props.setTotalUserCount(data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })
    }

    render() {
        return <>
            <Preloader isFetching={this.props.usersPage.isFetching}/>
            <Users usersCount={this.props.usersPage.totalUsersCount}
                   pageSize={this.props.pageSize}
                   onPageChanged={this.onPageChanged}
                   currentPage={this.props.currentPage}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   usersPage={this.props.usersPage}/>
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }

}

export const UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUserCount,
    toggleIsFetching
})(UsersAPIComponent)
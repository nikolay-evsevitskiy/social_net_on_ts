import {connect} from 'react-redux';
import {
    follow, getUser,
    InitialStateTypeUsersPage,
    setCurrentPage,
    unfollow
} from '../../Redux/users-reducer';
import {AppStateType} from '../../Redux/redux-store';
import React from 'react';
import {Preloader} from "../Common/Preloader/Preloader";
import {compose} from 'redux';
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersPage
} from "../../Redux/users-selectors";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {Users} from "./Users";

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    getUser: (currentPage: number, pageSize: number) => void

}
type MapStateToPropsType = {
    usersPage: InitialStateTypeUsersPage
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
type UsersAPIComponentType = MapStateToPropsType & MapDispatchToPropsType

class UsersAPIComponent extends React.Component<UsersAPIComponentType> {
    componentDidMount() {
        const {usersPage, pageSize} = this.props
        this.props.getUser(usersPage.currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUser(pageNumber, pageSize)
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
                   usersPage={this.props.usersPage}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersPage: getUsersPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }

}

export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        getUser

    })
)(UsersAPIComponent)
import {connect} from 'react-redux';
import {
    follow, getUser,
    InitialStateTypeUsersPage,
    setCurrentPage,
    unfollow
} from '../../Redux/usersPageReducer';
import {AppStateType} from '../../Redux/redux-store';
import React from 'react';
import Users from './Users';
import {Preloader} from "../Common/Preloader/Preloader";
import {compose} from 'redux';

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
        this.props.getUser(this.props.usersPage.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUser(pageNumber, this.props.pageSize)
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
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }

}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        getUser

    })
)(UsersAPIComponent)
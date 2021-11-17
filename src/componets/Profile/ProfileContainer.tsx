import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileStateType, updateStatus} from "../../Redux/profilePageReducer";
import {AppStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = {
    profile: ProfileStateType
    isAuth: boolean
    status: string
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}
type PathParamsType = {
    userId: string
}
type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType


class ProfileAPIComponent extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2';
        }

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return <Profile profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}/>
    }

}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status

})

export default compose<React.ComponentType>(
    withRouter,
    WithAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        getUserProfile,
        updateStatus,
        getStatus
    })
)(ProfileAPIComponent)
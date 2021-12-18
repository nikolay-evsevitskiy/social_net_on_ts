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
    authorizedUserId: string | null
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}
type PathParamsType = {
    userId: any
}

type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsType = OwnPropsType & RouteComponentProps<PathParamsType>


class ProfileAPIComponent extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login')

            }
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
    isAuth: state.auth.data.isAuth,
    status: state.profilePage.status,
    authorizedUserId: state.auth.data.id

})

export default compose<React.ComponentType>(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, {
        getUserProfile,
        updateStatus,
        getStatus
    })
)(ProfileAPIComponent)
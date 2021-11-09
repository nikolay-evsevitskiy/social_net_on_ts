import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {ProfileStateType, setUserProfile} from "../../Redux/profilePageReducer";
import {AppStateType} from "../../Redux/redux-store";
import {usersAPI} from "../../api/api";
import {RouteComponentProps, withRouter} from "react-router-dom";

type MapStateToPropsType = {
    profile: ProfileStateType
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileStateType) => void
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
        usersAPI.setUser(userId).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return <Profile profile={this.props.profile}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileAPIComponent);

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent)
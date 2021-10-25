import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileStateType, setUserProfile} from "../../Redux/profilePageReducer";
import {AppStateType} from "../../Redux/redux-store";

type ProfileContainerType = {
    profile: ProfileStateType
    setUserProfile: (profile: ProfileStateType) => void
}


class ProfileAPIComponent extends React.Component<ProfileContainerType> {
    componentDidMount() {
        axios.get<ProfileStateType>(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return <Profile profile={this.props.profile}/>
    }
}

type MapStateToPropsType = {
    profile: ProfileStateType
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileStateType) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {},AppStateType >(mapStateToProps, {setUserProfile})(ProfileAPIComponent)
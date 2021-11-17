import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfileStateType} from "../../Redux/profilePageReducer";


type ProfileType = {
    profile: ProfileStateType
    status: string
    updateStatus: (status: string) => void
}



function Profile(props: ProfileType) {

    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;
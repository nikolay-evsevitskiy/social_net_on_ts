import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfileStateType} from "../../Redux/profile-reducer";


type ProfileType = {
    profile: ProfileStateType
    status: string
    updateStatus: (status: string) => void
}



function Profile(props: ProfileType) {

    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer newPostText={'CHECK'}/>
        </div>
    )
}

export default Profile;
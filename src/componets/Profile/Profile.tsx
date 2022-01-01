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

export const Profile: React.FC<ProfileType> = ({profile, status, updateStatus}) => {

    return (
        <div className={s.content}>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}/>
            <MyPostsContainer newPostText={'CHECK'}/>
        </div>
    )
}
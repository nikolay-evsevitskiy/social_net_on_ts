import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {PostActionType, PostsType, StoreType} from "../../Redux/store";
import MyPostsContainer from './MyPosts/MyPostsContainer';

type ProfileType = {
    store: StoreType
}


function Profile(props: ProfileType) {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile;
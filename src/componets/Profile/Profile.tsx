import React from 'react';
import s from './Profile.module.css';
import MyPost from './MyPost/MyPost';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {PostActionType, PostsType} from "../../Redux/store";

type ProfileType = {
    posts: Array<PostsType>
    newPostText: string
    dispatch: (action: PostActionType) => void
}



function Profile(props: ProfileType) {
    return (
        <div className={s.content}>
           <ProfileInfo newPostText={props.newPostText}
                        dispatch={props.dispatch}

           />
            <MyPost posts={props.posts}/>
        </div>
    )
}

export default Profile;
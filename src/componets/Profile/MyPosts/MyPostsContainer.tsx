import React from 'react';
import {StoreType} from "../../../Redux/store";
import {postAddActionCreator, updateNewPostTextActionCreator} from "../../../Redux/profilePageReducer";
import MyPosts from './MyPosts';

type MyPostType = {
    store: StoreType
}

function MyPostsContainer(props: MyPostType) {
    let state = props.store.getState()
    let addPost = () => {
        let action = postAddActionCreator();
        props.store.dispatch(action);
    };

    let onPostChange = (newText: string) => {
        let action = updateNewPostTextActionCreator(newText);
        props.store.dispatch(action);
    };
    
    return (
        <div>
            <MyPosts posts={state.profilePage.posts} addPost={addPost} newPostText={state.profilePage.newPostText} updateNewPostText={onPostChange} />
        </div>

    )
}

export default MyPostsContainer;
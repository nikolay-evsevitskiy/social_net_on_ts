import React from 'react';
import {postAddActionCreator, PostsType, updateNewPostTextActionCreator} from "../../../Redux/profilePageReducer";
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from "../../../Redux/redux-store";
import { Dispatch } from 'redux';

type MapStatePropsType = {
    posts: Array<PostsType>
    newPostText: string
}
type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

export type MyPostsPropsType = MapStatePropsType & MapDispatchToPropsType


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(postAddActionCreator())
        },
        updateNewPostText: (newText: string) => {
            dispatch(updateNewPostTextActionCreator(newText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
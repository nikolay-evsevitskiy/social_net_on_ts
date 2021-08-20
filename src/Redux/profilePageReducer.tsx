import React from "react";
import {MessageActionType, PostActionType, PostsType, ProfilePageType} from "./store";

export const postAddActionCreator = () => {
    return {type: "POST-ADD"} as const
};
export const updateNewPostTextActionCreator = (text: string) => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: text} as const
};

const profilePageReducer = (state: ProfilePageType, action: PostActionType | MessageActionType) => {
    switch (action.type) {
        case 'POST-ADD':
            let newPost: PostsType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likes: 0
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case 'UPDATE-NEW-POST-TEXT':
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }

};

export default profilePageReducer
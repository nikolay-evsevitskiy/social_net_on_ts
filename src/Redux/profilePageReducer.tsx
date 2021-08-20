import React from "react";
import {MessageActionType, PostActionType, PostsType, ProfilePageType} from "./store";

export const postAddActionCreator = () => {
    return {type: "POST-ADD"} as const
};
export const updateNewPostTextActionCreator = (text: string) => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: text} as const
};
let initialState =  {
    posts: [
        {id: 1, message: 'Hi, how are you?', likes: 3},
        {id: 2, message: 'It\'s my first post', likes: 6},
        {id: 3, message: 'I like JS!!!', likes: 75},
        {id: 4, message: 'Just, do it!!!', likes: 10}
    ],
    newPostText: "",
}

const profilePageReducer = (state: ProfilePageType = initialState, action: PostActionType | MessageActionType) => {
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
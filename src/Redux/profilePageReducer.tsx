import React from "react";
import {addMessageActionCreator, updateNewMessageActionCreator} from "./dialogsPageReducer";

type PostActionType = ReturnType<typeof postAddActionCreator> | ReturnType<typeof updateNewPostTextActionCreator>;
type MessageActionType = ReturnType<typeof addMessageActionCreator> | ReturnType<typeof updateNewMessageActionCreator>;
export type PostsType = {
    id: number
    message: string
    likes: number
};


export const postAddActionCreator = () => {
    return {type: "POST-ADD"} as const
};
export const updateNewPostTextActionCreator = (text: string) => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: text} as const
};
const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likes: 3},
        {id: 2, message: 'It\'s my first post', likes: 6},
        {id: 3, message: 'I like JS!!!', likes: 75},
        {id: 4, message: 'Just, do it!!!', likes: 10}
    ] as PostsType[],
    newPostText: "",
}
export type InitialStateTypeProfilePage = typeof initialState

const profilePageReducer = (state: InitialStateTypeProfilePage = initialState, action: PostActionType | MessageActionType): InitialStateTypeProfilePage => {
    switch (action.type) {
        case 'POST-ADD': {
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likes: 0
            };
            return {...state, posts: [...state.posts, newPost], newPostText: ''};
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.newText};
        }
        default:
            return state;
    }
};

export default profilePageReducer
import React from "react";
import {DialogPageType, MessageActionType, MessagesType, PostActionType} from "./store";


export const addMessageActionCreator = () => {
    return {type: "ADD-MESSAGE"} as const
};
export const updateNewMessageActionCreator = (text: string) => {
    return {type: "UPDATE-NEW-MESSAGE-TEXT", newText: text} as const
};


const dialogPageReducer = (state: DialogPageType, action: PostActionType | MessageActionType) => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            let newText: MessagesType = {
                id: new Date().getTime(),
                message: state.newMessageText
            };
            state.messages.push(newText);
            state.newMessageText = '';
            return state;
        case 'UPDATE-NEW-MESSAGE-TEXT':
            state.newMessageText = action.newText;
            return state;
        default:
            return state;
    }
};

export default dialogPageReducer
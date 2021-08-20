import React from "react";
import {DialogPageType, MessageActionType, MessagesType, PostActionType} from "./store";


export const addMessageActionCreator = () => {
    return {type: "ADD-MESSAGE"} as const
};
export const updateNewMessageActionCreator = (text: string) => {
    return {type: "UPDATE-NEW-MESSAGE-TEXT", newText: text} as const
};
let initialState = {
    dialogs: [
        {id: 1, name: 'Mark'},
        {id: 2, name: 'Miron'},
        {id: 3, name: 'Vadim'},
        {id: 4, name: 'Milana'},
        {id: 5, name: 'Polina'}
    ],
    messages: [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Cool!!!'}
    ],
    newMessageText: ""
}

const dialogPageReducer = (state: DialogPageType = initialState, action: PostActionType | MessageActionType) => {
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
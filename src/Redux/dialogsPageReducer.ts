
import {postAdd, updateNewPostText} from "./profilePageReducer";

export type MessagesType = {
    id: number
    message: string
};
export type DialogsType = {
    id: number
    name: string
};
type MessageActionType = ReturnType<typeof addMessageActionCreator> | ReturnType<typeof updateNewMessageActionCreator>;
type PostActionType = ReturnType<typeof postAdd> | ReturnType<typeof updateNewPostText>;


export const addMessageActionCreator = () => {
    return {type: "ADD-MESSAGE"} as const
};
export const updateNewMessageActionCreator = (newText: string) => {
    return {type: "UPDATE-NEW-MESSAGE-TEXT", newText} as const
};
const initialState = {
    dialogs: [
        {id: 1, name: 'Mark'},
        {id: 2, name: 'Miron'},
        {id: 3, name: 'Vadim'},
        {id: 4, name: 'Milana'},
        {id: 5, name: 'Polina'}
    ] as DialogsType[],
    messages: [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Cool!!!'}
    ] as MessagesType[],
    newMessageText: ""
}
export type InitialStateTypeDialogsPage = typeof initialState

const dialogPageReducer = (state: InitialStateTypeDialogsPage = initialState, action: PostActionType | MessageActionType): InitialStateTypeDialogsPage => {
    switch (action.type) {
        case 'ADD-MESSAGE': {
            const newText: MessagesType = {
                id: new Date().getTime(),
                message: state.newMessageText
            };
            return {...state, messages: [...state.messages, newText], newMessageText: ''};
        }
        case 'UPDATE-NEW-MESSAGE-TEXT': {
            return {...state, newMessageText: action.newText};
        }
        default:
            return state;
    }
};

export default dialogPageReducer
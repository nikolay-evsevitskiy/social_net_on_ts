
export type MessagesType = {
    id: number
    message: string
};
export type DialogsType = {
    id: number
    name: string
};
type MessageActionType = ReturnType<typeof addMessageActionCreator>;

export type InitialStateTypeDialogsPage = typeof initialState

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
    ] as MessagesType[]
}

const dialogPageReducer = (state: InitialStateTypeDialogsPage = initialState, action: MessageActionType): InitialStateTypeDialogsPage => {
    switch (action.type) {
        case 'ADD-MESSAGE': {
            const newText: MessagesType = {
                id: new Date().getTime(),
                message: action.newMessage
            };
            return {...state, messages: [...state.messages, newText]};
        }
        default: return state
    }
}

export const addMessageActionCreator = (newMessage: string) => {
    return {type: "ADD-MESSAGE", newMessage} as const
};

export default dialogPageReducer
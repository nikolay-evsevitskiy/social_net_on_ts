export type PostsType = {
    id: number
    message: string
    likes: number
};
export type DialogsType = {
    id: number
    name: string
};
export type MessagesType = {
    id: number
    message: string
};
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
};
export type DialogPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
};
export type RootStateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
    sideBar: {}
};
export type StoreType = {
    _state: RootStateType
    _rerenderTree: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: PostActionType | MessageActionType ) => void
};
export type PostActionType = ReturnType<typeof postAddActionCreator> | ReturnType<typeof updateNewPostTextActionCreator>;
export type MessageActionType = ReturnType<typeof addMessageActionCreator> | ReturnType<typeof updateNewMessageActionCreator>;
export const postAddActionCreator = ( ) => {
    return {type: "POST-ADD"} as const
};
export const updateNewPostTextActionCreator = (text: string ) => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: text} as const
};
export const addMessageActionCreator = () => {
    return {type: "ADD-MESSAGE"} as const
};
export const updateNewMessageActionCreator = (text: string) => {
   return {type: "UPDATE-NEW-MESSAGE-TEXT", newText: text} as const
};


let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likes: 3},
                {id: 2, message: 'It\'s my first post', likes: 6},
                {id: 3, message: 'I like JS!!!', likes: 75},
                {id: 4, message: 'Just, do it!!!', likes: 10}
            ],
            newPostText: "",
        },
        dialogPage: {
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
        },
        sideBar: {}
    },
    _rerenderTree() {
        console.log('State render');
    },
    subscribe(observer: () => void) {
        this._rerenderTree = observer;
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        if(action.type === 'POST-ADD') {
            let newPost: PostsType = {
                id: new Date().getTime(),
                message: this._state.profilePage.newPostText,
                likes: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._rerenderTree();
        } else if (action.type === 'ADD-MESSAGE') {
            let newText: MessagesType = {
                id: new Date().getTime(),
                message: this._state.dialogPage.newMessageText
            };
            this._state.dialogPage.messages.push(newText);
            this._state.dialogPage.newMessageText = '';
            this._rerenderTree();
        } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
            this._state.dialogPage.newMessageText = action.newText;
            this._rerenderTree();
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._rerenderTree();
        }
    }
};

export default store;
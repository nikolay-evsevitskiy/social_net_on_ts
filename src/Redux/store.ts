import {postAdd, ProfileStateType} from "./profile-reducer";
import dialogPageReducer, {addMessageActionCreator} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


type PostsType = {
    id: number
    message: string
    likes: number
};
type DialogsType = {
    id: number
    name: string
};
type MessagesType = {
    id: number
    message: string
};
type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
    profile: ProfileStateType
};
type DialogPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
};
type RootStateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
    sideBar: {}
};
type StoreType = {
    _state: RootStateType
    _rerenderTree: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: PostActionType | MessageActionType) => void
};
type PostActionType = ReturnType<typeof postAdd>;
type MessageActionType = ReturnType<typeof addMessageActionCreator>


let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likes: 3},
                {id: 2, message: 'It\'s my first post', likes: 6},
                {id: 3, message: 'I like JS!!!', likes: 75},
                {id: 4, message: 'Just, do it!!!', likes: 10}
            ] as PostsType[],
            newPostText: "",
            profile: {} as ProfileStateType
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
            ]
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
    dispatch(action: any) {
        //this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogPage = dialogPageReducer(this._state.dialogPage, action);
        this._state.sideBar = sidebarReducer(this._state.sideBar, action);
        this._rerenderTree();

    }
};

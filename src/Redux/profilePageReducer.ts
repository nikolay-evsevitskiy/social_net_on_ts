import {addMessageActionCreator, updateNewMessageActionCreator} from "./dialogsPageReducer";
type PostActionType = ReturnType<typeof postAdd> | ReturnType<typeof updateNewPostText>;
type MessageActionType = ReturnType<typeof addMessageActionCreator> | ReturnType<typeof updateNewMessageActionCreator>;
type SetUserProfile = ReturnType<typeof setUserProfile>
export type PostsType = {
    id: number
    message: string
    likes: number
};
export type InitialStateTypeProfilePage = typeof initialState
type ContactsType = {
    facebook: null | string
    website: null | string
    vk: null | string
    twitter: null | string
    instagram: null | string
    youtube: null | string
    github: null | string
    mainLink: null | string
}
type PhotoType = {
    small: string
    large: string
}
export type ProfileStateType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotoType

}


const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likes: 3},
        {id: 2, message: 'It\'s my first post', likes: 6},
        {id: 3, message: 'I like JS!!!', likes: 75},
        {id: 4, message: 'Just, do it!!!', likes: 10}
    ] as PostsType[],
    newPostText: "",
    profile: {} as ProfileStateType
}

const profilePageReducer = (state: InitialStateTypeProfilePage = initialState, action: PostActionType | MessageActionType | SetUserProfile): InitialStateTypeProfilePage => {
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
        case 'SET-USER-PROFILE': {
            return {...state, profile: action.profile};
        }
        default:
            return state;
    }
};

export const postAdd = () => {
    return {type: 'POST-ADD'} as const
};
export const updateNewPostText = (newText: string) => {
    return {type: 'UPDATE-NEW-POST-TEXT', newText} as const
};
export const setUserProfile = (profile: ProfileStateType) => {
    return {type: 'SET-USER-PROFILE', profile} as const
};

export default profilePageReducer
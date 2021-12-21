import {profileAPI, usersAPI} from "../api/api";
import {Dispatch} from "redux";

type PostActionType = ReturnType<typeof postAdd>;
type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetStatusProfileType = ReturnType<typeof setStatus>
type DeletePostActionType = ReturnType<typeof deletePost>
type OwnActionType =
    PostActionType
    | SetUserProfileType
    | SetStatusProfileType
    | DeletePostActionType
export type PostsType = {
    id: number
    message: string
    likes: number
};
export type InitialStateTypeProfilePageType = typeof initialState
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
    profile: {} as ProfileStateType,
    status: ''
}

const profileReducer = (state: InitialStateTypeProfilePageType = initialState, action: OwnActionType): InitialStateTypeProfilePageType => {
    switch (action.type) {
        case 'POST-ADD': {
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: action.value,
                likes: 0
            };
            return {...state, posts: [...state.posts, newPost]};
        }
        case 'SET-USER-PROFILE': {
            return {...state, profile: action.profile};
        }
        case 'SET-STATUS': {
            return {...state, status: action.status};
        }
        case 'POST-DELETE': {
            return {
                ...state,
                posts: state.posts.filter(i => i.id !== action.postId)
            }
        }
        default:
            return state;
    }
};

export const postAdd = (value: string) => {
    return {type: 'POST-ADD', value} as const
};
export const deletePost = (postId: number) => {
    return {type: 'POST-DELETE', postId} as const
};
export const setUserProfile = (profile: ProfileStateType) => {
    return {type: 'SET-USER-PROFILE', profile} as const
};
export const setStatus = (status: string) => {
    return {type: 'SET-STATUS', status} as const
};

export const getUserProfile = (userId: number) => {
    return (dispatch: Dispatch<OwnActionType>) => {
        usersAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data))
        })
    };
}
export const getStatus = (userId: string) => {
    return (dispatch: Dispatch<OwnActionType>) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))
            })
    };
}
export const updateStatus = (status: string) => {
    return (dispatch: Dispatch<OwnActionType>) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    };
}

export default profileReducer
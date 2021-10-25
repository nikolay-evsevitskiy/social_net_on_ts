import {postAdd, PostsType, updateNewPostText} from "../../../Redux/profilePageReducer";
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from "../../../Redux/redux-store";
import { Dispatch } from 'redux';

type MapStatePropsType = {
    posts: Array<PostsType>
    newPostText: string
}
type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newText: string) => void
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(postAdd())
        },
        updateNewPostText: (newText: string) => {
            dispatch(updateNewPostText(newText))
        }
    }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
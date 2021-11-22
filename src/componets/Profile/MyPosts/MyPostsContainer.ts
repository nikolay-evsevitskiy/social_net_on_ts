import {postAdd, PostsType} from "../../../Redux/profilePageReducer";
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from "../../../Redux/redux-store";
import {Dispatch} from 'redux';

type MapStatePropsType = {
    posts: Array<PostsType>
}
type MapDispatchToPropsType = {
    addPost: (value: string) => void
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (value: string) => {
            dispatch(postAdd(value))
        }
    }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
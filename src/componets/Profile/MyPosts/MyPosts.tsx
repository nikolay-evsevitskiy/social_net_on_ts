import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {PostsType} from "../../../Redux/profilePageReducer";
import {AddPostFormRedux} from "./ProfileForm/ProfileFormMyPosts";

type PropType = {
    addPost: (value: string) => void
    posts: Array<PostsType>
    newPostText: string
}
function MyPosts(props: PropType) {
    let addPost = (values: any) => {
        props.addPost(values.addPostBody)
    }

    const postElements = props.posts.map((p) => <Post message={p.message} likes={p.likes} key={p.id}/>)
    return (
        <div className={s.main}>
            <div>
                My posts
            </div>
            <div>
                <AddPostFormRedux onSubmit={addPost}/>
            </div>
            {postElements}
        </div>

    )
}

export default MyPosts;
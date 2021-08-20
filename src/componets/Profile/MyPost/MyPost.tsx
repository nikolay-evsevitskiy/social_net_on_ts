import React from 'react';
import s from './MyPost.module.css';
import Post from './Post/Post';
import {PostsType} from "../../../Redux/store";

type MyPostType = {
    posts: Array<PostsType>
}


function MyPost(props: MyPostType) {

    let postElements = props.posts.map((p) => <Post message={p.message} likes={p.likes}/>)
    return (
        <div className={s.main}>
            <div>
                My posts
            </div>
            {postElements}
        </div>

    )
}

export default MyPost;
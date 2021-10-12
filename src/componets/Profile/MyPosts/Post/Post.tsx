import React from 'react';
import s from './Post.module.css';

type messagePropsType = {
    message: string
    likes: number
}

function Post(props:messagePropsType) {
    return (
        <div className={s.item}>
            <div>
                <img src="https://www.esafety.gov.au/sites/default/files/2019-08/Remove%20images%20and%20video.jpg"/>
                <span className={s.message}>{props.message}</span>
                <div><button>like {props.likes} </button></div>

            </div>
        </div>
    )
}

export default Post;


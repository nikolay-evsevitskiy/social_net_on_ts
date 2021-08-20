import React, {ChangeEvent} from 'react';
import {PostActionType} from "../../../Redux/store";
import {postAddActionCreator, updateNewPostTextActionCreator} from './../../../Redux/profilePageReducer'

type ProfileInfoType = {
    newPostText: string
    dispatch: (action: PostActionType) => void
}

const ProfileInfo = (props:ProfileInfoType) => {

    let addPost = () => {
        let action = postAddActionCreator();
        props.dispatch(action);
    };
    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        let action = updateNewPostTextActionCreator(text);
       props.dispatch(action);
    };

    return (
        <div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjYFV-bwRLTx5vbXeIRyRZDH86KNG-4ktGcg&usqp=CAU"/>
            </div>
            <h3>
                Ava + descrition
            </h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;

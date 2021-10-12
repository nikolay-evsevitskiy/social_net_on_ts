import React from 'react';
import {postAddActionCreator, updateNewPostTextActionCreator} from "../../../Redux/profilePageReducer";
import MyPosts from './MyPosts';
import {StoreContext} from '../../../StoreContext';


function MyPostsContainer() {


    return (
        <StoreContext.Consumer>
            { (store) => {
                let state = store.getState()

                let addPost = () => {
                    let action = postAddActionCreator();
                    store.dispatch(action);
                };

                let onPostChange = (newText: string) => {
                    let action = updateNewPostTextActionCreator(newText);
                    store.dispatch(action);
                };

                return <MyPosts posts={state.profilePage.posts}
                                addPost={addPost}
                                newPostText={state.profilePage.newPostText}
                                updateNewPostText={onPostChange}/>
            }
        }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;
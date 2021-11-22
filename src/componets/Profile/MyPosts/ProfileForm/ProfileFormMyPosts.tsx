import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataProfileType = {
    values: string
}

export const ProfileFormMyPosts: React.FC<InjectedFormProps<FormDataProfileType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={'textarea'} name={'addPostBody'} placeholder={'Add post'}/>
        </div>
        <div>
            <button>
                Add post
            </button>
        </div>
    </form>

}

export const AddPostFormRedux = reduxForm<FormDataProfileType>({form: 'AddPostForm'})(ProfileFormMyPosts)
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type FormDataType = {
    message: string
}

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={'textarea'} name={'addMessageBody'} placeholder={'Add message'}/>
        </div>
        <div>
            <button>
                Send
            </button>
        </div>
    </form>

}

export const AddMessageFormRedux = reduxForm<FormDataType>({form: 'AddMessageForm'})(AddMessageForm)

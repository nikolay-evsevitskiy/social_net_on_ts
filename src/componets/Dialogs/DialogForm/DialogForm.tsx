import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";

export type FormDataType = {
    message: string
}

const maxLengthInFormOfPost30 = maxLengthCreator(30)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea}
                   name={'addMessageBody'}
                   placeholder={'Add message'}
                   validate={[required, maxLengthInFormOfPost30]}
            />
        </div>
        <div>
            <button>
                Send
            </button>
        </div>
    </form>

}

export const AddMessageFormRedux = reduxForm<FormDataType>({form: 'AddMessageForm'})(AddMessageForm)

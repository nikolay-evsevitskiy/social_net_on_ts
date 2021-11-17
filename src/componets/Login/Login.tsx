import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}
export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={"input"} type="text" name={"login"} placeholder={'Login'}/>
        </div>
        <div>
            <Field component={"input"} type="text" name={"password"} placeholder={'password'}/>
        </div>
        <div>
            <Field component={"input"} type="checkbox" name={"rememberMe"}/> remember me
        </div>
        <div>
            <button>
                Login
            </button>
        </div>
    </form>
}
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)
export const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}



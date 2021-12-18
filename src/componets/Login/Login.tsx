import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import s from '../Common/FormsControls/FormControl.module.css'

type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}
type MapStateToPropsType = {
    isAuth: boolean
}

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Input}
                   validate={[required]}
                   type='text'
                   name={'email'}
                   placeholder={'Email'}/>
        </div>
        <div>
            <Field component={Input}
                   validate={[required]}
                   type='password'
                   name={'password'}
                   placeholder={'Password'}/>
        </div>
        <div>
            <Field component={Input}
                   type='checkbox'
                   name={'rememberMe'}/> remember me
        </div>
        {props.error && <div className={s.formSummaryError}>{props.error}</div>}
        <div>
            <button>
                Login
            </button>
        </div>
    </form>
}
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


export const Login = (props: MapStateToPropsType & mapDispatchToPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.data.isAuth
    }
}

export const LoginAPIComponent = connect<MapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {login})(Login)



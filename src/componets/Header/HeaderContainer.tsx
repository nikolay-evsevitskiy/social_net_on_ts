import React from 'react';
import Header from "./Header";
import {setAuthUserData} from "../../Redux/auth-reducer";
import {connect} from 'react-redux';
import {AppStateType} from "../../Redux/redux-store";
import {logIn} from "../../api/api";

type HeaderContainerType = {
    setAuthUserData: (id: number, email: string, login: string) => void
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        logIn().then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                this.props.setAuthUserData(id, email, login)
            }
        })
    }

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login}/>
        )
    }
}

type MapStateToPropsType = {
    isAuth: boolean
    login: string
}
type MapDispatchToPropsType = {
    setAuthUserData: (id: number, email: string, login: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {setAuthUserData})(HeaderContainer);

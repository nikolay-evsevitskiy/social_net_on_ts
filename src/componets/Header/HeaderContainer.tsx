import React from 'react';
import Header from "./Header";
import {setAuthUserData} from "../../Redux/auth-reducer";
import {connect} from 'react-redux';
import {AppStateType} from "../../Redux/redux-store";
import {authAPI} from "../../api/api";

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchToPropsType = {
    setAuthUserData: (email: string | null, userId: number | null, login: string | null) => void
}

type HeaderContainerType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        authAPI.logIn().then(response => {
            if (response.data.resultCode === 0) {
                this.props.setAuthUserData(response.data.data.email, response.data.data.id, response.data.data.login)
                debugger
            }
        })
    }

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login}/>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {setAuthUserData})(HeaderContainer);

import React from 'react';
import Header from "./Header";
import {getAuthUserData, logout} from "../../Redux/auth-reducer";
import {connect} from 'react-redux';
import {AppStateType} from "../../Redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchToPropsType = {
    setAuthUser: () => void
    logout: () => void
}

type HeaderContainerType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        this.props.setAuthUser()
    }

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout}/>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {setAuthUser: getAuthUserData, logout})(HeaderContainer);

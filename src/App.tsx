import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Dialogs from './componets/Dialogs/DialogsContainer';
import UsersAPIComponent from './componets/Users/UsersContainer';
import ProfileAPIComponent from "./componets/Profile/ProfileContainer";
import HeaderContainer from "./componets/Header/HeaderContainer";
import {LoginAPIComponent} from "./componets/Login/Login";
import {connect, Provider} from "react-redux";
import {initializedApp} from "./Redux/app-reducer";
import {AppStateType, store} from "./Redux/redux-store";
import {Preloader} from "./componets/Common/Preloader/Preloader";
import {Navbar} from "./componets/Navbar/Navbar";
import {News} from "./componets/News/News";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Setting/Settings";


type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializedApp: () => void
}
type AppComponentType = MapStateToPropsType & MapDispatchToPropsType


class App extends React.Component<AppComponentType> {

    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader isFetching={true}/>
        }
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path={'/dialogs'} render={() => <Dialogs/>}/>
                        <Route path={'/profile/:userId?'} render={() => <ProfileAPIComponent/>}/>
                        <Route path={'/news'} render={() => <News/>}/>
                        <Route path={'/music'} render={() => <Music/>}/>
                        <Route path={'/settings'} render={() => <Settings/>}/>
                        <Route path={'/users'} render={() => <UsersAPIComponent/>}/>
                        <Route path={'/login'} render={() => <LoginAPIComponent/>}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }

}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}
const AppContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {initializedApp})(App)
export const SamuraiJSApp = () => {
    return <React.StrictMode>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </React.StrictMode>
}
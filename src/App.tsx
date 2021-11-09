import React from 'react';
import './App.css';
import Navbar from './componets/Navbar/Navbar';
import {BrowserRouter, Route} from 'react-router-dom';
import News from './componets/News/News';
import Music from './componets/Music/Music';
import Settings from './componets/Setting/Settings';
import DialogsContainer from './componets/Dialogs/DialogsContainer';
import {UsersContainer} from './componets/Users/UsersContainer';
import ProfileAPIComponent from "./componets/Profile/ProfileContainer";
import HeaderContainer from "./componets/Header/HeaderContainer";


const App = () => {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                    <Route path={'/profile/:userId?'} render={() => <ProfileAPIComponent/>}/>
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import './App.css';
import Header from './componets/Header/Header';
import Navbar from './componets/Navbar/Navbar';
import Profile from './componets/Profile/Profile';
import {BrowserRouter, Route} from 'react-router-dom';
import News from './componets/News/News';
import Music from './componets/Music/Music';
import Settings from './componets/Setting/Settings';
import DialogsContainer from "./componets/Dialogs/DialogsContainer";
import {UsersContainer} from "./componets/Users/UsersContainer";

const App = () => {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path={"/dialogs"} render={() => <DialogsContainer/>}
                    />
                    <Route path={"/profile"} render={() => <Profile/>}/>
                    <Route path={"/news"} render={() => <News/>}/>
                    <Route path={"/music"} render={() => <Music/>}/>
                    <Route path={"/settings"} render={() => <Settings/>}/>
                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import './App.css';
import Header from './componets/Header/Header';
import Navbar from './componets/Navbar/Navbar';
import Profile from './componets/Profile/Profile';
import {BrowserRouter, Route} from 'react-router-dom';
import News from './componets/News/News';
import Music from './componets/Music/Music';
import Settings from './componets/Setting/Settings';
import {StoreType} from './Redux/store';
import DialogsContainer from "./componets/Dialogs/DialogsContainer";

type PropsType = {
   store: StoreType
}


const App: React.FC<PropsType>  = (props) => {

    return (
        <BrowserRouter>
        <div className='app-wrapper'>
            <Header />
            <Navbar />
            <div className="app-wrapper-content">
                <Route path={"/dialogs"} render={ () => <DialogsContainer store={props.store}/>}
                />
                <Route path={"/profile"} render={ () => <Profile store={props.store}/>}/>
                <Route path={"/news"} render={ () => <News />}/>
                <Route path={"/music"} render={ () => <Music />}/>
                <Route path={"/settings"} render={ () => <Settings />}/>
            </div>
        </div>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import './App.css';
import Header from './componets/Header/Header';
import Navbar from './componets/Navbar/Navbar';
import Profile from './componets/Profile/Profile';
import Dialogs from './componets/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import News from './componets/News/News';
import Music from './componets/Music/Music';
import Settings from './componets/Setting/Settings';
import {StoreType} from './Redux/store';

type PropsType = {
   store: StoreType
}


const App: React.FC<PropsType>  = (props) => {
    const state = props.store.getState();

    return (
        <BrowserRouter>
        <div className='app-wrapper'>
            <Header />
            <Navbar />
            <div className="app-wrapper-content">
                <Route path={"/dialogs"} render={ () => <Dialogs messages={state.dialogPage.messages}
                                                                 newMessageText={state.dialogPage.newMessageText}
                                                                 dialogs={state.dialogPage.dialogs}
                                                                 dispatch={props.store.dispatch.bind(props.store)}
                                                        />}
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

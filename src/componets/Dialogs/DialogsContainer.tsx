import React from 'react';
import {addMessageActionCreator, updateNewMessageActionCreator} from '../../Redux/dialogsPageReducer'
import {StoreType} from "../../Redux/store";
import Dialogs from './Dialogs';

type DialogType = {
    store: StoreType
}


const DialogsContainer = (props: DialogType) => {
    let state = props.store.getState()

    let addMessage = () => {
        let action = addMessageActionCreator();
        props.store.dispatch(action);
    };
    let onMessageHandler = (newMessage: string) => {
        let action = updateNewMessageActionCreator(newMessage);
        props.store.dispatch(action);
    };

    return (
        <div>
            <Dialogs dialogs={state.dialogPage.dialogs}
                     messages={state.dialogPage.messages}
                     addMessage={addMessage}
                     onMessageHandler={onMessageHandler}
                     newMessageText={state.dialogPage.newMessageText}
            />
        </div>
    )
}

export default DialogsContainer;
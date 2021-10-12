import React from 'react';
import {addMessageActionCreator, updateNewMessageActionCreator} from '../../Redux/dialogsPageReducer'
import {StoreContext} from '../../StoreContext';
import Dialogs from './Dialogs';


const DialogsContainer = () => {


    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState()

                let addMessage = () => {
                    let action = addMessageActionCreator();
                    store.dispatch(action);
                };
                let onMessageHandler = (newMessage: string) => {
                    let action = updateNewMessageActionCreator(newMessage);
                    store.dispatch(action);
                };

                return <Dialogs dialogs={state.dialogPage.dialogs}
                                messages={state.dialogPage.messages}
                                addMessage={addMessage}
                                onMessageHandler={onMessageHandler}
                                newMessageText={state.dialogPage.newMessageText}
                />
            }
            }
        </StoreContext.Consumer>

    )
}

export default DialogsContainer;
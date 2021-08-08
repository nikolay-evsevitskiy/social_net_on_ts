import React, {ChangeEvent, ChangeEventHandler} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {
    addMessageActionCreator,
    DialogsType,
    MessageActionType,
    MessagesType,
    updateNewMessageActionCreator
} from '../../Redux/state';

type DialogType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
    dispatch: (action: MessageActionType) => void
}




const Dialogs = (props: DialogType) => {

    let dialogElements = props.dialogs.map( (d) => <DialogItem id={d.id} name={d.name} /> );
    let messageElements = props.messages.map( (m) => <Message text={m.message} /> );
    let addMessage = () => {
        let action = addMessageActionCreator();
            props.dispatch(action);
    };
    let onMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        let action = updateNewMessageActionCreator(text);
        props.dispatch(action);
    };

    return(
        <div className={s.dialogs}>
            <div className={s.dialog_item}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <div>
                    <div>
                        <textarea onChange={onMessageHandler} value={props.newMessageText} />
                    </div>
                    <div>
                        <button onClick={addMessage}>Add</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;
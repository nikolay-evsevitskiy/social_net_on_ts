import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {DialogsPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";


const Dialogs = (props: DialogsPropsType) => {

    let dialogElements = props.dialogs.map((d) => <DialogItem id={d.id} key={d.id} name={d.name}/>);
    let messageElements = props.messages.map((m) => <Message text={m.message} key={m.id}/>);
    let addMessage = () => {
        props.addMessage()
    };
    let onMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        props.onMessageHandler(text)
    };
    if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialog_item}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <div>
                    <div>
                        <textarea onChange={onMessageHandler} value={props.newMessageText}/>
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
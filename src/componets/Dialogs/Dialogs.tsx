import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {AddMessageFormRedux} from "./DialogForm/DialogForm";
import {DialogsType, MessagesType} from "../../Redux/dialogs-reducer";
import {Redirect} from "react-router-dom";

type DialogsPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    addMessage: (values: string) => void
    isAuth: boolean
}


export const Dialogs: React.FC<DialogsPropsType> = ({dialogs, messages, addMessage, isAuth}) => {

    let dialogElements = dialogs.map((d) => <DialogItem id={d.id} key={d.id} name={d.name}/>);
    let messageElements = messages.map((m) => <Message text={m.message} key={m.id}/>);
    let addMessageHandler = (values: any) => {
        addMessage(values.addMessageBody)
    };
    if (!isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialog_item}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <div>
                    <AddMessageFormRedux onSubmit={addMessageHandler}/>
                </div>
            </div>

        </div>
    )
}
import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {AddMessageFormRedux} from "./DialogForm/DialogForm";
import {DialogsType, MessagesType} from "../../Redux/dialogsPageReducer";
import {Redirect} from "react-router-dom";
import {maxLengthCreator, required} from "../../utils/validators/validators";

type DialogsPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    addMessage: (values: string) => void
    isAuth: boolean
}


const Dialogs = (props: DialogsPropsType) => {

    let dialogElements = props.dialogs.map((d) => <DialogItem id={d.id} key={d.id} name={d.name}/>);
    let messageElements = props.messages.map((m) => <Message text={m.message} key={m.id}/>);
    let addMessage = (values: any) => {
        props.addMessage(values.addMessageBody)
    };
    if (!props.isAuth) return  <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialog_item}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <div>
                    <AddMessageFormRedux onSubmit={addMessage}/>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;
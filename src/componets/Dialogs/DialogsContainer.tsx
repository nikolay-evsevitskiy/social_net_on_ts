import React from 'react';
import {
    addMessageActionCreator,
    DialogsType,
    MessagesType,
    updateNewMessageActionCreator
} from '../../Redux/dialogsPageReducer'
import Dialogs from './Dialogs';
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {Dispatch} from 'redux';

type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}
type MapDispatchToPropsType = {
    onMessageHandler: (newText: string) => void
    addMessage: () => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogPage.dialogs,
        messages: state.dialogPage.messages,
        newMessageText: state.dialogPage.newMessageText
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        onMessageHandler: (newText: string) => {
            dispatch(updateNewMessageActionCreator(newText))
        },
        addMessage: () => {
            dispatch(addMessageActionCreator())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
import {
    addMessageActionCreator,
    DialogsType,
    MessagesType,
    updateNewMessageActionCreator
} from '../../Redux/dialogsPageReducer'
import DialogsAPIComponent from './Dialogs';
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {compose, Dispatch} from 'redux';
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import React from "react";

type MapStateToPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}
type MapDispatchToPropsType = {
    onMessageHandler: (newText: string) => void
    addMessage: () => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
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
export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)
)(DialogsAPIComponent);
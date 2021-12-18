import {
    addMessageActionCreator,
    DialogsType,
    MessagesType
} from '../../Redux/dialogs-reducer'
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {compose, Dispatch} from 'redux';
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import React from "react";
import Dialogs from "./Dialogs";

type MapStateToPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    isAuth: boolean
}
type MapDispatchToPropsType = {
    addMessage: (newMessage: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogPage.dialogs,
        messages: state.dialogPage.messages,
        isAuth: state.auth.data.isAuth,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addMessage: (newMessage) => {
            dispatch(addMessageActionCreator(newMessage))
        }
    }
}
export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)
)(Dialogs);
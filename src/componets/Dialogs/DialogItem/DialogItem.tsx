import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './DialogItem.module.css';

type DialogItemPropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<DialogItemPropsType> = ({id, name}) => {
    return (
        <div className={s.dialog}>
            <NavLink to={'/dialogs/' + id} activeClassName={s.active}>{name}</NavLink>
        </div>
    )
}
export default DialogItem;
import React, {ChangeEvent, useEffect, useState} from 'react';
//import style from './ProfileStatus.module.css'

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusOnFC = (props: ProfileStatusType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        if (props.status !== status) {
            setStatus(props.status)
        }
    }, [props.status])

    return (
        <div>
            {!editMode && <div>
                <span onDoubleClick={activateEditMode}><b>{props.status || 'No status'}</b></span>
            </div>}
            {editMode && <div>
                <input onChange={onStatusChange}
                       autoFocus={true}
                       onBlur={deactivateEditMode}
                       type="text"
                       value={status}/>
            </div>}
        </div>
    );
}

export default ProfileStatusOnFC;

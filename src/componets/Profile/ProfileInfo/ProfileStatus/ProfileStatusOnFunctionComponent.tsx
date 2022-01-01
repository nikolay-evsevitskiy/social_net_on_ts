import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusType = {
    statusProps: string
    updateStatus: (status: string) => void
}

const ProfileStatusOnFC: React.FC<ProfileStatusType> = ({statusProps, updateStatus}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(statusProps)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    useEffect(() => {
        if (statusProps !== status) {
            setStatus(statusProps)
        }
    }, [statusProps])

    return (
        <div>
            {!editMode && <div>
                <span onDoubleClick={activateEditMode}><b>{statusProps || 'No status'}</b></span>
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

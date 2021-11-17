import React, {ChangeEvent} from 'react';
//import style from './ProfileStatus.module.css'

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activeEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }


    render() {
        return (
            <div>
                {!this.state.editMode && <div>
                    <span onDoubleClick={this.activeEditMode}><b>{this.props.status || 'No status'}</b></span>
                </div>}
                {this.state.editMode && <div>
                    <input onChange={this.onStatusChange}
                           autoFocus={true}
                           onBlur={this.deactivateEditMode}
                           type="text"
                           value={this.state.status}/>
                </div>}
            </div>
        );
    }

}

export default ProfileStatus;

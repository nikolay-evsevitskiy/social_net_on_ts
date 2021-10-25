import React from 'react';
import {ProfileStateType} from "../../../Redux/profilePageReducer";
import {Preloader} from "../../Common/Preloader/Preloader";

type ProfileInfoType = {
    profile: ProfileStateType
}


const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile.photos) {
        return <Preloader isFetching={true}/>
    }
    return (
        <div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjYFV-bwRLTx5vbXeIRyRZDH86KNG-4ktGcg&usqp=CAU"/>
            </div>
            <div>
                <img src={props.profile.photos.large}/>
                Ava + description
            </div>

        </div>
    )
}

export default ProfileInfo;

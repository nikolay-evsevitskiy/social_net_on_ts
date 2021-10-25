import React from 'react';
import {ProfileStateType} from "../../../Redux/profilePageReducer";
import {Preloader} from "../../Common/Preloader/Preloader";

type ProfileInfoType = {
    profile: ProfileStateType
}


const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile.photos || !props.profile) {
        return <Preloader isFetching={true}/>
    }
    return (
        <div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjYFV-bwRLTx5vbXeIRyRZDH86KNG-4ktGcg&usqp=CAU"/>
            </div>
            <div>
                <div>Ava + description</div>
                <img src={props.profile.photos.large}/>
                <div>Full name: {props.profile.fullName}</div>
                <div>
                    About me: {props.profile.aboutMe}
                </div>
                <div>
                    Contacts:
                    <ul>
                        <li>facebook: {props.profile.contacts.facebook}</li>
                        <li>website: {props.profile.contacts.website}</li>
                        <li>vk: {props.profile.contacts.vk}</li>
                        <li>twitter: {props.profile.contacts.twitter}</li>
                        <li>instagram: {props.profile.contacts.instagram}</li>
                        <li>youtube: {props.profile.contacts.youtube}</li>
                        <li>github: {props.profile.contacts.github}</li>
                        <li>mainLink: {props.profile.contacts.mainLink}</li>
                    </ul>
                </div>
                <div>
                    <p>
                        LOOKING FOR A JOB!!!!
                    </p>
                    <p>Description: {props.profile.lookingForAJobDescription}</p>
                </div>

            </div>

        </div>
    )
}

export default ProfileInfo;

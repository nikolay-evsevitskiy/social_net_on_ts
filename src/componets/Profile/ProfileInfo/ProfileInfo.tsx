import React from 'react';
import {ProfileStateType} from "../../../Redux/profile-reducer";
import {Preloader} from "../../Common/Preloader/Preloader";
import style from './ProfileInfo.module.css'
import ProfileStatusOnFC from './ProfileStatus/ProfileStatusOnFunctionComponent';

type ProfileInfoType = {
    profile: ProfileStateType
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<ProfileInfoType> = ({profile, status, updateStatus}) => {
    if (!profile.photos || !profile) {
        return <Preloader isFetching={true}/>
    }
    return (
        <div>
            <div>
                <div>
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img alt={'Profile photo'} src={profile.photos.large}/>
                    Status:<ProfileStatusOnFC statusProps={status} updateStatus={updateStatus}/>

                </div>
                <div>Full name: {profile.fullName}</div>
                <div>
                    About me: {profile.aboutMe}
                </div>
                <div>
                    Contacts:
                    <ul>
                        <li>facebook: {profile.contacts.facebook}</li>
                        <li>website: {profile.contacts.website}</li>
                        <li>vk: {profile.contacts.vk}</li>
                        <li>twitter: {profile.contacts.twitter}</li>
                        <li>instagram: {profile.contacts.instagram}</li>
                        <li>youtube: {profile.contacts.youtube}</li>
                        <li>github: {profile.contacts.github}</li>
                        <li>mainLink: {profile.contacts.mainLink}</li>
                    </ul>
                </div>
                <div>
                    <p>
                        LOOKING FOR A JOB!!!!
                        <div>
                            {profile.lookingForAJob && <img className={style.imgOfLookingFor}
                                                            src="https://cdn1.vectorstock.com/i/1000x1000/88/00/looking-for-a-job-vector-19278800.jpg"
                                                            alt="loking for a job"/>}
                        </div>
                    </p>
                    <p>Description: {profile.lookingForAJobDescription}</p>
                </div>

            </div>

        </div>
    )
}

export default ProfileInfo;

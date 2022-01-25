import React from 'react'
import {InitialStateTypeUsersPage} from '../../Redux/users-reducer';
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";

type UsersPageType = {
    usersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    usersPage: InitialStateTypeUsersPage
    followingInProgress: number[]
}

export const Users: React.FC<UsersPageType> = ({
                                                   usersCount,
                                                   pageSize,
                                                   onPageChanged,
                                                   currentPage,
                                                   usersPage,
                                                   followingInProgress,
                                                   follow,
                                                   unfollow
                                               }) => {

    return <div>
        <Paginator totalItemsCount={usersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
        {
            usersPage.users.map(u => <User userId={u.id}
                                           photoUrl={u.photoUrl}
                                           followed={u.followed}
                                           followingInProgress={followingInProgress}
                                           unfollow={unfollow}
                                           follow={follow}
                                           name={u.name}
                                           status={u.status}
                                           key={u.id}
                />
            )
        }
    </div>;
}
import React from 'react'
import s from './Users.module.css';
import userPhoto from '../../assets/images/5546667.png';
import {InitialStateTypeUsersPage} from '../../Redux/users-reducer';
import {NavLink} from "react-router-dom";

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
    let pageCount = Math.ceil(usersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span onClick={() => {
                    onPageChanged(p)
                }} className={currentPage === p ? s.selectedPage : ''}>{p}</span>
            })}
        </div>
        {
            usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div className={s.item}>
                            <NavLink to={'/profile/' + u.id}>
                            <img src={u.photoUrl != null ? u.photoUrl : userPhoto}
                                 alt="avatar"/>
                                </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                    unfollow(u.id)
                                }}>Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                    follow(u.id)
                                }}>Follow</button>}
                        </div>
                    </span>
                <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
            </div>)

        }
    </div>;

}
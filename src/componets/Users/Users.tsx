import React from 'react'
import {UsersPropsType} from "./UsersContainer";
import s from './Users.module.css'

const Users = (props: UsersPropsType) => {
    if (props.usersPage.users.length === 0) {
        props.setUsers([
                {
                    id: 1,
                    photoUrl: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png',
                    followed: true,
                    fullName: 'Mark',
                    status: 'I am better',
                    location: {country: 'Belarus', city: 'Minsk'}
                },
                {
                    id: 2,
                    photoUrl: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png',
                    followed: true,
                    fullName: 'Aleksandr',
                    status: 'Boring(',
                    location: {country: 'Russia', city: 'Moscow'}
                },
                {
                    id: 3,
                    photoUrl: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png',
                    followed: false,
                    fullName: 'Katya',
                    status: 'I am pretty',
                    location: {country: 'Ukraine', city: 'Kiev'}
                },
            ]
        )
    }
    return (
        <div>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div className={s.item}>
                            <img src={u.photoUrl}
                                 alt="avatar"/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                                : <button onClick={() => {props.follow(u.id)}}>Follow</button> }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)

            }
        </div>
    )
}

export default Users
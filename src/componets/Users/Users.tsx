import React from 'react'
import s from './Users.module.css';
import userPhoto from '../../assets/images/5546667.png';
import {InitialStateTypeUsersPage} from '../../Redux/usersPageReducer';
import {NavLink} from "react-router-dom";
import {follow, unfollow} from "../../api/api";

type UsersPageType = {
    usersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    usersPage: InitialStateTypeUsersPage
}

const Users = (props: UsersPageType) => {
    let pageCount = Math.ceil(props.usersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span onClick={() => {
                    props.onPageChanged(p)
                }} className={props.currentPage === p ? s.selectedPage : ''}>{p}</span>
            })}
        </div>
        {
            props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div className={s.item}>
                            <NavLink to={'/profile/' + u.id}>
                            <img src={u.photoUrl != null ? u.photoUrl : userPhoto}
                                 alt="avatar"/>
                                </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    unfollow(u.id).then(data => {
                                        if (data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    })
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    follow(u.id).then(data => {
                                        if (data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                    })
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

export default Users
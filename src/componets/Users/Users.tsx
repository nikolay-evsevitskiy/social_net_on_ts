import React from 'react'
import s from './Users.module.css'
import axios from "axios";
import {InitialStateTypeUsersPage, UserType} from "../../Redux/usersPageReducer";
import userPhoto from '../../assets/images/5546667.png'

type PropsType = {
    usersPage: InitialStateTypeUsersPage
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUserCount: (totalCount: number) => void
}

class Users extends React.Component<PropsType> {
    componentDidMount() {
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUserCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {

        let pageCount = Math.ceil(this.props.usersPage.totalUsersCount / this.props.usersPage.pageSize)
        let pages = []
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }

        return <div>
            <div>
                {pages.map(p => {
                    return <span onClick={() => {
                        this.onPageChanged(p)
                    }} className={this.props.usersPage.currentPage === p ? s.selectedPage : ''}>{p}</span>
                })}
            </div>
            {
                this.props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div className={s.item}>
                            <img src={u.photoUrl != null ? u.photoUrl : userPhoto}
                                 alt="avatar"/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
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
}

export default Users
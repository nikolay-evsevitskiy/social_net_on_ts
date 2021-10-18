import React from 'react'
import s from './Users.module.css'
import axios from "axios";
import {InitialStateTypeUsersPage, UserType} from "../../Redux/usersPageReducer";
import userPhoto from '../../assets/images/5546667.png'

type PropsType = {
    usersPage: InitialStateTypeUsersPage
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users:  UserType[]) => void
}
type PhotosPropsType = {
    small: string | null
    large: string | null
}
type ItemsPropsType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: PhotosPropsType
    status: string | null
    followed: boolean
}
type GetPropsType = Array<ItemsPropsType>

class Users extends React.Component<PropsType> {


    componentDidMount() {
        axios.get<any>("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return <div>
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
import s from "./Users.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/5546667.png";
import React from "react";

type UserProps = {
    userId: number
    photoUrl: string
    followed: boolean
    followingInProgress: number[]
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    name: string
    status: string

}


export const User: React.FC<UserProps> = ({
                                              userId,
                                              follow,
                                              followed,
                                              followingInProgress,
                                              photoUrl,
                                              name,
                                              unfollow,
                                              status
                                          }) => {
    return <div>
        <span>
                        <div className={s.item}>
                            <NavLink to={'/profile/' + userId}>
                            <img src={photoUrl != null ? photoUrl : userPhoto}
                                 alt="avatar"/>
                                </NavLink>
                        </div>
                        <div>
                            {followed
                                ? <button disabled={followingInProgress.some(id => id === userId)} onClick={() => {
                                    unfollow(userId)
                                }}>Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === userId)} onClick={() => {
                                    follow(userId)
                                }}>Follow</button>}
                        </div>
                    </span>
        <span>
                        <span>
                            <div>{name}</div>
                            <div>{status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
    </div>

}
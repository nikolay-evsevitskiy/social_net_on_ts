import {connect} from "react-redux";
import Users from "./Users";
import {Dispatch} from "redux";
import {followAC, InitialStateTypeUsersPage, setUsersAC, unfollowAC, UserType} from "../../Redux/usersPageReducer";
import {AppStateType} from "../../Redux/redux-store";

type MapStateToPropsType= {
    usersPage: InitialStateTypeUsersPage
}
type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users:  UserType[]) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage
    }

}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users:  Array<UserType>) => {
            dispatch(setUsersAC(users))
        }

    }

}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer
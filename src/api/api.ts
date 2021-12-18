import axios from "axios";
import {ProfileStateType} from "../Redux/profile-reducer";

type followType = {
    data: {}
    fieldsErrors: []
    messages: []
    resultCode: 0 | 1
}
type getUsersType = {
    error: null | string
    items: []
    totalCount: number
}
type updateStatusType = {
    resultCode: number
    messages: [string]
    data: {}
}
type loginDataType = {
    resultCode: number
    messages: [],
    data: {
        userId: number
    }
}
type logoutDataType = {
    resultCode: number
    messages: [],
    data: {}
}

type authMeDataType = {
    resultCode: number
    messages: []
    data: {
        id: string
        email: string
        login: string
    }
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '4bd60911-e7ab-47b0-851f-962a07b6cbc2'
    }
})


export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<followType>(`follow/${id}`)
            .then(response => response.data)
    },
    follow(id: number) {
        return instance.post<followType>(`follow/${id}`, {})
            .then(response => response.data)
    },
    getProfile(userID: number) {
        return profileAPI.getProfile(userID)
    }
}

export const authAPI = {

    me() {
        return instance.get<authMeDataType>(`auth/me`, {
            withCredentials: true
        })
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<loginDataType>(`/auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete<logoutDataType>(`/auth/login`)
    }

}

export const profileAPI = {
    getProfile(userID: number) {
        return instance.get<ProfileStateType>(`profile/${userID}`)
    },
    getStatus(userID: string) {
        return instance.get<string>(`profile/status/${userID}`)
    },
    updateStatus(status: string) {
        return instance.put<updateStatusType>(`profile/status`, {status: status})
    }
}


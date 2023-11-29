//封装所有和用户相关的接口函数

import httpInstance from "@/utils/http";

const URLS = import.meta.env.VITE_BASE_URL
//登录页的接口

export const updateUserInfoAPI = (data) => {
    return httpInstance({
        url: URLS + '/user/info/update',
        method: 'POST',
        data: data
    })
}
export const userInfoAPI = () => {
    return httpInstance({
        url: URLS + '/user/info',
        method: 'POST'
    })
}
export const registerAPI = ({account, password}) => {
    return httpInstance({
        url: URLS + '/register',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}

export const loginAPI = ({account, password}) => {
    return httpInstance({
        url: URLS + '/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}



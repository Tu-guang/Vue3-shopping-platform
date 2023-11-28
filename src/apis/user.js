//封装所有和用户相关的接口函数

import httpInstance from "@/utils/http";

let URLS = 'http://localhost:8081'
//登录页的接口
// export const loginAPI = ({account, password})=>{
//     return httpInstance({
//         url:'/login',
//         method:'POST',
//         data:{
//             account,
//             password
//         }
//     })
// }
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
//《个人中心 -> 我的账户 -> 猜你喜欢》的接口
export const getLikeListAPI = ({limit = 4}) => {
    return httpInstance({
        url: '/goods/relevant',
        params: {
            limit
        }
    })
}



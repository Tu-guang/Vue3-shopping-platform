//使用Pinia管理用户相关的数据

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'

export const useUserStore = defineStore('user',()=>{

    //1.定义管理用户数据的state
    const userInfo = ref({})
    //2.定义获取接口数据的action函数
    //登录
    const getUserInfo = async ({account,password})=>{
        const res = await loginAPI({account,password})
        userInfo.value = res.result

    }
    //退出登录时，清除用户信息及清空购物车
    const clearUserInfo = ()=>{
        userInfo.value = {}
    }

    //3.以对象的形式把state和action  return
    return{
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist:true
})

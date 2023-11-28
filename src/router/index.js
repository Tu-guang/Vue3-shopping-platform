//路由器

//createRouter创建路由实例
//createWebHistory创建history模式路由
import {createRouter, createWebHistory} from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Detail from '@/views/Detail/index.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import Address from '@/views/Member/components/Address.vue'
import Footprint from '@/views/Member/components/Footprint.vue'
import Favorites from '@/views/Member/components/Favorites.vue'
import Appraise from "@/views/Member/components/Appraise.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Layout,  //首页
            children: [
                {
                    //默认二级路由，将path配置为空
                    path: '',
                    component: Home  //Home页
                },
                {
                    path: 'detail/:id',
                    component: Detail  //详情页
                },
                {
                    path: 'member',
                    component: Member,  //会员中心页
                    children: [
                        {
                            path: '',
                            component: UserInfo  //个人中心
                        },
                        {
                            path: 'address',
                            component: Address  //地址管理
                        },
                        {
                            path: 'footprint',
                            component: Footprint  //我的足迹
                        },
                        {
                            path: 'favorites',
                            component: Favorites  //我的收藏
                        },
                        {
                            path: 'appraise',
                            component: Appraise  //我的评价
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            component: Login  //登录页
        }
    ],
    //路由滚动优化，自动滚动到页面顶部
    scrollBehavior() {
        return {top: 0}
    }
})

export default router

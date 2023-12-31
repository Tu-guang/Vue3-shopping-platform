//封装的接口函数
import httpInstance from "@/utils/http";

const URLS = import.meta.env.VITE_BASE_URL
export const favoritesListAPI = () => {
    return httpInstance({
        url: URLS + '/favorites/list',
        method: 'POST',
    })
}

export const favoritesDelAPI = (id) => {
    return httpInstance({
        url: URLS + '/favorites/del/' + id,
        method: 'POST',
    })
}

export const favoritesAddAPI = (data) => {
    return httpInstance({
        url: URLS + '/favorites/add',
        method: 'POST',
        data: data
    })
}



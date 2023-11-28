//封装的接口函数
import httpInstance from "@/utils/http";

const URLS = 'http://localhost:8081'
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



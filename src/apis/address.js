//封装的接口函数
import httpInstance from "@/utils/http";

const URLS = 'http://localhost:8081'
export const addressListAPI = () => {
    return httpInstance({
        url: URLS + '/address/list',
        method: 'POST',
    })
}
export const addressAddAPI = (data) => {
    return httpInstance({
        url: URLS + '/address/add',
        method: 'POST',
        data
    })
}

export const addressUpdateAPI = (data) => {
    return httpInstance({
        url: URLS + '/address/update',
        method: 'POST',
        data: data
    })
}

export const addressDelAPI = (id) => {
    return httpInstance({
        url: URLS + '/address/del/' + id,
        method: 'POST',
    })
}

export const addressSetAPI = (id) => {
    return httpInstance({
        url: URLS + '/address/set_default/'+id,
        method: 'POST',
    })
}


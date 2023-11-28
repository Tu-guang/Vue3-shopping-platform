//封装的接口函数
import httpInstance from "@/utils/http";

const URLS = 'http://localhost:8081'
export const footprintListAPI = () => {
    return httpInstance({
        url: URLS + '/footprint/list',
        method: 'POST',
    })
}

export const footprintDelAPI = (id) => {
    return httpInstance({
        url: URLS + '/footprint/del/' + id,
        method: 'POST',
    })
}

export const footprintAddAPI = (data) => {
    return httpInstance({
        url: URLS + '/footprint/add' ,
        method: 'POST',
        data:data
    })
}



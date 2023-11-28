//封装的接口函数
import httpInstance from "@/utils/http";

const URLS = 'http://localhost:8081'
export const orderListAPI = () => {
    return httpInstance({
        url: URLS + '/order/list',
        method: 'POST',
    })
}

export const updateOrderListAPI = (data) => {
    return httpInstance({
        url: URLS + '/order/update',
        method: 'POST',
        data: data
    })
}

export const orderDelAPI = (id) => {
    return httpInstance({
        url: URLS + '/order/del/' + id,
        method: 'POST',
    })
}



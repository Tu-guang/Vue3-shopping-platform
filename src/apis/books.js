//封装的接口函数
import httpInstance from "@/utils/http";

const URLS = 'http://localhost:8081'
export const booksListAPI = () => {
    return httpInstance({
        url: URLS + '/books/list',
        method: 'POST',
    })
}

export const booksAPI = (data) => {
    return httpInstance({
        url: URLS + '/books',
        method: 'POST',
        data: data
    })
}


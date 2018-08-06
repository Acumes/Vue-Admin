import axios from 'axios'
import store from '@/store'
import * as types from '@/store/types'
import router from '@/router'
import { baseUrl } from './env'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = baseUrl;
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    },
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            debugger
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT)

                    // 只有在当前路由不是登录页面才跳转
                    router.currentRoute.path !== 'login' &&
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.path },
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    },
)
// export default {
//     get(url, params){
//         return new Promise((resolve, reject) => {
//             axios.get(url)
//                 .then(response => {
//                     resolve(response.data);
//                 }, err => {
//                     reject(err);
//                 })
//                 .catch((error) => {
//                     reject(error)
//                 })
//         })
//     },
//     post(url, params) {
//         return new Promise((resolve, reject) => {
//             axios.post(url, params)
//                 .then(response => {
//                     resolve(response.data);
//                 }, err => {
//                     reject(err);
//                 })
//                 .catch((error) => {
//                     reject(error)
//                 })
//         })
//     },
//     del(url){
//         return new Promise((resolve, reject) => {
//             axios.get(url)
//                 .then(response => {
//                     resolve(response.data);
//                 }, err => {
//                     reject(err);
//                 })
//                 .catch((error) => {
//                     reject(error)
//                 })
//         })
//     },
//     put(url, params) {
//         return new Promise((resolve, reject) => {
//             axios.put(url, params)
//                 .then(response => {
//                     resolve(response.data);
//                 }, err => {
//                     reject(err);
//                 })
//                 .catch((error) => {
//                     reject(error)
//                 })
//         })
//     },
// }
function synthesisGetData(url, d) {
    let c = 0
    for (let i in d) {
        if (c === 0) {
            url += '?'
        } else {
            url += '&'
        }
        url = url + i + '=' + d[i]
        c++
    }
    return url
}
function gettoken(d) {
    let token = ''
    if (d) {
        if (token.length > 0) {
            d.access_token = token
        }
        return d
    } else {
        if (token.length > 0) {
            return {access_token: token}
        } else {
            return {}
        }
    }
}
let Api = {
    gettoken: gettoken,
    post: (url, data, res, e) => {
        let g = (data && data.getdata) ? data.getdata : null
        let postdata = data ? data.data : null
        url = synthesisGetData(url, gettoken(g))
        return axios.post(url, postdata)
    },
    get: (url, data, res, e) => {

        return axios.get(url, {params: gettoken(data),headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),
            }})
    },
    delete: (url, data, res, e) => {
        axios.delete(url, {params: gettoken(data)}).then(d => {
            res(d.body, d)
        }, err => {
            if (typeof e === 'function') {
                e(err)
            }
        })
    },
    put: (url, data, res, e) => {
        axios.put(url, data.data, {params: gettoken(null)}).then(d => {
            res(d.body, d)
        }, err => {
            if (typeof e === 'function') {
                e(err)
            }
        })
    },
    synthesisGetData: () => { return synthesisGetData }
}

export default Api

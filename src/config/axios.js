import axios from 'axios'
import store from '@/store'
import * as types from '@/store/types'
import router from '@/router'
import { baseUrl } from './env'
import  _ from 'lodash';

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
      if(_.isUndefined(error.response)){
        store.commit(types.LOGOUT)

        // 只有在当前路由不是登录页面才跳转
        router.currentRoute.path !== 'login' &&
        router.replace({
          path: 'login',
          query: { redirect: router.currentRoute.path },
        })
      }
      // if (error.response) {
      //       switch (error.response.status) {
      //           case 401:
      //               // 401 清除token信息并跳转到登录页面
      //               store.commit(types.LOGOUT)
      //
      //               // 只有在当前路由不是登录页面才跳转
      //               router.currentRoute.path !== 'login' &&
      //               router.replace({
      //                   path: 'login',
      //                   query: { redirect: router.currentRoute.path },
      //               })
      //       }
      //   }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    },
)
let Api = {
    post: (url, data, res, e) => {
        return axios.post(url, data,{headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),
            }})
    },
    get: (url, data, res, e) => {
        return axios.get(url, {headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),
            }})
    },
    delete: (url, data, res, e) => {
        return axios.delete(url, {headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),
            }})
    },
    put: (url, data, res, e) => {
        return axios.put(url, data, {headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),
            }})
    },
}

export default Api

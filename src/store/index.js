import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/getData'
import * as types from './types'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
    user: {},
    token: null,
    title: '',
    global: {
        isLogin: false,
        userInfo: {},
        access_token: '',
        refresh_token: '',
        token_type: '',
        expires_in: 0,
        oldtime: '',
        scope: '',
        detailItem: null
    },
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
    [types.LOGIN]: (state, data) => {
        localStorage.token = data;
        state.token = data;
    },
    [types.LOGOUT]: (state) => {
        localStorage.removeItem('token');
        state.token = null
    },
    [types.TITLE]: (state, data) => {
        state.title = data;
    }
}

const actions = {
	async getAdminData({commit}){
		try{
		    api.getAdminInfo().then(result =>  {

            }).catch(oError => {

            })
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})

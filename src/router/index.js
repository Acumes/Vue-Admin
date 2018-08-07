import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const userList = r => require.ensure([], () => r(require('@/page/user/user-list/userList')), 'userList');
const userOperation = r => require.ensure([], () => r(require('@/page/user/user-operation/userOperation')), 'userOperation');
const logList = r => require.ensure([], () => r(require('@/page/log/log-list/logList')), 'logList');
const logListGroupByFuntion = r => require.ensure([], () => r(require('@/page/log/log-count/logCount')), 'logListGroupByFuntion');

const routes = [
	{
		path: '/login',
		component: login
	},
    {path: '/', redirect: 'manage'},
	{
		path: '/manage',
		component: manage,
		name: '',
        meta: {
            requireAuth: true
        },
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
            path: '/userOperation',
            component: userOperation,
            meta: ['数据管理', '添加用户'],
        },{
            path: '/userOperation/edit/:id',
            component: userOperation,
            meta: ['数据管理', '修改用户'],
        },{
            path: '/userList',
            component: userList,
            meta: ['数据管理', '用户列表'],
        },
        // {
        //     path: '/logList',
        //     component: logList,
        //     meta: ['数据管理', '日志列表'],
        // },{
        //     path: '/logCount',
        //     name:'logCount',
        //     component: logListGroupByFuntion,
        //     meta: ['数据管理', '日志统计'],
        // }
        ]
	}
]
const router = new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(r => r.meta.requireAuth)) {
//         // if (window.sessionStorage.getItem("token")) {
//         //     next();
//         // }
//         // else {
//         //     next({
//         //         path: '/login',
//         //         // query: {redirect: to.fullPath}
//         //     })
//         // }
//     }
//     else {
//         next();
//     }
// })

export default router

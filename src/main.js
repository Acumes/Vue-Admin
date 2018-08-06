import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import  _ from 'lodash'
import { getTime, getMonths } from './utils/time'
import Api from './config/axios';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(_);
Vue.prototype.$getTime = getTime
Vue.prototype.$getMonths = getMonths

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})

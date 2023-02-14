import App from './App'
import Vue from 'vue'
import uView from '@/uview-ui'
import * as api from '@/common/api/index.js'
import store from '@/store/store.js'
import VueLazyload from 'vue-lazyload'
Vue.use(uView)
Vue.use(VueLazyload, {
	loading: "../static/images/load.png"
})
window.wx = {}
Vue.config.productionTip = false
uni.$u.config.unit = 'rpx'
App.mpType = 'app'
Vue.prototype.$API = api;
const app = new Vue({
	store,
	...App
})
app.$mount()


// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

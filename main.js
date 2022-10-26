import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uview-ui'
import * as api from '@/common/api/index.js'
import VueLazyload from 'vue-lazyload'
Vue.use(uView)
Vue.use(VueLazyload, {
	loading: "../static/images/load.png"
})
Vue.config.productionTip = false
uni.$u.config.unit = 'rpx'
App.mpType = 'app'
Vue.prototype.$API = api;
const app = new Vue({
	...App
})
app.$mount()
// #endif

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

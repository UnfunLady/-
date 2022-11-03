import Vue from 'vue'
import vuex from 'vuex'
import searchPage from './modules/searchPage.js'
Vue.use(vuex)
export default new vuex.Store({
	modules: {
		searchPage
	}
})

const state = {
	searchHistoryList: uni.getStorageSync('searchHistory') || []
}
const actions = {
	saveHistory({
		commit
	}, data) {
		commit('SAVEHISTORY', data)
	},
	clearHistory({
		commit
	}) {
		commit('CLEARHISTORY')
	}
}
const mutations = {
	SAVEHISTORY(state, data) {
		const noHave = state.searchHistoryList.every((history) => {
			return history !== data
		})
		// 过滤相同的搜索历史
		if (noHave) {
			state.searchHistoryList.unshift(data)
			uni.setStorage({
				key: 'searchHistory',
				data: state.searchHistoryList,
			})
		}
	},
	CLEARHISTORY(state) {
		state.searchHistoryList = []
		uni.removeStorage({
			key: 'searchHistory'
		})
	}
}
const getters = {
	getSearchHistory(state) {
		return state.searchHistoryList
	}
}
export default {
	state,
	actions,
	mutations,
	getters
}

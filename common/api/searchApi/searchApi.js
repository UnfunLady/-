import http from '../../http/http.js'
const getHotKeys = () => {
	return http.request({
		baseUrl: '/aa',
		url: `/search/api/v1/pc-wap/hot-word`,
		method: "get"
	})
}
const keyWordSearch = (keyWord) => {
	return http.request({
		baseUrl: '/aa',
		url: `/search/api/v1/pc-wap/sug?query=${keyWord}&from=wap`,
		method: "get"
	})
}
const searchResult = (query, size = 20) => {
	return http.request({
		baseUrl: '/aa',
		url: `/nc/api/v1/pc-wap/search?query=${query}&size=${size}&from=wap&needPcUrl=false`,
		method: "get"
	})
}

const searchResultHasMore = (query, page = 0, queryId = 0, size = 20 ) => {
	return http.request({
		baseUrl: '/aa',
		url: `/nc/api/v1/pc-wap/search?query=${query}&page=${page}&queryId=${queryId}&size=${size}&from=wap&needPcUrl=false`,
		method: "get"
	})
}

export default {
	getHotKeys,
	keyWordSearch,
	searchResult,
	searchResultHasMore
}

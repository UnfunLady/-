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
export default {
	getHotKeys,
	keyWordSearch
}

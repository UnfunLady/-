import http from '../../http/http.js'

const getFakeNews = () => {
	return http.request({
		baseUrl: '/req',
		url: `/ug/api/wuhan/app/article/search-list`,
		method: 'get'
	})
}
const getFakeList = (limit = 12, offset = 0) => {
	return http.request({
		baseUrl: '/req',
		url: `/ug/api/wuhan/app/article/list?limit=${limit}&offset=${offset}`,
		method: 'get'
	})
}
const getRankList = () => {
	return http.request({
		baseUrl: '/req',
		url: `/ug/api/wuhan/app/article/search-list`,
		method: 'get'
	})
}
const searchKeyWordList = (keyword) => {
	return http.request({
		baseUrl: '/req',
		url: `/ug/api/wuhan/app/article/search`,
		data: {
			keyword
		},
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		method: 'post'
	})
}
export default {
	getFakeNews,
	getFakeList,
	getRankList,
	searchKeyWordList
}

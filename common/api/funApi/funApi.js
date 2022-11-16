import http from '../../http/http.js'
const getFunNewsInfo = (num = 0) => {
	return http.request({
		baseUrl: '/cc',
		url: `/nc/article/list/T1348648517839/${num}-20.html`,
		method: "get"
	})
}
const getFunMovieTvInfo = (num = 0) => {
	return http.request({
		baseUrl: '/bb',
		url: `/touch/reconstruct/article/list/C2769L6Ewangning/${num}-20.html`,
		method: "get"
	})
}
const getHotTvInfo = (num = 0) => {
	return http.request({
		baseUrl: '/bb',
		url: `/touch/reconstruct/article/list/BD2A86BEwangning/${num}-20.html`,
		method: "get"
	})
}
const getMusicInfo = (num = 0) => {
	return http.request({
		baseUrl: '/bb',
		url: `/touch/reconstruct/article/list/BD2AC4LMwangning/${num}-20.html`,
		method: "get"
	})
}

export default {
	getFunNewsInfo,
	getFunMovieTvInfo,
	getHotTvInfo,
	getMusicInfo
}

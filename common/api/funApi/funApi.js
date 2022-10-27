import http from '../../http/http.js'
const getFunNewsInfo = (num = 0) => {
	return http.request({
		baseUrl: '/cc',
		url: `/nc/article/list/T1348648517839/${num}-20.html`,
		method: "get"
	})
}

export default {
	getFunNewsInfo
}

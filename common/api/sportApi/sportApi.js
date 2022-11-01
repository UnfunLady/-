import http from '../../http/http.js'
const getSportNews = (size = 0) => {
	return http.request({
		baseUrl: '/cc',
		url: `/nc/article/list/T1348649079062/${size}-20.html`,
		method: "get"
	})
}
export default {
	getSportNews
}

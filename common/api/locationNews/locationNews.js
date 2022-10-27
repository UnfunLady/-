import http from '../../http/http.js'
const getLocalNews = (size = 0) => {
	return http.request({
		baseUrl: '/bb',
		url: `/touch/jsonp/article/local/%E5%B9%BF%E4%B8%9C_%E5%B9%BF%E5%B7%9E/${size}-10.do`,
		method: "get"
	})
}
export default {
	getLocalNews
}

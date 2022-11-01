import http from '../../http/http.js'

const getIndexInfo = (size = 20) => {

	return http.request({
		baseUrl: '/bb',
		url: `/touch/reconstruct/article/list/BAI67OGGwangning/${size}-20.html`,
		method: 'get'
	})
}
const getDetailInfo = (size = 20) => {
	return http.request({
		baseUrl: '/bb',
		url: `/touch/reconstruct/article/list/DE0CGUSJwangning/${size}-20.html`,
		method: 'get'
	})
}
const getCharInfo = (size = 20) => {
	return http.request({
		baseUrl: '/bb',
		url: `/touch/reconstruct/article/list/DE0CE1U2wangning/${size}-20.html`,
		method: 'get'
	})
}


export default {
	getIndexInfo,
	getDetailInfo,
	getCharInfo,
}

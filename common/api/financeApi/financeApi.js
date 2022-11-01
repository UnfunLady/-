import http from '../../http/http.js'

const getIndexInfo = (size = 20) => {

	return http.request({
		baseUrl: '/bb',
		url: `/touch/reconstruct/article/list/BA8EE5GMwangning/${size}-20.html`,
		method: 'get'
	})
}
const getTicketInfo = (size = 20) => {
	return http.request({
		baseUrl: '/bb',
		url: `/touch/reconstruct/article/list/BD2C01CQwangning/${size}-20.html`,
		method: 'get'
	})
}
const getFundInfo = (size = 20) => {
	return http.request({
		baseUrl: '/bb',
		url: `/touch/reconstruct/article/list/BD2C1904wangning/${size}-20.html`,
		method: 'get'
	})
}
const getBusinessInfo = (size = 20) => {
	return http.request({
		baseUrl: '/bb',
		url: `/touch/reconstruct/article/list/BD2C24VCwangning/${size}-20.html`,
		method: 'get'
	})
}

export default {
	getIndexInfo,
	getTicketInfo,
	getFundInfo,
	getBusinessInfo
}

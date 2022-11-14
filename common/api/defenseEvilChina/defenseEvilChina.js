import http from '../../http/http.js'

const getChinaInfo = (t) => {
	return http.request({
		baseUrl: '/req',
		url: `/ug/api/wuhan/app/data/list-total?t=${t}`,
		method: 'get'
	})
}



export default {
	getChinaInfo,

}

import http from '../../http/http.js'

const getSelectOptions = (start = 0, size = 20, tid = 'T1579658657288') => {
	return http.request({
		baseUrl: '/req',
		url: `/ug/api/wuhan/app/manage/track-map-city-list`,
		method: 'get'
	})
}

const getInfoData = (cityId) => {
	return http.request({
		baseUrl: '/req',
		url: `/ug/api/wuhan/app/manage/track-map?cityId=${cityId}`,
		method: 'get'
	})
}

const getIpLocation = () => {

	return http.request({
		baseUrl: '/ip',
		url: `/locate/api/getLocByIp`,
		method: 'get'
	})
}

export default {
	getSelectOptions,
	getInfoData,
	getIpLocation
}

import http from '../../http/http.js'
const getSportNews = (size = 0) => {
	return http.request({
		baseUrl: '/cc',
		url: `/nc/article/list/T1348649079062/${size}-20.html`,
		method: "get"
	})
}
const getNBAData = (size = 0) => {
	return http.request({
		baseUrl: '/cc',
		url: `/nc/article/list/T1348649145984/${size}-20.html`,
		method: "get"
	})
}

const getFootBallData = (size = 0) => {
	return http.request({
		baseUrl: '/cc',
		url: `/nc/article/list/T1348649503389/${size}-20.html`,
		method: "get"
	})
}
const getRunData = (size = 0) => {
	return http.request({
		baseUrl: '/cc',
		url: `/nc/article/list/T1411113472760/${size}-20.html`,
		method: "get"
	})
}
export default {
	getSportNews,
	getNBAData,
	getFootBallData,
	getRunData
}

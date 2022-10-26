import http from '../../http/http.js';
// 获取制定热点精选
const getTopListInfo = () => {
	return http.request({
		url: '/nc/article/list/T1467284926140/0-10.html',
		method: "get"
	})
}

// 获取视频和普通
const getIndexPageInfo = (size = 0) => {
	return http.request({
		url: `/nc/article/headline/T1348647853363/${size}-40.html`,
		method: "get"
	})
}

export default {
	getIndexPageInfo,
	getTopListInfo
}

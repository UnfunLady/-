import http from '../../http/http.js'
const getVideosInfo = () => {
	return http.request({
		url: "/recommend/getChanListNews?channel=T1457068979049&size=20",
		method: "get",
	})
}
const getOldVideosInfo = () => {
	return http.request({
		baseUrl: "/bb",
		url: "/touch/nc/api/video/recommend/Video_Recom/0-20.do?callback=videoList",
		method: "get",
	})
}


export default {
	getVideosInfo,
	getOldVideosInfo,
}

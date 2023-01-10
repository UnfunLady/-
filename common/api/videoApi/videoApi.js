import http from '../../http/http.js'
const getVideosInfo = () => {
	return http.request({
		url: "/recommend/getChanListNews?channel=T1457068979049&size=20",
		method: "get",
	})
}

export default {
	getVideosInfo
}

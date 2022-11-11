import http from '../../http/http.js'
const getTopNewsInfo = (num = 1) => {
	return http.request({
		baseUrl: '/tt',
		url: "/list/?tag=__all__&max_time=0&min_behot_time=0&ac=wap&count=20&format=json_raw&_signature=WRee-wAAOn.4frlIdlm.41kXnu&i=&as=A1066386FCF66D1&cp=636CF646DD113E1&aid=1698",
		method: "get",
	})
}

export default {
	getTopNewsInfo
}

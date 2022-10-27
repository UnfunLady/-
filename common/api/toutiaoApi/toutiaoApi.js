import http from '../../http/http.js'
const getTopNewsInfo = (num = 1) => {
	return http.request({
		baseUrl: '/tt',
		url: "/list/?tag=__all__&max_time=0&min_behot_time=0&ac=wap&count=20&format=json_raw&_signature=QxgQbgAAIETicTfd68XKo0MYEH&i=&as=A1B683053AD4DA4&cp=635A448D5AC40E1&aid=1698",
		method: "get",
	})
}

export default {
	getTopNewsInfo
}

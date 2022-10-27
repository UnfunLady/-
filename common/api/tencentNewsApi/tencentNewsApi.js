import http from '../../http/http.js'
const getTopNewsInfo = (num = 1) => {
	return http.request({
		baseUrl: '/tx',
		url: "/trpc.qqnews_web.pc_base_srv.base_http_proxy/NinjaPageContentSync?pull_urls=news_top_2018",
		method: "get",
	})
}

export default {
	getTopNewsInfo
}

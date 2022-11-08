import http from '@/common/http/http.js'

const getHotRepry = (size = 30) => {
	return http.request({
		baseUrl: '/aa',
		url: `/gentie-web/api/v2/products/a2869674571f77b5a0867c3d71db5856/rankDocs/all/list?ibc=newsapph5&limit=${size}`
	})
}

const getHotNews = () => {
	return http.request({
		baseUrl: '/aa',
		url: '/nc-main/api/v1/hqc/no-repeat-hot-list'
	})
}

const getHotSearch = () => {
	return http.request({
		baseUrl: '/aa',
		url: '/search/api/v2/hot-search'
	})
}

const getHotVideo = () => {
	return http.request({
		baseUrl: '/aa',
		url: '/nc/api/v1/feed/dynamic/hqc/video-hot-list'
	})
}

export default {
	getHotRepry,
	getHotNews,
	getHotSearch,
	getHotVideo
}

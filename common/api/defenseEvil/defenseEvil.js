import shttp from '../../http/shttp.js'

const getEvilInfo = (start = 0, size = 20, tid = 'T1579658657288') => {
	return shttp.request({
		url: `/nc/api/v1/feed/static/h5-normal-list?start=${start}&size=${size}&tid=${tid}`,
		method: 'get'
	})
}

export default {
	getEvilInfo
}

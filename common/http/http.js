export default {
	common: {
		baseUrl: '/req',
		header: {
			'content-type': 'application/json;charset=UTF-8',
			// 'content-type': 'application/x-www-form-urlencoded'
		},
		data: {},
		method: "GET",
		dataType: "json"
	},
	request(options = {}) {
		options.url = options.baseUrl ? options.baseUrl + options.url : this.common.baseUrl + options.url;
		options.data = options.data || this.common.data;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method;
		options.dataType = options.dataType || this.common.dataType;

		return new Promise((res, rej) => {
			uni.showLoading({
				title: "加载数据中...",
			})
			uni.request({
				...options,
				success: (result) => {

					if (result.statusCode != 200) {
						return rej();
					}
					let data = result.data;
					res(data);
					uni.hideLoading()
				},
				complete: () => {
					uni.hideLoading()
				}
			})
		})
	}

}

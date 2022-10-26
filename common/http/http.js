export default {
	common: {
		baseUrl: '/req',
		header: {
			'content-type': 'application/json',
			'content-type': 'application/x-www-form-urlencoded'
		},
		method: "GET",
		dataType: "json"
	},
	request(options = {}) {
		options.url = this.common.baseUrl + options.url;
		options.data = options.data || this.common.data;
		options.data = options.header || this.common.header;
		options.data = options.method || this.common.method;
		options.data = options.dataType || this.common.dataType;
		return new Promise((res, rej) => {
			uni.request({
				...options,
				success: (result) => {
					if (result.statusCode != 200) {
						return rej();
					}
					let data = result.data;
					res(data);
				}
			})
		})
	}

}

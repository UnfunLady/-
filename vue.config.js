module.exports = {
	devServer: {
		proxy: {
			'/req': {
				target: 'http://c.m.163.com',
				changeOrigin: true,
				pathRewrite: {
					'^/req': ''
				}
			},
			'/aa': {
				target: 'https://gw.m.163.com',
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/aa': ''
				}
			},
			'/bb': {
				target: 'https://3g.163.com',
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/bb': ''
				}
			},
		},
	}
}

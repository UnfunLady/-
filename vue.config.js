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
			'/cc': {
				target: 'http://c.3g.163.com',
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/cc': ''
				}
			},
			'/tx': {
				target: 'https://i.news.qq.com',
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/tx': ''
				}
			},
			'/tt': {
				target: 'https://m.toutiao.com',
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/tt': ''
				}
			},

		},
	}
}

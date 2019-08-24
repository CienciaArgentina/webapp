const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withOffline = require('next-offline');

const options = {
	workboxOpts: {
		runtimeCaching: [
			{
				urlPattern: /(?:\.png||\.css||\.jpg)$/,
				handler: 'cacheFirst'
			},
			{
				urlPattern: /^\/$/,
				handler: 'networkFirst',
				// options: {
				// 	cacheableResponse: {
				// 		statuses: [0, 200],
				// 		headers: {
				// 			'x-test': 'true'
				// 		}
				// 	}
				// }
			},
			{
				urlPattern: /.+/,
				handler: 'networkFirst'
			}
		]
	}
}


module.exports = withCSS(withSass(withOffline()))
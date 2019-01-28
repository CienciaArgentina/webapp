import React from 'react'
import App, { Container } from 'next/app';

import 'normalize.css/normalize.css';
import "../scss/main.scss";

// const breakpoints = {
// 	mobile: 376,
// 	mobileLandscape: 426,
// 	tablet: 769,
// 	tabletLandscape: 1025,
// 	desktop: 1200,
// 	desktopLarge: 1500,
// 	desktopWide: 1920,
// }

export default class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {}
		
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		
		return { pageProps }
	}
	render() {
		const { Component, pageProps } = this.props
		
		return (
			<Container>
				<Component {...pageProps}/>
			</Container>
		)
	}
}
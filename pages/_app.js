import React from 'react'
import App from 'next/app';

import { Provider } from 'react-redux';
import withReduxStore from '../lib/with-redux-store'
import ErrorPage from './_error'
import {
	updateMyData,
	setLogged
} from '../src/actions'

import 'normalize.css/normalize.css';
import "../scss/main.scss";

//cookies
import { parseCookies, setCookie, destroyCookie } from 'nookies'

class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {}
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		const cookies = parseCookies(ctx);
		if(!process.browser) {
			// console.log('Server execution');
			if(cookies.logged) {
				//TOOODOOOOO
			}
			//TODO: ver si hay un jwt guardado en una cookie y
			//		usarlo para hacer request con la info de la persona.
			//		(y guardarlo en redux)
			ctx.reduxStore.dispatch(updateMyData())
		}
		return { pageProps }
	}
	render() {
		const { Component, pageProps, reduxStore } = this.props
		
		return (
			<Provider store={reduxStore}>
				{pageProps.hasOwnProperty('error') ?
					<ErrorPage {...pageProps.error} />
					:
					<Component {...pageProps}/>
				}
			</Provider>
		)
	}
}

export default withReduxStore(MyApp)
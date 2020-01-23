import React from 'react'
import App from 'next/app';

import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import withReduxSaga from 'next-redux-saga'
import configureStore from '../store'

import ErrorPage from './_error'
import {
	updateMyData
} from '../src/actions'

import 'normalize.css/normalize.css';
import "../scss/main.scss";

//cookies
import { parseCookies, setCookie, destroyCookie } from 'nookies'

class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {

		updateMyData(ctx.store.dispatch)
		
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
		const cookies = parseCookies(ctx);
		if(!process.browser) {
			//this is server side
			// console.log('Server execution');
			if(cookies.logged) {
				//TOOODOOOOO
			}
			//TODO: ver si hay un jwt guardado en una cookie y
			//		usarlo para hacer request con la info de la persona.
			//		(y guardarlo en redux)
		}
		return { pageProps }
	}
	render() {
		const { Component, pageProps, store } = this.props
		
		return (
			<Provider store={store}>
				{pageProps.hasOwnProperty('error') ?
					<ErrorPage {...pageProps.error} />
					:
					<Component {...pageProps}/>
				}
			</Provider>
		)
	}
}

export default withRedux(configureStore)(withReduxSaga(MyApp))
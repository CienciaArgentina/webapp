import React from 'react'
import App from 'next/app';

import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import withReduxSaga from 'next-redux-saga'
import configureStore from '../store'

import ErrorPage from './_error'
import {
	updateMyData,
	setCreatingProfile,
	setUserData
} from '../src/actions'

import 'normalize.css/normalize.css';
import "../scss/main.scss";

//cookies
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import axiosInstance from 'src/api/utils/axiosInstance';

class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		const cookies = parseCookies(ctx);
		if(!process.browser) {
			// server side
			let jwtToken = false
			if(cookies.user_data) {
				jwtToken = JSON.parse(cookies.user_data).jwtToken
				axiosInstance.defaults.headers.Authorization = jwtToken
				await updateMyData(ctx.store.dispatch)
			}
		} else {
			// client side
			// if(cookies.user_data && !ctx.store.getState().user.isLogged && ctx.pathname!='/createProfile') {
			// 	router.push('/createProfile')
			// }
		}
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx, router) : {};
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
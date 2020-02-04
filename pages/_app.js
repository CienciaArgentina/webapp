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

class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		const cookies = parseCookies(ctx);
		if(!process.browser) {
			// server side
			if(cookies.userData) {
				const error = await updateMyData(ctx.store.dispatch, JSON.parse(cookies.userData).userName)
				if(error === 'profileIncomplete') {
					if(router.route!='/createProfile') {
						// redirect to createProfile
						ctx.res.writeHead(302, {
							Location: '/createProfile'
						});
						ctx.res.end();
					} else {
						// estoy en createProfile
						ctx.store.dispatch(setCreatingProfile(true))
					}
				}
			}
		} else {
			// client side
			if(cookies.userData && !ctx.store.getState().user.isLogged && ctx.pathname!='/createProfile') {
				router.push('/createProfile')
			}
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
import React from 'react'
import App, { Container } from 'next/app';

import { Provider } from 'react-redux';
import withReduxStore from '../lib/with-redux-store'

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
			// console.log(cookies);
			//TODO: ver si hay un jwt guardado en una cookie y
			//		usarlo para hacer request con la info de la persona.
			//		(y guardarlo en redux)
			ctx.reduxStore.dispatch({type:'INITUSER', data: {
				isLogged: true,
				username: 'matiasngf',
				email: 'matiasngf@gmail.com',
				rol:'admin'
			}})
		}
		return { pageProps }
	}
	render() {
		const { Component, pageProps, reduxStore } = this.props
		
		return (
			<Container>
				<Provider store={reduxStore}>
					<Component {...pageProps}/>
				</Provider>
			</Container>
		)
	}
}

export default withReduxStore(MyApp)
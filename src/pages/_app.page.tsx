import React from 'react'
//store
import { wrapper } from '@store/index'
import { setUserLogged, setUserNotLogged } from '@store/user/user.actions';

import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'
import { theme } from '../theme'
//default layout
import MainLayout from '@layouts/main/MainLayout'

//initial props
import {cienciaArgentinaRequest} from '@utils/httpClient'
import { parseCookies } from 'nookies'
import { getMyProfile } from '@api/user_profiles'
import App, { AppContext } from 'next/app'
// import { AppInitialProps } from 'next/app'

const GlobalStyle = createGlobalStyle`
	html {
		font-size: 62.5%;
		height: 100%;
	}
	body {
		font-family: 'Montserrat', sans-serif;
		min-height: 100%;
		font-size: 1.4rem;
	}
	*, h1, h2, h3, h4, p, a, button {
		padding: 0;
		margin: 0;
	}
	a {
		text-decoration: none;
	}
`

class MyApp extends App<any> {
	public static getInitialProps = async ({Component, ctx}: AppContext) => {
		const cookies = parseCookies(ctx);
		// console.log();	
		if(!process.browser) {
			// server side
			let jwtToken:string|undefined = undefined
			if(cookies.authToken) {
				jwtToken = cookies.authToken
				cienciaArgentinaRequest.defaults.headers.Authorization = jwtToken			
				try {
					const user_data  = await getMyProfile()
					ctx.store.dispatch(setUserLogged(user_data))
				} catch(e) {
					ctx.store.dispatch(setUserNotLogged())
				}
	
				
			}
		}
		return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
                // Some custom thing for all pages
            },
        };
	}

	render() {
		const {Component, pageProps} = this.props
		const Layout = Component.Layout ? Component.Layout : MainLayout;
		const LayoutProps = Component.LayoutProps ? Component.LayoutProps : {};
		return (
			<div id='app'>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<Head>
						<link href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>
						<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
					</Head>
					<Layout {...LayoutProps}>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</div>
		)
	}
}

export default wrapper.withRedux(MyApp)
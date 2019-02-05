import Header from './components/header';
import { Component } from 'react';
import Head from 'next/head'
import Document, { Main, NextScript } from 'next/document';
import NProgress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', (url) => {
	console.log(`Loading: ${url}`)
	NProgress.start()
  })
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

NProgress.configure({
	showSpinner: false,
	minimum: 0.2
});

export default class Page extends Component {
	state = {
		mobile_menu_display: false,
		mobile_menu_show: false,
		noscroll: false,
	}
	showMenu = () => {
		this.setState( () => ({mobile_menu_display: true, noscroll: true}) );
		setTimeout( () => {
			this.setState( () => ({mobile_menu_show: true}) );
		}, 10);
	}
	hideMenu = () => {
		this.setState( () => ({mobile_menu_show: false, noscroll: false}) );
		setTimeout( () => {
			this.setState( () => ({mobile_menu_display: false}) );
		}, 300);
	}
	render() {
		return (
			<div id="app" {...this.props.pageprops}>
				<Head>
					<title>{this.props.title?this.props.title+' | ':''}Ciencia Argentina</title>
					<meta name="og:title" property="og:title" content={
						this.props.title?this.props.title+' | Ciencia Argentina':'Ciencia Argentina'
					} />
					<meta name="description" content={
						this.props.description ? this.props.description :
						'Encontrá tu lugar en la ciencia.'
					} />
					<meta name="og:description" property="og:description" content={
						this.props.description ? this.props.description :
						'Encontrá tu lugar en la ciencia.'
					} />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={
						this.props.ogimage ?
						this.props.ogimage :
						'/static/img/favicon/ogimage.jpg'
					} />
					<meta property="og:site_name" content="Ciencia Argentina" />
					{/* FAVICONS */}
					<link rel="icon" type="image/x-icon" href="/static/img/favicon/favicon.ico" />
					<link rel="icon" type="image/png" sizes="192x192"  href="/static/img/favicon/android-icon-192x192.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="96x96" href="/static/img/favicon/favicon-96x96.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon/favicon-16x16.png" />
					{/* apple */}
					<link rel="apple-touch-icon" sizes="57x57" href="/static/img/favicon/apple-icon-57x57.png" />
					<link rel="apple-touch-icon" sizes="60x60" href="/static/img/favicon/apple-icon-60x60.png" />
					<link rel="apple-touch-icon" sizes="72x72" href="/static/img/favicon/apple-icon-72x72.png" />
					<link rel="apple-touch-icon" sizes="76x76" href="/static/img/favicon/apple-icon-76x76.png" />
					<link rel="apple-touch-icon" sizes="114x114" href="/static/img/favicon/apple-icon-114x114.png" />
					<link rel="apple-touch-icon" sizes="120x120" href="/static/img/favicon/apple-icon-120x120.png" />
					<link rel="apple-touch-icon" sizes="144x144" href="/static/img/favicon/apple-icon-144x144.png" />
					<link rel="apple-touch-icon" sizes="152x152" href="/static/img/favicon/apple-icon-152x152.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/static/img/favicon/apple-icon-180x180.png" />
					{/* android */}
					{/* ms */}
					<meta name="msapplication-TileColor" content="#1b75bb" />
					<meta name="msapplication-TileImage" content="/static/img/favicon/ms-icon-144x144.png" />
					<meta name="msapplication-square70x70logo" content="/static/img/favicon/ms-icon-70x70.png" />
					<meta name="msapplication-square150x150logo" content="/static/img/favicon/ms-icon-150x150.png" />
					<meta name="msapplication-square310x310logo" content="/static/img/favicon/ms-icon-310x310.png" />
					<meta name="msapplication-wide310x150logo" content="/static/img/favicon/ms-icon-wide-310x150.png" />
					{/* theme */}
					<meta name="theme-color" content="#1b75bb" />
					{/* END FAVICONS */}
					<link rel="stylesheet" href="/static/css/nprogress.css" />
				</Head>
				<Header
					showMenu={this.showMenu}
					hideMenu={this.hideMenu}
					mobile_menu_display={this.state.mobile_menu_display}
					mobile_menu_show={this.state.mobile_menu_show}
				/>
				<div id="content" className={this.props.contentClass?this.props.contentClass:''}>
					{this.props.children}
				</div>
				<footer>
					<div>
						<img src="/static/img/logos/icon-white.svg" />
						Ciencia Argentina
					</div>
				</footer>
			</div>
		);
	}
}
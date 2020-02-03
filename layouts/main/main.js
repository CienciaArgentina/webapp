import Header from './components/Header';
import Footer from './components/Footer';
import SiteHead from './components/SiteHead'
import { Component } from 'react';
import Document, { Main, NextScript } from 'next/document';
import NProgress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', (url) => {
	NProgress.start()
  })
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

NProgress.configure({
	showSpinner: false,
	minimum: 0.2
});

//redux
import { connect } from 'react-redux'
// import { startClock, serverRenderClock } from '../../store'
// --- Importar funciones del store --- //


class Page extends Component {
	_isMounted = false
	// static async getInitialProps({ store, req }) {
	// 	console.log('DONDE MIERDA ESTOY');
		
	// 	const isServer = !!req
	// 	if(isServer) {
	// 		console.log('This is server');
	// 	}
	// 	console.log(isServer);
		
	// 	// await store.dispatch(serverRenderClock(isServer))
	// 		// --- Uso alguna funcion cuando cargo --- //
	// 	return {}
	// }
	state = {
		mobile_menu_display: false,
		mobile_menu_show: false,
		noscroll: false,
		canInstallApp: false,
		installApp: false
	}
	showMenu = () => {
		this.setState( () => ({mobile_menu_display: true, noscroll: true}) );
		document.querySelector('body').classList.add('noScroll')
		setTimeout( () => {
			this.setState( () => ({mobile_menu_show: true}) );
		}, 10);
	}
	hideMenu = () => {
		document.querySelector('body').classList.remove('noScroll')
		if(this._isMounted) {
			this.setState( () => ({mobile_menu_show: false, noscroll: false}) );
		}
		setTimeout( () => {
			if(this._isMounted) {
				this.setState( () => ({mobile_menu_display: false}) );
			}
		}, 300);
	}
	handleInstallApp = () => {
		let deferredPrompt = this.state.installApp;
		deferredPrompt.prompt();

		// Follow what the user has done with the prompt.
		deferredPrompt.userChoice.then((choiceResult) => {
		  console.log(choiceResult.outcome);
		  if(choiceResult.outcome == 'dismissed') {
			console.log('User cancelled home screen install');
		  }
		  else {
			console.log('User added to home screen');
			this.setState(()=>({
				canInstallApp: false,
				installApp: false
			}))
		  }
		});
	}
	handlePanRight = e => {
		if(e.isFinal && e.distance > 100) {
			this.showMenu()
			// const startX = e.changedPointers[0].screenX-e.deltaX
			// if(startX < 120) {
			// }
		}
	}
	handlePanLeft = e => {
		if(e.isFinal && e.distance > 100) {
			this.hideMenu()
		}
	}
	componentDidMount() {
		const { dispatch } = this.props
		this._isMounted = true
		if(process.browser) {
			const _touchDevice = "ontouchstart" in document.documentElement
			if(_touchDevice) {
				// start Hammer to create touch events
				const Hammer = require('hammerjs')
				const viewerImage = document.getElementById("app")
				const hammertime = new Hammer(viewerImage)
				hammertime.on("panright", this.handlePanRight)
				hammertime.on("panleft", this.handlePanLeft)	
			}
		}

		// this.timer = startClock(dispatch)
		// --- Uso alguna funcion cuando cargo local --- //
		
		window.addEventListener('beforeinstallprompt', (e) => {
		  console.log('beforeinstallprompt Event fired');
		  e.preventDefault();
		  // Stash the event so it can be triggered later.
		  this.setState(()=>({
			canInstallApp: true,
			installApp: e
		  }))
		  return false;
		});
	}
	componentWillUnmount() {
		this._isMounted = false
		document.querySelector('body').classList.remove('noScroll')
	}
	render() {
		return (
			<div id="app" {...this.props.pageprops}>
				<SiteHead
					title = {this.props.customMeta ? this.props.customMeta.title : false}
					description = {this.props.customMeta ? this.props.customMeta.description : false}
					ogimage = {this.props.customMeta ? this.props.customMeta.ogimage : false}
				/>
				<Header
					canInstallApp={this.state.canInstallApp}
					installApp={this.handleInstallApp}
					showMenu={this.showMenu}
					hideMenu={this.hideMenu}
					mobile_menu_display={this.state.mobile_menu_display}
					mobile_menu_show={this.state.mobile_menu_show}
				/>
				<div id="content" className={this.props.contentClass?this.props.contentClass:''}>
					{this.props.children}
				</div>
				<Footer />
				{this.props.loading &&
					<div className='__fullLoading'>
						<img src='/static/img/loading_adn.gif' />
						<p>Cargando</p>
					</div>
				}
			</div>
		);
	}
}

export default connect()(Page)
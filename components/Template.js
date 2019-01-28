import Header from './Header';
import {Component} from 'react';

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
				<Header
					showMenu={this.showMenu}
					hideMenu={this.hideMenu}
					mobile_menu_display={this.state.mobile_menu_display}
					mobile_menu_show={this.state.mobile_menu_show}
				/>
				<div id="content">
					{this.props.children}
				</div>
				<footer>
					<div>
						<img src="./static/img/logos/icon-white.svg" />
						© 2019 Ciencia Argentina
					</div>
				</footer>
			</div>
		);
	}
}

// const Page = (props) => (
// 	<div id="app">
// 		<Header  />
// 		<div id="content">
// 			{props.children}
// 		</div>
// 		<footer>
// 			<div>
// 				<img src="./static/img/logos/icon-white.svg" />
// 				© 2019 Ciencia Argentina
// 			</div>
// 		</footer>
// 	</div>
// );
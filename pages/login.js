import Page from '../layouts/main/main'
import {
	Input
} from '../components/Science'

import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { AuthApi } from '../src/api/api'
import Router, { withRouter } from 'next/router'

export default class login extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		user: '',
		password: ''
	}
	// static async getInitialProps(ctx) {
	// 	// Parse
	// 	const cookies = parseCookies(ctx);
	// 	return {
	// 		name: cookies.loginName
	// 	}
	// }
	sendLogin = (event) => {
		event.preventDefault();

		if(this.userInput.validate().valid && this.passwordInput.validate().valid) {
			AuthApi.login(this.state.user, this.state.password).then(response => {
				console.log('Salio todo bien');
				Router.push('/');
			}).catch(err => {
				const status = err.status;
				//TODO: chequear si el error es por usuario / contraseña incorrecto
				Router.push('/error?code='+status,'/error');
			})
		}
		// setCookie(false, 'loginName', user, {
		// 	maxAge: 30 * 24 * 60 * 60,
		// 	path: '/',
		// });
	}
	handleChange = e => {
		const name = e.target.name;
		const val = e.target.value
		this.setState(()=>({
			[name]: val
		}));
	}
	render() {
		return (
			<Page>
				<div className="container pt-6">
					<form onSubmit={this.sendLogin}>
						<Input
							label="Nombre de usuario"
							name="user"
							onChange={this.handleChange}
							value={this.state.user}
							required
							ref={ (input) => {this.userInput = input} }
						/>
						<Input
							label="Contraseña"
							type='password'
							name="password"
							onChange={this.handleChange}
							value={this.state.password}
							required
							ref={ (input) => {this.passwordInput = input} }
						/>
						<div className="mt-4 ml-2">
							<button type='submit'>Ingresar</button>
						</div>
					</form>
				</div>
			</Page>
		)
	}
}
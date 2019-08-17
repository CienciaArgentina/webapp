import Page from '../layouts/main/main'
import {
	Input
} from '../components/Science'

import { AuthApi } from '../src/api/api'
import Router from 'next/router'


export default class login extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		user: '',
		email: '',
		password: ''
	}
	sendRegister = (event) => {
		event.preventDefault();

		if(this.userInput.validate().valid && this.emailInput.validate().valid && this.passwordInput.validate().valid) {
			AuthApi.register(this.state.user, this.state.email, this.state.password).then(response => {
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
					<form onSubmit={this.sendRegister}>
						<div>
							<Input
								label="Correo electrónico"
								name="email"
								onChange={this.handleChange}
								value={this.state.email}
								required
								type="mail"
								placeholder="ejemplo@mail.com"
								validation = {[
									v => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v)
									? true : 'Ingresa un correo válido'
								]}
								ref={ (input) => {this.emailInput = input} }
							/>
							<Input
								label="Nombre de usuario"
								name="user"
								onChange={this.handleChange}
								value={this.state.user}
								required
								preInput='@'
								placeholder='usuario'
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
						</div>
						<div className="mt-4 ml-2">
							<button type="submit">Registrarse</button>
						</div>
					</form>
				</div>
			</Page>
		)
	}
}
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
		password: '',
		repeatPassword: '',
		errorMsg: false,
		registerConfirmed: false,
		registeredEmail: false,
		loading: false,
	}
	sendRegister = (event) => {
		event.preventDefault();

		if(this.userInput.validate().valid && this.emailInput.validate().valid && this.passwordInput.validate().valid) {
			this.setState(()=>({loading:true}))
			AuthApi.register(this.state.user, this.state.email, this.state.password).then(response=>{
				const registeredEmail = response.email
				this.setState(()=>({
					loading:false,
					registerConfirmed: true,
					registeredEmail
				}))
			}).catch(err=>{
				let status = err.status;
				if(status) {
					if(status==400) {
						const error = err.data[0].code;
						const errorMsg = {
							InvalidEmail: 'Ingresá un correo válido.',
							DuplicateUserName: 'Nombre de usuario no disponible.',
							DuplicateEmail: 'Ya existe una cuenta con ese correo.',
						}[error];
						this.setState(()=>({loading:false}))
						this.setState(()=>({errorMsg}))
						return true
					}
				}
				this.setState(()=>({loading:false}))					
				Router.push('/error?code='+status,'/error');
			});
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
			<Page loading={this.state.loading} contentClass='register-root'>
				<div id='register'>
					{this.state.registerConfirmed ?
						<div className='__confirmEmail'>
							<p>
								Gracias por registrarte.<br></br>Deberás confirmar tu cuenta en el link que te enviamos a <b>{this.state.registeredEmail}.</b>
							</p>
						</div>
					:
						<div className="__registerForm container pt-6">
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
										inputProps={{autoComplete:'off'}}
										placeholder='usuario'
										ref={ (input) => {this.userInput = input} }
									/>
									<Input
										label="Contraseña"
										type='password'
										name="password"
										onChange={this.handleChange}
										value={this.state.password}
										validation = {[
											v => /[A-Z]/.test(v) ? true : 'Debe contener una mayúscula',
											v => /[a-z]/.test(v) ? true : 'Debe contener una minúscula',
											v => /[0-9]/.test(v) ? true : 'Debe contener un número',
											v => v.length > 5 ? true : 'Debe contener al menos 6 caracteres'
										]}
										required
										ref={ (input) => {this.passwordInput = input} }
									/>
									<Input
										label="Repeti tu contraseña"
										type='password'
										name="repeatPassword"
										onChange={this.handleChange}
										value={this.state.repeatPassword}
										validation = {[
											v => v==this.state.password ? true : 'Las contraseñas deben coincidir.',
										]}
										required
										ref={ (input) => {this.repeatPasswordInput = input} }
									/>
								</div>
								<div className="mt-4 ml-2">
									<button type="submit">Registrarse</button>
								</div>
							</form>
							{this.state.errorMsg && <p>{this.state.errorMsg}</p>}
						</div>
					}
				</div>
			</Page>
		)
	}
}
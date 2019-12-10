import Page from '../layouts/main/main'
import {
	Input
} from '../components/Science'
import Link from 'next/link'

import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { AuthApi } from '../src/api/api'
import Router, { withRouter } from 'next/router'
import Modal from 'react-modal'
Modal.setAppElement('#app');

export default class login extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		user: '',
		password: '',
		errorMsg: '',
		emailNotConfirmed: false,
		emailToConfirm: '',
		emailResended: false,
		loadig: false
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
		if(this.state.loadig || this.state.emailNotConfirmed || this.state.emailResended) {
			return false
		}
		if(this.userInput.validate().valid && this.passwordInput.validate().valid) {
			this.setState(()=>({
				errorMsg: '',
				loading: true
			}))
			AuthApi.login(this.state.user, this.state.password).then(response => {
				console.log('Login OK');
				console.log(response);
				setCookie(false, 'jwtToken', response.data.jwtToken.token, {
					maxAge: 2 * 24 * 60 * 60,
					path: '/',
				});
				setCookie(false, 'logged', true, {
					maxAge: 2 * 24 * 60 * 60,
					path: '/',
				})
				setCookie(false, 'email', response.data.email, {
					maxAge: 2 * 24 * 60 * 60,
					path: '/',
				})
				Router.push('/');
			}).catch(err => {
				const status = err.status;
				let error_know = false;
				if(status==400) {
					if(err.data.error[0].code == 'PasswordOrUserIncorrect') {
						error_know = true
						this.setState(()=>({
							errorMsg: 'Usuario o contraseña incorrectos.',
							loading: false
						}))
					} else if(err.data.error[0].code == 'EmailNotConfirmed') {
						//falta confirmar email
						this.setState(()=>({
							emailNotConfirmed:true,
							loading: false,
							emailToConfirm: err.data.data.email
						}))
						error_know = true
					}
				}
				if(!error_know) {
					Router.push('/error?code='+status,'/error');
				}
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
	resendConfirmation = () => {
		this.setState(()=>({
			loading:true,
			emailNotConfirmed: false
		}))
		AuthApi.sendConfirmationRegisterMail(this.state.emailToConfirm).then(response=>{
			this.setState(()=>({
				loading:false,
				emailResended: true
			}))
		}).catch(err=>{
			alert('ERROR')
			console.error(err)
		})
	}
	render() {
		return (
			<Page loading={this.state.loading}>
				<div className="container pt-6 pb-4">
					<Modal
						isOpen={this.state.emailResended}
						className='defaultModal --adviceModal --s'
					>
						<div className='__notConfirmed'>
							<h2>Email reenviado correctamente.</h2>
							<p>Te enviamos un link a <b>{this.state.emailToConfirm}</b> para confirmar tu cuenta.</p>
						</div>
					</Modal>
					<Modal
						isOpen={this.state.emailNotConfirmed}
						className='defaultModal --adviceModal --s'
					>
						<div className='__notConfirmed'>
							<h2>Debes confirmar tu email.</h2>
							<p>Cuándo te registraste, te enviamos un correo a <b>{this.state.emailToConfirm}</b> con un enlace para confirmar tu cuenta.</p>
							<div className='__resendEmail mt-3'>
								<p>¿No encontrás el correo?</p>
								<button onClick={this.resendConfirmation}>
									Reenviar correo de confirmación
								</button>
							</div>
						</div>
					</Modal>
					<div className='__logForm'>
						<h2 className='mb-2'>Ingresá a Ciencia Argentina</h2>
						<p className='mb-4'>
							¿No tenés cuenta? <Link href='/register'><a className='link'>Registrate acá</a></Link>
						</p>
						<form onSubmit={this.sendLogin}>
							<div className='__inputs'>
								<Input
									fullWidth
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
									fullWidth
									label="Contraseña"
									type='password'
									name="password"
									onChange={this.handleChange}
									value={this.state.password}
									required
									ref={ (input) => {this.passwordInput = input} }
								/>
							</div>
							<div className="mt-4">
								<button type='submit'>Ingresar</button>
							</div>
							{!!this.state.errorMsg &&
								<div>
									<p>
										{this.state.errorMsg}
									</p>
								</div>
							}
						</form>
						<div className='mt-5'>
							<Link href='/forgotpassword'>
								<p className='link'>Olvidé mi contraseña</p>
							</Link>
							<Link href='/forgotUser'>
								<p className='link mt-2'>Olvidé mi usuario</p>
							</Link>
						</div>
					</div>
				</div>
			</Page>
		)
	}
}
import Page from '../layouts/main/main'
import {
	Input
} from '../components/Science'
import Link from 'next/link'
import { setCookie } from 'nookies'
import { UserApi } from '../src/api/api'
import Router from 'next/router'
import Modal from 'react-modal'
import { connect } from 'react-redux'
Modal.setAppElement('#app');

class login extends React.Component {
	static async getInitialProps(ctx) {
		if(ctx.store.getState().user.isLogged){
			if(!process.browser) {
				ctx.res.writeHead(302, {
					Location: '/'
				});
				ctx.res.end();
			}
		}
		return {}
	}
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
			UserApi.login(this.state.user, this.state.password).then(response => {
				setCookie(false, 'user_data',
					JSON.stringify({
						jwtToken: response.jwt,
						// email: response.data.email,
						// userName: this.state.user
					}),
					{
						maxAge: 2 * 24 * 60 * 60,
						path: '/',

					}
				)
				location.reload()
				// const cookies = parseCookies()
				// updateMyData(this.props.dispatch, JSON.parse(cookies.user_data).userName).then(()=>{
				// 	Router.push('/');
				// }).catch(e=>{
				// 	console.log(e);
					
				// })
			}).catch(err => {
				console.log(err);
				console.log(err.data.error[0].code);
				
				const status = err.status;
				let error_know = false;
				if(status==400) {
					if(err.data.error[0].code == 'invalid_login' || err.data.error[0].code == 'bad_request') {
						error_know = true
						this.setState(()=>({
							errorMsg: 'Usuario o contraseña incorrectos.',
							loading: false
						}))
					} else if(err.data.error[0].code == 'email_not_verified') {
						//falta confirmar email
						this.setState(()=>({
							emailNotConfirmed:true,
							loading: false,
							emailToConfirm: err.data.error[0].detail
						}))
						error_know = true
					}
				}
				if(!error_know) {
					Router.push('/error?code='+status,'/error');
				}
			})
		}
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
		UserApi.sendConfirmationEmail(this.state.emailToConfirm).then(response=>{
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

const mapStateToProps = state => {
	return {
		isLogged: state.user.isLogged,
		user_data: state.user.user_data
	}
}

export default connect(mapStateToProps)(login);
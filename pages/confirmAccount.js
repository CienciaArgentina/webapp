import React from 'react'
import Page from '../layouts/main/main'
import { UserApi } from '../src/api/api'

export default class confirmAccount extends React.Component  {
	static async getInitialProps(context) {
		const email = context.query.email
		const token = context.query.token
		return {email,token}
	}
	state = {
		error: false,
		errorMsg: false,
		loading: true,
		canResend:false
	}
	__invalidLink = () => ({
		error: true,
		loading: false,
		errorMsg: 'Este link no es válido.'
	})
	componentDidMount() {
		if(!!this.props.email && !!this.props.token) {
			UserApi.confirmAccount(this.props.email, this.props.token).then(response=>{
				if(response.status === 204) {
					this.setState(this.__invalidLink)
				} else if(response.status==200) {
					this.setState(()=>({
						error: false,
						loading: false,
						errorMsg: false
					}))
				}
			}).catch(response=>{
				if(response.status === 400) {
					const error = response.data[0].code;
					const errorMsg = {
						InvalidToken: 'El link ingresado ya no es válido.'
					}[error]
					console.log(error, errorMsg);
					this.setState(this.__invalidLink)
					this.setState(()=>({canResend:true}))
				}
			})
		} else {
			this.setState(this.__invalidLink)
		}
	}
	render() {
		return (
			<Page loading={this.state.loading} contentClass='confirmAccount-root'>
				<div id='pageConfirmAccount'>
					{this.state.error ?
						<div>
							<p className='__error'>Error: {this.state.errorMsg}</p>
							{this.state.canResend &&
								<button className='mt-3'>Reenviar correo de confirmación de cuenta.</button>
							}
						</div>
					:
						(this.state.loading ?
							<p></p>
						:
							<div>
								<p>Cuenta confirmada correctamente.</p>
								<button className='mt-3'>Iniciar sesión</button>
							</div>
						)
					}
				</div>
			</Page>
		)
	}
}
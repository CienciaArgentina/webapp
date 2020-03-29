import React from 'react'
import Page from '../layouts/main/main'
import { Input } from '../components/Science'
import { UserApi } from '../src/api/api'
import Modal from 'react-modal'
Modal.setAppElement('#app')

export default class forgotUser extends React.Component {
	state = {
		sended: false,
		loading: false,
		email: '',
		error: false,
		errorMsg: false
	}
	onSubmit = e => {
		e.preventDefault()
		this.setState(()=>({loading:true}))
		if(this.state.loading || this.state.error || !this.emailInput.validate().valid || this.state.sended) {
			return false
		}
		UserApi.forgotUsername(this.state.email).then( () => {
			this.setState(()=>({
				loading: false,
				sended: true
			}))
		}).catch(err => {
			if(err.status == 400) {
				const errorMsg = {
					EmailNotFound: 'No existe una cuenta con ese correo electrónico.',
				}[err.data[0].code]
				this.setState(()=>({
					loading: false,
					error: true,
					errorMsg
				}))
			} else {
				this.setState(()=>({
					loading: false,
					error: true,
					errorMsg: 'Error desconocido.'
				}))
			}
		})

	}
	handleChange = e => {
		const name = e.target.name
		const value = e.target.value
		this.setState(()=>({[name]:value}))
	}
	render() {
		return (
			<Page>
				<div className='pt-6 pb-4 container'>
					<Modal
						isOpen={this.state.error}
						className='defaultModal --adviceModal --s'
					>
						<p>{this.state.errorMsg}</p>
					</Modal>
					<Modal
						isOpen={this.state.sended}
						className='defaultModal --adviceModal --s'
					>
						<p>Te enviamos un correo electrónico a <b>{this.state.email}</b> para recuperar tu cuenta.</p>
					</Modal>
					<div className='__logForm'>
						<h2 className='mb-2'>Recurperar usuario</h2>
						<form onSubmit={this.onSubmit}>
							<div className='__inputs'>
								<Input
									type='mail'
									required
									fullWidth
									label='Correo electrónico'
									placeholder="ejemplo@mail.com"
									onChange={this.handleChange}
									value={this.state.email}
									name='email'
									validation = {[
										v => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v)
										? true : 'Ingresa un correo válido'
									]}
									ref={ (input) => {this.emailInput = input} }
								/>
							</div>
							<button>Enviar</button>
						</form>
					</div>
				</div>
			</Page>
		)
	}
}
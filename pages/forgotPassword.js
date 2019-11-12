import React from 'react'
import Page from '../layouts/main/main'
import { Input } from '../components/Science'

export default class ForgotPassword extends React.Component {
	render() {
		return (
			<Page>
				<div className='pt-6 pb-4'>
					<div className='__logForm'>
						<h2 className='mb-2'>Recurperar contraseña</h2>
						<form onSubmit={this.onSubmit}>
							<div className='__inputs'>
								<Input
									type='mail'
									required
									fullWidth
									label='Correo electrónico'
									value={''}
								/>
							</div>
							<button className>Enviar</button>
						</form>
					</div>
				</div>
			</Page>
		)
	}
}
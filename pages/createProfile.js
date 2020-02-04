import React from 'react'
import Page from '../layouts/main/main'
import { Input } from '../components/Science'
import EditPersonalData from '../components/editProfile/editPersonalData'
import WelCommeMessage from '../components/createProfile/welcomeMessage'

export default class CreateProfile extends React.Component {
	state = {
		welcomeMessage: false,
		loading: false,
		name:false
	}
	afterSend = () => {
		this.setState(()=>({welcomeMessage:true}))
	}
	setLoading = loading => {
		this.setState(()=>({loading}))
	}
	editName = name => {
		this.setState(()=>({name}))
	}
	render() {
		return (
			<Page contentClass="bg--gray" loading={this.state.loading}>
				{this.state.welcomeMessage ?
					<WelCommeMessage />
				:
					<div id='createProfile'>
						<div className='__header'>
							<h1 className='mb-2 mt-2'>¡Hola{!!this.state.name&&` ${this.state.name}`}! Sólo un paso más.</h1>
							<p>Completá tus datos básicos para comenzar.</p>
						</div>

						<div className='mt-5'>
							<EditPersonalData
								editName={this.editName}
								afterSend={this.afterSend}
								ignoreContact={true}
								setLoading={this.setLoading}
								ref={ref=>this.editComponent = ref}
							/>
						</div>
					</div>
				}
			</Page>
		)
	}
}
import React from 'react'
import ReactDOM from 'react-dom'
import Page from '../layouts/main/main'

import Link from 'next/link'

import className from 'classnames'

import EditPersonalData from '../components/editProfile/editPersonalData'
import EditCareerData from '../components/editProfile/editCareerData'
import EditPublicationsData from '../components/editProfile/editPublicationsData'


class editProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedForm: props.selectedForm!=undefined ? props.selectedForm : 'basica'
		}
		this.formParams = {
			'basica' : ['fas fa-user','Información básica'],
			'carrera' : ['fas fa-graduation-cap','Carrera'],
			'publicaciones' : ['fas fa-file-alt','Publicaciones'],
			'cuenta' : ['fas fa-cog','Cuenta'],
		}
	}
	static async getInitialProps(context) {
		const section = context.query.section;
		return {
			selectedForm: section
		}
	}
	componentDidUpdate() {
		const selectedForm = this.props.selectedForm!=undefined ? this.props.selectedForm : 'basica'
		if(this.state.selectedForm != selectedForm) {
			this.setState(()=>({selectedForm}))
		}
	}
	handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		this.setState(()=>({
			[name]: value
		}))
	}
	_submit = (e) => {
		e.preventDefault();
	}
	render() {
		return (
			<Page contentClass="bg--gray">
				<div id="editProfile">
					<div className="editProfile__menu">
						<div className="__menuMain">
							{Object.keys(this.formParams).map( (k,i) => {
								const o = this.formParams[k]
								return(
									<div
									key={k}
									className={className({
										selectedLink: this.state.selectedForm==k,
										'__menuItem':true
									})}>
										<Link
										href={`/editProfile?section=${k}`}
										as={`/editProfile/${k}`}>
											<a>
												<div>
													<i className={o[0]}></i>
													<span>{o[1]}</span>
												</div>
											</a>
										</Link>
									</div>
								)
							})}
						</div>
					</div>
					<div className="mainEdit">
						<form className="profileForm" onSubmit={this._submit}>
							{this.state.selectedForm == 'basica' ?
								<EditPersonalData handleChange={this.handleChange} /> : false
							}
							{this.state.selectedForm == 'carrera' ?
								<EditCareerData handleChange={this.handleChange} /> : false
							}
							{this.state.selectedForm == 'publicaciones' ?
								<EditPublicationsData handleChange={this.handleChange} /> : false
							}
							{this.state.selectedForm == 'cuenta' ?
								<EditPersonalData handleChange={this.handleChange} /> : false
							}
						</form>
					</div>
				</div>
			</Page>
		)
	}
}
export default editProfile;
import React from 'react'
import ReactDOM from 'react-dom'
import Page from '../layouts/main/main'
import { connect } from 'react-redux'

import Link from 'next/link'

import className from 'classnames'

import EditPersonalData from '../components/editProfile/editPersonalData'
import EditCareerData from '../components/editProfile/editCareerData'
import EditPublicationsData from '../components/editProfile/editPublicationsData'

import { UserApi } from '../src/api/api'

import {
	updateMyData
} from '../src/actions'

class editProfile extends React.Component {
	static async getInitialProps(context) {
		const selectedForm = context.query.section;
		return {
			// userData,
			selectedForm
		}
	}
	constructor(props) {
		super(props);
		// props.dispatch(updateMyData())
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
										href={`/editprofile?section=${k}`}
										as={`/editprofile/${k}`}>
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
					</div>
				</div>
			</Page>
		)
	}
}

const mapStateToProps = ({ auth }) => ({

});
export default connect(mapStateToProps)(editProfile);
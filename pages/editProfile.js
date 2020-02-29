import React from 'react'
import Page from '../layouts/main/main'

import Link from 'next/link'

import className from 'classnames'

import EditPersonalData from '../components/editProfile/editPersonalData'
import EditCareerData from '../components/editProfile/editCareerData'
import EditPublicationsData from '../components/editProfile/editPublicationsData'

import { requiredLogin } from '../src/actions'

export default class editprofile extends React.Component {
	static async getInitialProps(ctx, router) {
		requiredLogin(ctx, router)
		let selectedForm = ctx.query.section
		if(![
			'',
			'basic',
			'career',
			'publications',
			'account'
		].includes(selectedForm)) {
			return {
				error: {
					statusCode: 404,
				}
			}
		}
		return {
			// userData,
			selectedForm
		}
	}
	constructor(props) {
		super(props)
		this.formParams = {
			'basic' : ['fas fa-user','Información básica'],
			'career' : ['fas fa-graduation-cap','Carrera'],
			'publications' : ['fas fa-file-alt','Publicaciones'],
			'account' : ['fas fa-cog','Cuenta'],
		}
	}
	render() {
		return (
			<Page requireLogin={true} contentClass="editProfileContaier">
				<div id="editProfile">
					<div className="editProfile__menu">
						<div className="__menuMain">
							{Object.entries(this.formParams).map( o => (
								<div
									key={o[0]}
									className={className({
										selectedLink: this.props.selectedForm==o[0] || (this.props.selectedForm==''&&o[0]=='basic'),
										__menuItem:true
									})}
								>
									<Link
										href={`/editprofile?section=${o[0]}`}
										as={`/editprofile/${o[0]}`}>
											<a>
												<div>
													<i className={o[1][0]}></i>
													<span>{o[1][1]}</span>
												</div>
											</a>
										</Link>
								</div>
							))}
						</div>
					</div>
					<div className='mainEditMobile'>
						{this.props.selectedForm==='' ?
							<div>
								<h2 className='mb-4 ml-4'>Editar perfil</h2>
								{Object.entries(this.formParams).map( o => (
									<Link
										href={`/editprofile?section=${o[0]}`}
										as={`/editprofile/${o[0]}`}
										key={o[0]}
									>
										<a>
											<div className='__option'>
												<i className={o[1][0]}></i>
												<span>{o[1][1]}</span>
											</div>
										</a>
									</Link>
								))}
							</div>
							:
							<div className='__mobileEdit'>
								<Link href='/editprofile'>
									<div className='ml-4'>
										<i
											className='fas fa-angle-left mr-2'
										/>
										{this.formParams[this.props.selectedForm][1]}
									</div>
								</Link>
								<div className='__container'>
									{this.props.selectedForm == 'basic' ?
										<EditPersonalData /> : false
									}
									{this.props.selectedForm == 'career' ?
										<EditCareerData /> : false
									}
									{this.props.selectedForm == 'publications' ?
										<EditPublicationsData /> : false
									}
									{this.props.selectedForm == 'account' ?
										<EditPersonalData /> : false
									}
								</div>
							</div>
						}
					</div>
					<div className="mainEdit">
						{this.props.selectedForm == 'basic' || this.props.selectedForm=='' ?
							<EditPersonalData /> : false
						}
						{this.props.selectedForm == 'career' ?
							<EditCareerData /> : false
						}
						{this.props.selectedForm == 'publications' ?
							<EditPublicationsData /> : false
						}
						{this.props.selectedForm == 'account' ?
							<EditPersonalData /> : false
						}
					</div>
				</div>
			</Page>
		)
	}
} 
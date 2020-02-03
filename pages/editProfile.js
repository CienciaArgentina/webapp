import React from 'react'
import Page from '../layouts/main/main'

import Link from 'next/link'

import className from 'classnames'

import EditPersonalData from '../components/editProfile/editPersonalData'
import EditCareerData from '../components/editProfile/editCareerData'
import EditPublicationsData from '../components/editProfile/editPublicationsData'

export default class editprofile extends React.Component {
	static async getInitialProps(context) {
		let selectedForm = context.query.section
		if(!selectedForm){
			selectedForm = 'basic'
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
			<Page contentClass="bg--gray">
				<div id="editProfile">
					<div className="editProfile__menu">
						<div className="__menuMain">
							{Object.entries(this.formParams).map(o=>(
								<div
									key={o[0]}
									className={className({
										selectedLink: this.props.selectedForm==o[0],
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
					<div className="mainEdit">
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
			</Page>
		)
	}
} 
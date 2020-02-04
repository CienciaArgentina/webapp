import React from 'react'
import Page from '../layouts/main/main'
import classnames from 'classnames'
import Link from 'next/link'
import MyApplications from '../components/myJobs/myApplications'
import MyFavorites from '../components/myJobs/myFavorites'

import { requiredLogin } from '../src/actions'

class myJobs extends React.Component {
	static async getInitialProps(ctx, router) {
		requiredLogin(ctx, router)
		let selectedSection = ctx.query.section
		if(selectedSection!=='applications' && selectedSection!=='favorites') {
			selectedSection = 'applications'
		}
		return {
			selectedSection
		}
	}
	render() {
		return (
			<Page requireLogin={true}>
				<div id='myJobs'>
					<div className='__header'>
						<Link href='/myJobs?section=applications' as='/myJobs/applications'>
							<div className={classnames({
								'--selected': this.props.selectedSection=='applications'
							})}>
								Postulaciones
							</div>
						</Link>
						<Link href='/myJobs?section=favorites' as='/myJobs/favorites'>
							<div className={classnames({
								'--selected': this.props.selectedSection=='favorites'
							})}>
								Favoritos
							</div>
						</Link>
					</div>
				</div>
				<div className='__output'>
					{this.props.selectedSection==='applications' &&
						<MyApplications
							
						/>
					}
					{this.props.selectedSection==='favorites' &&
						<MyFavorites
							
						/>
					}
				</div>
			</Page>
		)
	}
}

export default myJobs
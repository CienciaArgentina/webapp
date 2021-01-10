import React from 'react'
import Page from '../layouts/main/main'
import { connect } from 'react-redux'
import ProfileMobile from '../components/profile/profileMobile'

import { requiredLogin } from '../src/actions'

class profile extends React.Component {
	static async getInitialProps(ctx, router) {
		requiredLogin(ctx, router)
		return {}
	}
	render() {
		return (
			<Page requireLogin={true}>
				<div id='profilePage'>
					<ProfileMobile
						{...this.props.user_data}
					/>
				</div>
			</Page>
		)
	}
}

const mapStateToProps = state => ({
	user_data: state.user.user_data
})

export default connect(mapStateToProps)(profile)
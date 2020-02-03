import React from 'react'
import Page from '../layouts/main/main'
import { connect } from 'react-redux'
import ProfileMobile from '../components/profile/profileMobile'

const profile = props => (
	<Page>
		<div id='profilePage'>
			<ProfileMobile
				{...props.userData}
			/>
		</div>
	</Page>
)

const mapStateToProps = state => ({
	userData: state.user.userData
})

export default connect(mapStateToProps)(profile)
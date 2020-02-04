import { UserApi } from '../../api/api'
import moment from 'moment'
import {
	destroyCookie
} from 'nookies'

export const setUserData = data => ({
	type: 'SET_USER_DATA',
	userData: {
		...data,
		updatedAt: moment()
	}
	
})
export const setLogged = isLogged => ({
	type: 'SET_LOGGED',
	isLogged
})

export const setCreatingProfile = isCreatingProfile => ({
	type: 'SET_CREATING_PROFILE',
	isCreatingProfile
})

export const updateMyData = async (dispatch, userName) => {
	let error = false
	await UserApi.getMyData(userName).then(response => {
		// console.log(response);
		dispatch(setUserData(response))
		dispatch(setLogged(true))
	}).catch(e=>{
		if(e.response.status==404) {
			//user is logged in but has to complete profile
			error = 'profileIncomplete'
		}
	})
	return error
}

export const logOut = async (dispatch) => {
	await UserApi.logOut().then(response => {
		destroyCookie({}, 'userData')
		dispatch(setLogged(false))
		dispatch(setCreatingProfile(false))
		dispatch(setUserData(false))
		if(process.browser) {
			document.location.href = '/login'
		}
	}).catch(e=>{
		console.log(e)
	})
}

export const requiredLogin = (ctx, router) => {
	if(!ctx.store.getState().user.isLogged) {
		if(ctx.isServer) {
			ctx.res.writeHead(302, {
				Location: '/login'
			});
			ctx.res.end();
		} else {
			router.push('/login')
		}
	}
}

//asi seria el get
/*
userOrganizarion: [
	{
		organizationId: '1234Leloir',
		emailStart: 'matias',
		emailEnd: '@leloir.org',
		emailConfirmed: true
	}
]
*/
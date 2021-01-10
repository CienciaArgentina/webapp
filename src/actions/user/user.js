import { UserProfileApi, UserApi } from '../../api/api'
import moment from 'moment'
import {
	destroyCookie
} from 'nookies'

export const setUserData = data => ({
	type: 'SET_USER_DATA',
	user_data: {
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

export const updateMyData = async (dispatch) => {
	let error = false
	console.log('UPDATING DATA');
	await UserProfileApi.getMyData().then(response => {
		console.log(response);
		dispatch(setUserData(response))
		dispatch(setLogged(true))
	}).catch(e=>{
		console.log(e);
	})
	return error
}

export const logOut = async (dispatch) => {
	destroyCookie({}, 'user_data')
	dispatch(setLogged(false))
	dispatch(setCreatingProfile(false))
	dispatch(setUserData(false))
	if(process.browser) {
		document.location.href = '/login'
	}
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
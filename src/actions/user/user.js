import { UserApi } from '../../api/api'
import moment from 'moment'

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

export const updateMyData = dispatch => {
	UserApi.getMyData().then(response => {
		dispatch(setUserData(response));
		dispatch(setLogged(true));
	})	
}
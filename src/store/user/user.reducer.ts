import { HYDRATE } from 'next-redux-wrapper';
import { UserReducerState, UserActionTypes } from './user.types'
import { ReduxHydrate } from '../index'

const defaultState:UserReducerState = {
	is_logged: false,
	profile: null,
	auth: null,
	completed_profile: null,
}

const userReducer = (state:UserReducerState = defaultState, action:UserActionTypes | ReduxHydrate) => {
	switch (action.type) {
		case HYDRATE:
            return {...state, ...action.payload.user};
		case 'SET_USER_LOGGED':
			return {...state,
				is_logged: action.is_logged,
				profile: action.profile,
				auth: action.auth
			};
		case 'SET_USER_NOT_LOGGED':
			return {
				...state,
				is_logged: action.is_logged,
				profile: action.profile,
				auth: action.auth
			}
		default:
			return state
	}
}

export default userReducer
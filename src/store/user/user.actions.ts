import { MyProfileInterface } from "@utils/api/user_profiles";
import { SET_USER_LOGGED, SET_USER_NOT_LOGGED, SetUserLoggedAction, SetUserNotLoggedActon } from "./user.types";


export function setUserLogged({user, auth}: MyProfileInterface): SetUserLoggedAction {
	const completed_profile = typeof user.name === 'string'
	return {
		type: SET_USER_LOGGED,
		is_logged: true,
		profile: user,
		auth,
		completed_profile,
	}
}

export function setUserNotLogged (): SetUserNotLoggedActon {
	return {
		type: SET_USER_NOT_LOGGED,
		is_logged: false,
		profile: null,
		auth: null,
		completed_profile: null
	}
}